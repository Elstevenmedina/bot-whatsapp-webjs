import mongoose, { Schema } from 'mongoose'
import { type NoteRefund } from '../interfaces'

const noteRefundSchema = new Schema<NoteRefund>({
  CantidadTotal: { type: Number, require: true },
  Cliente: { type: String, require: true },
  Comentario: { type: String, require: true },
  ComentarioAnualcion: { type: String, default: '' },
  Direccion: { type: String, require: true },
  Estado: { type: String, default: 'Procesado' },
  Fecha: { type: String, require: true },
  NotaEntrega: { type: Number, require: true },
  Numero: { type: Number, require: true },
  PrecioActualNota: { type: Number, require: true },
  Productos: [{
    Codigo: { type: String, require: true },
    Cantidad: { type: Number, require: true },
    Valor: { type: Number, require: true }
  }],
  RIF: { type: String, require: true },
  Telefono: { type: String, require: true },
  Timestamp: { type: Number, default: Date.now() },
  ValorTotal: { type: Number, require: true }
})

const NoteRefundModel = mongoose.model<NoteRefund>('notasDevoluciones', noteRefundSchema)

export default NoteRefundModel
