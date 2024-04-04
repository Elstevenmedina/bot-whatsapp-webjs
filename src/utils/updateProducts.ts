import ProductModel from '../models/products'
import { type HistoryMovement } from '../interfaces/products'
import { getDate } from '../moment'

export const newMovementProduct = async (products: any[], numberDocument: number, type: number, description: string): Promise<void> => {
  const typeMovement: string = (type === 1) ? 'Carga' : 'Descarga'

  for (const product of products) {
    const productInfo = await ProductModel.findOne({ Codigo: product.Codigo }).select('Cantidad')
    if (productInfo !== undefined && productInfo !== null) {
      product.Cantidad2 = product.Cantidad2 ?? product.Cantidad
      const quantity: number = (type === 1) ? productInfo.Cantidad + +product.Cantidad2 : productInfo.Cantidad - +product.Cantidad2

      const HistoryMovement: HistoryMovement = {
        FechaMovimiento: getDate(),
        TipoMovimiento: typeMovement.toUpperCase(),
        CantidadAnterior: productInfo.Cantidad,
        CantidadMovida: +product.Cantidad2,
        CantidadNueva: quantity,
        Comentario: `${description} #${numberDocument}`,
        Timestamp: Date.now()
      }

      await ProductModel.findByIdAndUpdate(productInfo._id, {
        Cantidad: quantity,
        $push: { HistorialMovimiento: HistoryMovement }

      })
    }
  }
}
