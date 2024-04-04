import { type ShockAbsorberMonthly, type ProductsDeliveryNote, type BasesMonthly } from '../interfaces'
import BillingIndicatorsModel from '../models/billingIndicators'
import PopMaterialModel from '../models/popMaterial'
import ProductIndicatorsModel from '../models/productIndicators'
import ProductModel from '../models/products'
import { getMonth } from '../moment'
import { type BootsMonthly, type ProductIndicators } from '../interfaces/productIndicators'
import { type BillingIndicators } from '../interfaces/billingIndicators'

export const getProductCost = async (productCode: string): Promise<number> => {
  const productoInfo = await ProductModel.findOne({ Codigo: productCode })// .select('Costo TipoProducto')
  let cost: number = 0
  if (productoInfo !== null && productoInfo !== undefined) {
    cost = productoInfo.Costo
  } else {
    const dataPopMaterial = await PopMaterialModel.findOne({ Codigo: productCode })
    cost = (dataPopMaterial !== null && dataPopMaterial !== undefined) ? dataPopMaterial.CostoFOB : cost
  }

  return cost
}

export const getProfits = async (products: ProductsDeliveryNote[], deliveryNoteNumber: number): Promise<number> => {
  let profits: number = 0
  for (const product of products) {
    const productCode: string = product.Codigo.replace(/\s/g, '')
    const cost = await getProductCost(productCode)
    const totalProfit = +product.Cantidad * cost
    profits = +product.PrecioTotal - totalProfit + profits
  }
  return +profits.toFixed(2)
}

export const updateDashboard = async (products: ProductsDeliveryNote[], date: string, deliveryNoteNumber: number, priceType: string, totalPrice: number): Promise<BillingIndicators> => {
  const profits = await getProfits(products, deliveryNoteNumber)
  const month = getMonth(date.split('/')[1])
  let billedPrice1: number = 0
  let billedPrice2: number = 0
  let billedPrice3: number = 0

  if (priceType === 'GRANMAYOR') billedPrice1 = totalPrice
  if (priceType === 'MAYOR') billedPrice2 = totalPrice
  if (priceType === 'DETAL') billedPrice3 = totalPrice

  const billingIndicators = await BillingIndicatorsModel.find()

  const code = `${date.split('/')[2]}${date.split('/')[1]}`

  if (billingIndicators !== undefined && billingIndicators.length > 0) {
    const monthIndicators = billingIndicators[0].Meses.find((month) => month.Codigo === code)
    const amountGeneral = (+billingIndicators[0].MontoGeneral - +totalPrice).toFixed(2)
    const profitGeneral = (+billingIndicators[0].UtlidadesGeneral - +profits).toFixed(2)
    const AmountPrice1 = (+billingIndicators[0].FacturadoGranMayor - +billedPrice1).toFixed(2)
    const AmountPrice2 = (+billingIndicators[0].FacturadoMayor - +billedPrice2).toFixed(2)
    const AmountPrice3 = (+billingIndicators[0].FacturadoDetal - +billedPrice3).toFixed(2)

    if (monthIndicators !== null && monthIndicators !== undefined) {
      const amountGeneralMonth = (+monthIndicators.MontoGeneral - +totalPrice).toFixed(2)
      const profitGeneralMonth = (+monthIndicators.UtlidadesGeneral - +totalPrice).toFixed(2)
      const billingIndicatorsSaved = await BillingIndicatorsModel.findByIdAndUpdate(billingIndicators[0]._id, {
        MontoGeneral: amountGeneral,
        UtlidadesGeneral: profitGeneral,
        FacturadoGranMayor: AmountPrice1,
        FacturadoMayor: AmountPrice2,
        FacturadoDetal: AmountPrice3,
        Meses: billingIndicators[0].Meses.map((month) => {
          if (month.Codigo === code) {
            month.MontoGeneral = amountGeneralMonth
            month.UtlidadesGeneral = profitGeneralMonth
          }
          return month
        })
      }, { new: true })

      if (billingIndicatorsSaved === null || billingIndicatorsSaved === undefined) throw new Error('Error al guardar los indicadores')

      return billingIndicatorsSaved
    } else {
      const newMonth = {
        Codigo: `${date.split('/')[2]}${date.split('/')[1]}`,
        Mes: month,
        Anio: date.split('/')[2],
        NumeroMes: date.split('/')[1],
        MontoGeneral: -totalPrice,
        UtlidadesGeneral: -profits
      }
      const billingIndicatorsSaved = await BillingIndicatorsModel.findByIdAndUpdate(billingIndicators[0]._id, {
        MontoGeneral: amountGeneral,
        UtlidadesGeneral: profitGeneral,
        FacturadoGranMayor: AmountPrice1,
        FacturadoMayor: AmountPrice2,
        FacturadoDetal: AmountPrice3,
        $push: { Meses: newMonth }
      }, { new: true })

      if (billingIndicatorsSaved === null || billingIndicatorsSaved === undefined) throw new Error('Error al guardar los indicadores')

      return billingIndicatorsSaved
    }
  } else {
    const newMonth = {
      Codigo: `${date.split('/')[2]}${date.split('/')[1]}`,
      Mes: month,
      Anio: date.split('/')[2],
      NumeroMes: date.split('/')[1],
      MontoGeneral: -totalPrice,
      UtlidadesGeneral: -profits
    }
    const billingIndicatorsSaved = new BillingIndicatorsModel({
      MontoGeneral: -totalPrice,
      UtlidadesGeneral: -profits,
      FacturadoGranMayor: billedPrice1,
      FacturadoMayor: billedPrice2,
      FacturadoDetal: billedPrice3,
      Meses: newMonth
    })

    return await billingIndicatorsSaved.save()
  }
}

