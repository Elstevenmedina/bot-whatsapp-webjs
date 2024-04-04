import AccountStatusModel from '../models/accountStatus'
import { type AccountStatus } from '../interfaces/AccountStatus'

interface ArgumentsUpdateAccount {
  client: string
  rif: string
  documentType: string
  documentNumber: number
  date: string
  dueDate: string
  credit: number
  debit: number
  cancellation: string | undefined
}

export const updateClientAccount = async ({ client, rif, documentType, documentNumber, date, dueDate, credit, debit, cancellation }: ArgumentsUpdateAccount): Promise<AccountStatus> => {
  const clientAccount = await AccountStatusModel.findOne({ Cliente: client })
  const lastBalance: number = (clientAccount !== undefined && clientAccount !== null) ? clientAccount.SaldoTotal : 0
  const balance: number = +(lastBalance + debit - credit).toFixed(2)

  const document = {
    TipoDocumento: `${cancellation} ${documentType}`,
    NumeroDocumento: documentNumber,
    Fecha: date,
    FechaVencimiento: dueDate,
    Debe: debit,
    Haber: credit,
    Saldo: balance
  }

  if (clientAccount !== undefined && clientAccount !== null) {
    const totalDebit: number = +(clientAccount.DebeTotal + document.Debe).toFixed(2)
    const totalCredit: number = +(clientAccount.HaberTotal + document.Haber).toFixed(2)

    const updatedAccount = await AccountStatusModel.findByIdAndUpdate(clientAccount._id, {
      DebeTotal: totalDebit,
      HaberTotal: totalCredit,
      SaldoTotal: balance,
      $push: { Items: document }
    }, { new: true })

    if (updatedAccount === undefined || updatedAccount === null) throw new Error('Error al actualizar el estado de la cuenta')

    return updatedAccount
  } else {
    const newStatus = new AccountStatusModel({
      Cliente: client,
      RIF: rif,
      DebeTotal: document.Debe,
      HaberTotal: document.Haber,
      SaldoTotal: document.Saldo,
      Items: [document]
    })

    return await newStatus.save()
  }
}
