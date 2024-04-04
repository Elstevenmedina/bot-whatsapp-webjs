import mongoose, { Schema } from 'mongoose'
import { type WhatsappMessage } from '../interfaces'

const whatsappMessageSchema = new Schema<WhatsappMessage>({
  Contenido: { type: String, require: true },
  Estado: { type: String, default: 'Pendiente' },
  Fecha: { type: String, require: true },
  Tipo: { type: String, require: true },
  Usuarios: [{ type: String, require: true }]
})

const WhatsappMessagesModel = mongoose.model('mensajes Whatsapp', whatsappMessageSchema)

export default WhatsappMessagesModel
