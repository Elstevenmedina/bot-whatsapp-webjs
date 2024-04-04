import mongoose, { Schema } from 'mongoose'
import { type PopMaterial } from '../interfaces/popMaterial'

const popMaterialSchema = new Schema<PopMaterial>({
  Codigo: { type: String, require: true },
  Descripcion: { type: String, require: true },
  TipoProducto: { type: String, default: 'Material POP' },
  Cantidad: { type: String, require: true },
  CostoFOB: { type: Number, require: true },
  CostoFOBSB: { type: Number, require: true },
  CostoSB: { type: Number, require: true },
  PrecioVentaSB: { type: Number, require: true },
  PrecioGranMayor: { type: Number, require: true },
  PrecioMayor: { type: Number, require: true },
  PrecioDetal: { type: Number, require: true },
  HistorialMovimiento: [
    {
      FechaMovimiento: { type: String, require: true },
      CantidadAnterior: { type: Number, require: true },
      CantidadMovida: { type: Number, require: true },
      CantidadNueva: { type: Number, require: true },
      Comentario: { type: String, require: true },
      Timestamp: { type: Number, require: true },
      CodigoMovimiento: { type: String, require: true },
      TipoMovimiento: { type: String, require: true }
    }
  ],
  HistorialMovimientoB: [
    {
      FechaMovimiento: { type: String, require: true },
      CantidadAnterior: { type: Number, require: true },
      CantidadMovida: { type: Number, require: true },
      CantidadNueva: { type: Number, require: true },
      Comentario: { type: String, require: true },
      Timestamp: { type: Number, require: true },
      CodigoMovimiento: { type: String, require: true },
      TipoMovimiento: { type: String, require: true }
    }
  ]
})

const PopMaterialModel = mongoose.model('material POP', popMaterialSchema)

export default PopMaterialModel
