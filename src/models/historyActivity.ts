import mongoose, { Schema } from 'mongoose'
import { type HistoryActivity } from '../interfaces/historyActivity'

const historyActivitySchema = new Schema<HistoryActivity>({
  Fecha: { type: String, require: true },
  Timestamp: { type: String, require: true },
  Usuario: { type: String, require: true },
  _idUsuario: { type: String, require: true },
  SeccionSistema: { type: String, require: true },
  Accion: { type: String, require: true }
})

const HistoryActivityModel = mongoose.model<HistoryActivity>('historialActividad', historyActivitySchema)

export default HistoryActivityModel
