import mongoose, { Schema } from 'mongoose'
import { type CancellationRequest } from '../interfaces'

const cancellationRequestSchema = new Schema<CancellationRequest>({
  Estado: { type: String, default: 'Pendiente' },
  Motivo: { type: String, require: true },
  NumeroDocumento: { type: String, require: true },
  TipoDocumento: { type: String, require: true },
  Usuario: { type: String, require: true },
  _idUsuario: { type: String, require: true }
})

const CancellationRequestModel = mongoose.model('solicitudes Anulaciones', cancellationRequestSchema)

export default CancellationRequestModel