export const updateProductsDashboard = async (products: ProductsDeliveryNote[], date: string): Promise<ProductIndicators> => {
  const productIndicators = await ProductIndicatorsModel.findOne()
  const month = getMonth(date.split('/')[1])
  const year = date.split('/')[2]
  let shockAbsorberAmount: number | string = 0
  let baseAmount: number | string = 0
  let bootAmount: number | string = 0
  let shockAbsorberQuantity: number | string = 0
  let baseQuantity: number | string = 0
  let bootQuantity: number | string = 0

  for (const product of products) {
    const code = product.Codigo.replace(/\s/g, '')
    const productInfo = await ProductModel.findOne({ Codigo: code })// .select('Costo TipoProducto')
    const totalPrice = product.PrecioTotal
    if (productInfo !== null && productInfo !== undefined) {
      if (productInfo.TipoProducto === 'AMORTIGUADOR') {
        shockAbsorberAmount = shockAbsorberAmount + +totalPrice
        shockAbsorberQuantity = shockAbsorberQuantity + +product.Cantidad
      }
      if (productInfo.TipoProducto === 'BASE DE AMORTIGUADOR') {
        baseAmount = baseAmount + +totalPrice
        baseQuantity = baseQuantity + +product.Cantidad
      }
      if (productInfo.TipoProducto === 'GUARDAPOLVO') {
        bootAmount = bootAmount + +totalPrice
        bootQuantity = bootQuantity + +product.Cantidad
      }
    }
  }

  const shockAbsorberMonth: ShockAbsorberMonthly = {
    Codigo: `${date.split('/')[2]}${date.split('/')[1]}`,
    Mes: month,
    Anio: year,
    NumeroMes: date.split('/')[1],
    MontoGeneral: shockAbsorberAmount,
    Cantidad: shockAbsorberQuantity
  }
  const baseMonth: BasesMonthly = {
    Codigo: `${date.split('/')[2]}${date.split('/')[1]}`,
    Mes: month,
    Anio: year,
    NumeroMes: date.split('/')[1],
    MontoGeneral: baseAmount,
    Cantidad: baseQuantity
  }
  const bootMonth: BootsMonthly = {
    Codigo: `${date.split('/')[2]}${date.split('/')[1]}`,
    Mes: month,
    Anio: year,
    NumeroMes: date.split('/')[1],
    MontoGeneral: bootAmount,
    Cantidad: bootQuantity
  }

  if (productIndicators !== null && productIndicators !== undefined) {
    shockAbsorberAmount = (shockAbsorberAmount - +productIndicators.AmortiguadoresFacturados).toFixed(2)
    baseAmount = (baseAmount - +productIndicators.BasesFacturados).toFixed(2)
    bootAmount = (bootAmount - +productIndicators.BootFacturados).toFixed(2)
    shockAbsorberQuantity = (shockAbsorberQuantity - +productIndicators.AmortiguadoresCantidad).toFixed(2)
    baseQuantity = (baseQuantity - +productIndicators.BasesCantidad).toFixed(2)
    bootQuantity = (bootQuantity - +productIndicators.BootCantidad).toFixed(2)

    const monthShockAbsorberInfo = productIndicators.MesesAmortiguadores.find(mes => mes.Codigo === shockAbsorberMonth.Codigo)
    const monthBaseInfo = productIndicators.MesesBases.find(mes => mes.Codigo === baseMonth.Codigo)
    const monthBootInfo = productIndicators.MesesBoots.find(mes => mes.Codigo === bootMonth.Codigo)

    if (monthShockAbsorberInfo !== null && monthShockAbsorberInfo !== undefined) {
      shockAbsorberMonth.MontoGeneral = (+monthShockAbsorberInfo.MontoGeneral - +shockAbsorberMonth.MontoGeneral).toFixed(2)
      shockAbsorberMonth.Cantidad = +monthShockAbsorberInfo.Cantidad - +shockAbsorberMonth.Cantidad
    }
    if (monthBaseInfo !== null && monthBaseInfo !== undefined) {
      baseMonth.MontoGeneral = (+monthBaseInfo.MontoGeneral - +baseMonth.MontoGeneral).toFixed(2)
      baseMonth.Cantidad = +monthBaseInfo.Cantidad - +baseMonth.Cantidad
    }
    if (monthBootInfo !== null && monthBootInfo !== undefined) {
      bootMonth.MontoGeneral = (+monthBootInfo.MontoGeneral - +bootMonth.MontoGeneral).toFixed(2)
      bootMonth.Cantidad = +monthBootInfo.Cantidad - +bootMonth.Cantidad
    }

    productIndicators.MesesAmortiguadores.filter(mes => mes.Codigo !== shockAbsorberMonth.Codigo).push(shockAbsorberMonth)
    productIndicators.MesesBases.filter(mes => mes.Codigo !== baseMonth.Codigo).push(baseMonth)
    productIndicators.MesesBoots.filter(mes => mes.Codigo !== bootMonth.Codigo).push(bootMonth)

    const productsIndicatorsSaved = await ProductIndicatorsModel.findOneAndUpdate({ _id: productIndicators._id }, {
      AmortiguadoresFacturados: shockAbsorberAmount,
      BasesFacturados: baseAmount,
      BootFacturados: bootAmount,
      AmortiguadoresCantidad: shockAbsorberQuantity,
      BasesCantidad: baseQuantity,
      BootCantidad: bootQuantity,
      MesesAmortiguadores: productIndicators.MesesAmortiguadores,
      MesesBases: productIndicators.MesesBases,
      MesesBoots: productIndicators.MesesBoots
    }, { new: true })


    if (productsIndicatorsSaved === null || productsIndicatorsSaved === undefined) throw new Error('Error al guardar los indicadores de productos')

    return productsIndicatorsSaved
  } else {
    const productsIndicatorsSaved = new ProductIndicatorsModel({
      AmortiguadoresFacturados: shockAbsorberAmount,
      BasesFacturados: baseAmount,
      BootFacturados: bootAmount,
      AmortiguadoresCantidad: shockAbsorberQuantity,
      BasesCantidad: baseQuantity,
      BootCantidad: bootQuantity,
      MesesAmortiguadores: [shockAbsorberMonth],
      MesesBases: [baseMonth],
      MesesBoots: [bootMonth]
    })

    return await productsIndicatorsSaved.save()
  }
}
