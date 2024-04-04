import mongoose, { Schema } from 'mongoose'
import { type Product } from '../interfaces'

const productSchema = new Schema<Product>({
  Almacen: { type: String, require: true },
  Alto: { type: Number, default: 0 },
  Ancho: { type: Number, default: 0 },
  BackOrder: { type: Number, default: 0 },
  Cantidad: { type: Number, default: 0 },
  CantidadImportada: { type: Number, default: 0 },
  CantidadProduccion: { type: Number, default: 0 },
  CantidadTransito: { type: Number, default: 0 },
  CantidadVendida: { type: Number, default: 0 },
  Codigo: { type: String, require: true },
  CodigoG: { type: String, require: true },
  Costo: { type: Number, require: true },
  CostoFOB: { type: Number, require: true },
  CostoFOBSB: { type: Number, require: true },
  CostoSB: { type: Number, require: true },
  Descripcion: { type: String, require: true },
  Familia: { type: String, require: true },
  HistorialMovimiento: [
    {
      TipoMovimiento: { type: String, require: true },
      Timestamp: { type: Number, default: Date.now() },
      FechaMovimiento: { type: String, require: true },
      Comentario: { type: String, require: true },
      CantidadNueva: { type: Number, require: true },
      CantidadMovida: { type: Number, require: true },
      CantidadAnterior: { type: Number, require: true }
    }
  ],
  HistorialMovimientoB: [{
    TipoMovimiento: { type: String, require: true },
    Timestamp: { type: Number, require: true },
    FechaMovimiento: { type: String, require: true },
    Comentario: { type: String, require: true },
    CantidadNueva: { type: Number, require: true },
    CantidadMovida: { type: Number, require: true },
    CantidadAnterior: { type: Number, require: true }
  }],
  Largo: { type: Number, default: 0 },
  Nombre: { type: String, require: true },
  Peso: { type: Number, default: 0 },
  Posicion: { type: String, require: true },
  PrecioDetal: { type: Number, require: true },
  PrecioGranMayor: { type: Number, require: true },
  PrecioMayor: { type: Number, require: true },
  PrecioVentaSB: { type: Number, require: true },
  Proveedor: { type: String, require: true },
  TipoProducto: { type: String, require: true },
  Unidades: { type: Number, default: 0 },
  Vehiculos: [
    {
      TipoVehiculo: { type: String, require: true },
      Modelo: { type: String, require: true },
      Marca: { type: String, require: true },
      Hasta: { type: Number, require: true },
      Desde: { type: Number, require: true }
    }
  ]
})

const ProductModel = mongoose.model<Product>('productos', productSchema)

export default ProductModel
