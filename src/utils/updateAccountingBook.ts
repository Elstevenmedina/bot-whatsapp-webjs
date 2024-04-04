import AccountingBookModel from '../models/accountingBook'
import { getMonth } from '../moment'

export const updateAccountingBook = async (documentNumber: number, type: string, client: string, year: string, month: string, egress: number, income: number): Promise<boolean> => {
  try {
    const accountingBook = await AccountingBookModel.findOne({ Anio: year, NumeroMes: month })

    const total: number = (accountingBook !== undefined && accountingBook !== null)
      ? +(accountingBook.TotalGeneral + income - egress).toFixed(2)
      : +(income - egress).toFixed(2)

    const day = {
      Numero: documentNumber,
      Cliente: client,
      Tipo: type,
      Ingreso: income,
      Egreso: egress,
      Saldo: total
    }

    if (accountingBook !== undefined && accountingBook !== null) {
      const totalIncome: number = +(accountingBook.TotalIngreso + income).toFixed(2)
      const totalEgress: number = +(accountingBook.TotalEgreso + egress).toFixed(2)

      await AccountingBookModel.findByIdAndUpdate(accountingBook._id, {
        TotalIngreso: totalIncome,
        TotalEgreso: totalEgress,
        TotalGeneral: total,
        $push: { dia: day }
      })
      return true
    } else {
      console.log('Entro aqui')
      const monthTextual = getMonth(month)

      const newAccountingBook = new AccountingBookModel({
        Anio: year,
        Mes: monthTextual,
        NumeroMes: month,
        TotalIngreso: income,
        TotalEgreso: egress,
        TotalGeneral: total,
        dia: day
      })

      await newAccountingBook.save()
      return true
    }
  } catch (err) {
    console.log(err)
    return true
  }
}
