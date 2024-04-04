import mongoose, { Schema } from 'mongoose'
import { type ProductIndicators } from '../interfaces/productIndicators'

const productIndicatorsSchema = new Schema<ProductIndicators>({
  AmortiguadoresFacturados: { type: String, require: true },
  BasesFacturados: { type: String, require: true },
  BootFacturados: { type: String, require: true },
  AmortiguadoresCantidad: { type: String, require: true },
  BasesCantidad: { type: String, require: true },
  BootCantidad: { type: String, require: true },
  MesesAmortiguadores: [{
    Codigo: { type: String, require: true },
    Mes: { type: String, require: true },
    Anio: { type: String, require: true },
    NumeroMes: { type: String, require: true },
    MontoGeneral: { type: String, require: true },
    Cantidad: { type: String, require: true }
  }],
  MesesBases: [{
    Codigo: { type: String, require: true },
    Mes: { type: String, require: true },
    Anio: { type: String, require: true },
    NumeroMes: { type: String, require: true },
    MontoGeneral: { type: String, require: true },
    Cantidad: { type: String, require: true }
  }],
  MesesBoots: [{
    Codigo: { type: String, require: true },
    Mes: { type: String, require: true },
    Anio: { type: String, require: true },
    NumeroMes: { type: String, require: true },
    MontoGeneral: { type: String, require: true },
    Cantidad: { type: String, require: true }
  }]
})

const ProductIndicatorsModel = mongoose.model('indicadores_productos', productIndicatorsSchema)

export default ProductIndicatorsModel
