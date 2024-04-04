import DeliveryNoteModel from '../models/deliveryNote'
import NotesRefundAmountModel from '../models/notesRefundAmount'
import CancellationRequestModel from '../models/cancellationRequest'
import { type NotesRefundAmount } from '../interfaces'
import { newActivity } from './newActivity'
import { updateAccountingBook } from './updateAccountingBook'
import { updateClientAccount } from './updateClientAccount'

export const cancellationAmountRefundNote = async (amountRefundNote: NotesRefundAmount): Promise<boolean> => {
  try {
    const cancellationRequest = await CancellationRequestModel.findOne({ NumeroDocumento: amountRefundNote.Recibo }).select('Usuario _idUsuario Motivo')
    if (cancellationRequest !== null && cancellationRequest !== undefined) {
      await newActivity(cancellationRequest.Usuario, cancellationRequest._idUsuario, 'Facturación', `Anulo la nota de devolución #${amountRefundNote.Recibo}`)

      const deliveryNoteNumber = amountRefundNote.Productos[0].NotaEntrega
      const totalPrice = amountRefundNote.Productos[0].Precio
      const deliveryNoteInfo = await DeliveryNoteModel.findOne({ Numero: deliveryNoteNumber }).select('Neto2 Saldo Anio Mes')
      if (deliveryNoteInfo !== undefined && deliveryNoteInfo !== null) {
        const net2: number = +(deliveryNoteInfo.Neto2 + totalPrice).toFixed(2)
        const balance: number = +(deliveryNoteInfo.Saldo + totalPrice).toFixed(2)

        await DeliveryNoteModel.findOneAndUpdate({ Numero: deliveryNoteNumber }, {
          Neto2: net2,
          Saldo: balance,
          Estado: 'Por cobrar'
        })

        await NotesRefundAmountModel.findOneAndUpdate({ Recibo: amountRefundNote.Recibo }, {
          Estado: 'Anulada'
        })

        await updateAccountingBook(amountRefundNote.Recibo, 'Anulación de devolución', amountRefundNote.Cliente, deliveryNoteInfo.Anio, deliveryNoteInfo.Mes, 0, totalPrice)
        const argumentsUpdateCliente = {
          client: amountRefundNote.Cliente,
          rif: deliveryNoteInfo.RIF,
          documentType: 'Nota de devolución',
          documentNumber: amountRefundNote.Recibo,
          date: amountRefundNote.Fecha,
          dueDate: '',
          credit: 0,
          debit: totalPrice,
          cancellation: 'Anulación'
        }

        await updateClientAccount(argumentsUpdateCliente)

        return true
      }
    }

    return false
  } catch (err) {
    console.log(err)
    return false
  }
}
