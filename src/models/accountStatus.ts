import mongoose, { Schema } from 'mongoose'
import { type AccountStatus } from '../interfaces/AccountStatus'

const accountStatusSchema = new Schema<AccountStatus>({
  Cliente: { type: String, require: true },
  _idCliente: { type: String, require: true },
  RIF: { type: String, require: true },
  DebeTotal: { type: Number, require: true },
  HaberTotal: { type: Number, require: true },
  SaldoTotal: { type: Number, require: true },
  Items: [{
    TipoDocumento: { type: String, require: true },
    NumeroDocumento: { type: String, require: true },
    Fecha: { type: String, require: true },
    FechaVencimiento: { type: String, require: true },
    Debe: { type: Number, require: true },
    Haber: { type: Number, require: true },
    Saldo: { type: Number, require: true }
  }]
})

const AccountStatusModel = mongoose.model('estadosCuentas', accountStatusSchema)

export default AccountStatusModel
