import mongoose, { Schema } from 'mongoose'
import { type WeeklyCollectionRecord } from '../interfaces'

const weeklyCollectionRecordSchema = new Schema<WeeklyCollectionRecord>({
  Almacen: { type: String, require: true },
  Fecha: { type: String, require: true },
  Numero: { type: Number, require: true },
  Notas: [{
    Numero: { type: String, require: true },
    Cliente: { type: String, require: true },
    Neto: { type: Number, require: true },
    MontoCancelado: { type: Number },
    Saldo: { type: String, require: true }
  }],
  Pagos: [{
    Fecha: { type: String, require: true },
    Comentario: { type: String, require: true },
    Monto: { type: Number, require: true }
  }],
  PagadoTotal: { type: Number, require: true },
  Timestamp: { type: String, require: true }
})

const WeeklyCollectionRecordModel = mongoose.model<WeeklyCollectionRecord>('constancias semanales cobros', weeklyCollectionRecordSchema)

export default WeeklyCollectionRecordModel
