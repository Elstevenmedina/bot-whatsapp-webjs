import mongoose, { Schema } from 'mongoose'
import { type AccountingBook } from '../interfaces/accountingBook'

const accountingBookSchema = new Schema<AccountingBook>({
  Anio: { type: Number, require: true },
  Mes: { type: String, require: true },
  NumeroMes: { type: Number, require: true },
  TotalIngreso: { type: Number, require: true },
  TotalEgreso: { type: Number, require: true },
  TotalGeneral: { type: Number, require: true },
  dia: [{
    Timestamp: { type: Number, defualt: Date.now() },
    Fecha: { type: String, require: true },
    Numero: { type: String, require: true },
    Cliente: { type: String, require: true },
    Tipo: { type: String, require: true },
    Ingreso: { type: Number, require: true },
    Egreso: { type: Number, require: true },
    Saldo: { type: Number, require: true }
  }]
})

const AccountingBookModel = mongoose.model('libroContable', accountingBookSchema)

export default AccountingBookModel
