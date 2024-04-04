import mongoose, { Schema } from 'mongoose'
import { type BillingIndicators } from '../interfaces/billingIndicators'

const billingIndicatorsSchema = new Schema<BillingIndicators>({
  MontoGeneral: { type: String, require: true },
  UtlidadesGeneral: { type: String, require: true },
  FacturadoGranMayor: { type: String, require: true },
  FacturadoMayor: { type: String, require: true },
  FacturadoDetal: { type: String, require: true },
  Meses: [{
    Codigo: { type: String, require: true },
    Mes: { type: String, require: true },
    Anio: { type: String, require: true },
    NumeroMes: { type: String, require: true },
    MontoGeneral: { type: String, require: true },
    UtlidadesGeneral: { type: String, require: true }
  }]
})

const BillingIndicatorsModel = mongoose.model('indicadores_generales', billingIndicatorsSchema)

export default BillingIndicatorsModel
