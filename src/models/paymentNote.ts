import mongoose, { Schema } from 'mongoose'
import { type PaymentNote } from '../interfaces'

const paymentNoteSchema = new Schema<PaymentNote>({
  Cliente: { type: String, require: true },
  Comentario: { type: String, require: true },
  ComentarioAnualcion: { type: String, default: '' },
  Direccion: { type: String, require: true },
  Estado: { type: String, default: 'Procesado' },
  Fecha: { type: String, require: true },
  Numero: { type: Number, require: true },
  Notas: [{
    Nota: { type: String, require: true },
    Pendiente: { type: Number },
    Pago: { type: Number, require: true },
    Restante: { type: Number },
    Observacion: { type: String, require: true },
    Modalidad: { type: String, require: true },
    Destino: { type: String },
    Referencia: { type: String },
    Comentario: { type: String, require: true }
  }],
  PagadoTotal: { type: Number, require: true },
  Pendiente: { type: Number, require: true },
  RIF: { type: String, require: true },
  SaldoFavorInlcuido: { type: Number, require: true },
  SubTotal: { type: Number, require: true },
  Telefono: { type: String, require: true },
  Timestamp: { type: String, require: true }
})

const PaymentNoteModel = mongoose.model<PaymentNote>('notasPago', paymentNoteSchema)

export default PaymentNoteModel
