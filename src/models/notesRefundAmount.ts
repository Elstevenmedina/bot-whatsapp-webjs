import mongoose, { Schema } from 'mongoose'
import { type NotesRefundAmount } from '../interfaces'

const notesRefundAmountSchema = new Schema<NotesRefundAmount>({
  Celular: { type: String, require: true },
  Cliente: { type: String, require: true },
  Comentario: { type: String, require: true },
  Direccion: { type: String, require: true },
  Documento: { type: String, require: true },
  EstadoGeneral: { type: String, default: 'Procesada' },
  EstadoLibro: { type: String, default: 'Sin incluir' },
  Fecha: { type: String, require: true },
  NotaEntrega: { type: Number, require: true },
  PrecioActualNota: { type: Number, require: true },
  Productos: [{
    NotaEntrega: { type: String, require: true },
    Precio: { type: Number, require: true }
  }],
  Recibo: { type: Number, require: true },
  Timestamp: { type: Number, require: true },
  Titulo: { type: String, require: true }
})

const NotesRefundAmountModel = mongoose.model < NotesRefundAmount >('notasDevolucionPorMonto', notesRefundAmountSchema)

export default NotesRefundAmountModel
