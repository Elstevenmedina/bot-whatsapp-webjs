import mongoose, { Schema } from 'mongoose'
import { type PurchaseOrders } from '../interfaces'

const purchaseOrderSchema = new Schema<PurchaseOrders>({
  _idCliente: { type: String, require: true },
  _idUserClient: { type: String, require: true },
  _idVendedor: { type: String, require: true },
  CantidadTotal: { type: Number, require: true },
  Cliente: { type: String, require: true },
  Estado: { type: String, default: 'Pendiente' },
  Fecha: { type: String, require: true },
  Numero: { type: String, require: true },
  PrecioTotal: { type: Number, require: true },
  Productos: [
    {
      Codigo: { type: String, require: true },
      Descripcion: { type: String, require: true },
      Cantidad: { type: String, require: true },
      Cantidad2: { type: String, require: true },
      PrecioUnidad: { type: String, require: true },
      PrecioTotal: { type: String, require: true },
      PrecioTotal2: { type: String, require: true }
    }
  ],
  Timestamp: { type: Number, require: true },
  Vendedor: { type: String, require: true }
})

const PurchaseOrderModel = mongoose.model('ordenes Compras Clientes Vendedores', purchaseOrderSchema)

export default PurchaseOrderModel
