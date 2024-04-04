import mongoose, { Schema } from 'mongoose'
import { type DeliveryNote } from '../interfaces'

const deliveryNoteSchema = new Schema<DeliveryNote>({
  _idCliente: { type: String, require: true },
  _idVendedor: { type: String, require: true },
  Almacen: { type: String, require: true },
  Anio: { type: String, require: true },
  CantidadTotal: { type: Number, require: true },
  CantidadTotal2: { type: Number, require: true },
  Cliente: { type: String, require: true },
  CodigoCliente: { type: String, require: true },
  CodigoVendedor: { type: String, require: true },
  CodigoZona: { type: String, require: true },
  ComentarioAnualcion: { type: String, default: '' },
  Comision: { type: Number, require: true },
  Comision2: { type: Number, require: true },
  Control: [{ type: String, default: '-' }],
  Descuento: { type: Number, default: 0 },
  DescuentoValor: { type: Number, default: 0 },
  Direccion: { type: String, require: true },
  Estado: { type: String, default: 'Por cobrar' },
  EstadoComision: { type: String, default: 'Por pagar' },
  EstadoComisionSupervisor: { type: String, default: 'Por pagar' },
  Factura: [{ type: String, default: '-' }],
  Fecha: { type: String, require: true },
  FechaAnulacion: { type: String, require: true },
  HistorialPago: [{
    Comentario: { type: String, require: true },
    FechaPago: { type: String, require: true },
    Modalidad: { type: String, require: true },
    Pago: { type: String, require: true },
    Recibo: { type: Number, require: true },
    Timestamp: { type: Number, default: Date.now() },
    user: { type: String, require: true }
  }],
  LibroContable: { type: Boolean, default: false },
  Mes: { type: String, require: true },
  MontoTransporte: { type: Number, require: true },
  Neto: { type: Number, require: true },
  Neto2: { type: Number, require: true },
  Nota: { type: String, default: '' },
  Numero: { type: Number, require: true },
  NumeroOrden: { type: String, default: '-' },
  PorcentajeComision: { type: Number, require: true },
  PorcentajeComisionCancelada: { type: Number, default: 0 },
  Productos: [{
    Cantidad: { type: String, require: true },
    Cantidad2: { type: String, require: true },
    Codigo: { type: String, require: true },
    Descripcion: { type: String, require: true },
    Facturado: { type: Boolean, default: false },
    PrecioTotal: { type: String, require: true },
    PrecioTotal2: { type: String, require: true },
    PrecioUnidad: { type: String, require: true },
    Producto: { type: String, require: true }
  }],
  RIF: { type: String, require: true },
  Saldo: { type: Number, require: true },
  SubTotal: { type: Number, default: 0 },
  Telefono: { type: String, require: true },
  Timestamp: { type: Number, require: Date.now() },
  TipoDescuento: { type: String, default: '' },
  TipoPrecio: { type: String, require: true },
  TodoFactuado: { type: Boolean, default: false },
  Transporte: { type: String, require: true },
  Vencimiento: { type: String, require: true },
  Vendedor: { type: String, require: true },
  Zona: { type: String, require: true }
})

const DeliveryNoteModel = mongoose.model('Notas entrega', deliveryNoteSchema)

export default DeliveryNoteModel
