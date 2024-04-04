import mongoose, { Schema } from 'mongoose'
import { type OrderRequest } from '../interfaces'

const orderRequestSchema = new Schema<OrderRequest>({
  EstadoEnvio: { type: String, required: true },
  NumeroOrden: { type: String, required: true },
  Usuario: { type: String, required: true }
})

const OrderRequestModel = mongoose.model<OrderRequest>('solicitudOrden', orderRequestSchema)

export default OrderRequestModel
