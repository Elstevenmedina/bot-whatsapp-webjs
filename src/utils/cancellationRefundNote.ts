import DeliveryNoteModel from '../models/deliveryNote'
import NoteRefundModel from '../models/noteRefund'
import CancellationRequestModel from '../models/cancellationRequest'
import { type NoteRefund } from '../interfaces'
import { newMovementProduct } from './updateProducts'
import { updateAccountingBook } from './updateAccountingBook'
import { updateClientAccount } from './updateClientAccount'
import { MovementTypes } from '../enums/MovementTypes'

export const cancellationRefundNote = async (refundNote: NoteRefund): Promise<boolean> => {
  const cancellationRequest = await CancellationRequestModel.findOne({ NumeroDocumento: refundNote.Numero })
  if (cancellationRequest !== null && cancellationRequest !== undefined) {
    const productsRefundNote = refundNote.Productos
    await newMovementProduct(productsRefundNote, refundNote.Numero, MovementTypes.Substract, 'Descarga por anulación de nota de devolución')
    const deliveryNoteInfo = await DeliveryNoteModel.findOne({ Numero: refundNote.Numero }).lean()
    if (deliveryNoteInfo !== undefined && deliveryNoteInfo !== null) {
      const productDeliveryNote = deliveryNoteInfo.Productos
      const newProducts = []
      const quantity2 = deliveryNoteInfo.CantidadTotal2 + refundNote.CantidadTotal
      for (const product of productDeliveryNote) {
        const productFound = productsRefundNote.find((productRefund) => productRefund.Codigo === product.Codigo)
        if (productFound !== undefined && productFound !== null) {
          product.Cantidad2 = (+product.Cantidad2 + +productFound.Cantidad).toFixed(2)
          newProducts.push(product)
        } else {
          newProducts.push(product)
        }
      }

      const balance: number = +(deliveryNoteInfo.Saldo + refundNote.ValorTotal).toFixed(2)
      const net2: number = +(deliveryNoteInfo.Neto2 + refundNote.ValorTotal).toFixed(2)

      await DeliveryNoteModel.findOneAndUpdate({ Numero: deliveryNoteInfo.Numero }, {
        Productos: newProducts,
        Saldo: balance,
        CantidadTotal2: quantity2,
        Neto2: net2,
        Estado: 'Por cobrar'
      })

      await NoteRefundModel.findOneAndUpdate({ Numero: refundNote.Numero }, {
        Estado: 'Anulado',
        ComentarioAnualcion: cancellationRequest.Motivo
      })

      await updateAccountingBook(refundNote.Numero, 'Anulación de devolución', refundNote.Cliente, deliveryNoteInfo.Anio, deliveryNoteInfo.Mes, 0, refundNote.ValorTotal)

      const argumentsUpdateCliente = {
        client: refundNote.Cliente,
        rif: refundNote.RIF,
        documentType: 'Nota de devolución',
        documentNumber: refundNote.Numero,
        date: refundNote.Fecha,
        dueDate: '',
        credit: 0,
        debit: refundNote.ValorTotal,
        cancellation: 'Anulación'
      }

      await updateClientAccount(argumentsUpdateCliente)
      return true
    }
  }
  return false
}
