import DeliveryNoteModel from '../models/deliveryNote'
import PaymentNoteModel from '../models/paymentNote'
import CancellationRequestModel from '../models/cancellationRequest'
import { type PaymentNote } from '../interfaces'
import { newActivity } from './newActivity'
import { updateClientAccount } from './updateClientAccount'

export const cancellationPaymentNote = async (paymentNote: PaymentNote): Promise<boolean> => {
  try {
    const cancellationRequest = await CancellationRequestModel.findOne({ NumeroDocumento: paymentNote.Numero }).select('Usuario _idUsuario Motivo')
    if (cancellationRequest !== null && cancellationRequest !== undefined) {
      await newActivity(cancellationRequest.Usuario, cancellationRequest._idUsuario, 'Facturación', `Anulo la nota de pago #${paymentNote.Numero}`)

      for (const note of paymentNote.Notas) {
        const deliveryNote = await DeliveryNoteModel.findOne({ Numero: note.Nota }).select('Saldo')
        if (deliveryNote !== undefined && deliveryNote !== null) {
          const balance: number = +(deliveryNote.Saldo + note.Pago).toFixed(2)
          await DeliveryNoteModel.findByIdAndUpdate(deliveryNote._id, {
            Saldo: balance,
            Estado: 'Por cobrar'
          })
        }
      }

      await PaymentNoteModel.findOneAndUpdate({ Numero: paymentNote.Numero }, {
        Estado: 'Anulado',
        ComentarioAnulacion: cancellationRequest.Motivo
      })

      const argumentsUpdateCliente = {
        client: paymentNote.Cliente,
        rif: paymentNote.RIF,
        documentType: 'Nota de pago',
        documentNumber: paymentNote.Numero,
        date: paymentNote.Fecha,
        dueDate: '',
        credit: 0,
        debit: paymentNote.PagadoTotal,
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
