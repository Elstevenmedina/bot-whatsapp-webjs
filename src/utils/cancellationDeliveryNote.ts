import DeliveryNoteModel from '../models/deliveryNote'
import NoteRefundModel from '../models/noteRefund'
import PaymentNoteModel from '../models/paymentNote'
import CancellationRequestModel from '../models/cancellationRequest'
import { type DeliveryNote } from '../interfaces'
import { newActivity } from './newActivity'
import { updateDashboard, updateProductsDashboard } from './updateDashboard'
import { getDate } from '../moment'
import { newMovementProduct } from './updateProducts'
import { updateAccountingBook } from './updateAccountingBook'
import { updateClientAccount } from './updateClientAccount'
import { MovementTypes } from '../enums/MovementTypes'

export const cancellationDeliveryNote = async (deliveryNote: DeliveryNote): Promise<boolean> => {
  try {
    const cancellationRequest = await CancellationRequestModel.findOne({ NumeroDocumento: deliveryNote.Numero })
    if (cancellationRequest !== undefined && cancellationRequest !== null) {
      await newActivity(cancellationRequest.Usuario, cancellationRequest._idUsuario, 'Facturación', `Anulo la nota de entrega #${deliveryNote.Numero}`)
      await updateDashboard(deliveryNote.Productos, getDate(), deliveryNote.Numero, deliveryNote.TipoPrecio, deliveryNote.Neto)
      await updateProductsDashboard(deliveryNote.Productos, getDate())
      await newMovementProduct(deliveryNote.Productos, deliveryNote.Numero, MovementTypes.Add, 'Carga por anulación de nota de entrega')

      const historyNote = deliveryNote.HistorialPago
      for (const history of historyNote) {
        const paymentNote = await PaymentNoteModel.findOne({ Numero: history.Recibo })
        const comment = `Anulación de nota de entrega asociada #${deliveryNote.Numero} `
        if (paymentNote !== undefined && paymentNote !== null) {
          await PaymentNoteModel.findOneAndUpdate({ Numero: history.Recibo }, {
            Estado: 'Anulado',
            ComentarioAnualcion: comment
          })
        } else {
          await NoteRefundModel.findOneAndUpdate({ Numero: history.Recibo }, {
            Estado: 'Anulado',
            ComentarioAnualcion: comment
          })
        }
      }

      await DeliveryNoteModel.findOneAndUpdate({ Numero: deliveryNote.Numero }, {
        Estado: 'Anulado',
        Saldo: 0,
        ComentarioAnualcion: cancellationRequest.Motivo,
        FechaAnulacion: getDate()
      })

      await updateAccountingBook(deliveryNote.Numero, 'Anulación nota de entrega', deliveryNote.Cliente, deliveryNote.Anio, deliveryNote.Mes, deliveryNote.Neto, 0)
      const argumentsUpdateCliente = {
        client: deliveryNote.Cliente,
        rif: deliveryNote.RIF,
        documentType: 'Nota de entrega',
        documentNumber: deliveryNote.Numero,
        date: deliveryNote.Fecha,
        dueDate: deliveryNote.Vencimiento,
        credit: deliveryNote.Neto,
        debit: 0,
        cancellation: 'Anulación'
      }
      await updateClientAccount(argumentsUpdateCliente)

      return true
    }
    return false
  } catch (err) {
    console.log(err)
    return false
  }
}
