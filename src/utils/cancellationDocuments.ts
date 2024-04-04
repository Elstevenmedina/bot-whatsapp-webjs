import DeliveryNoteModel from '../models/deliveryNote'
import NoteRefundModel from '../models/noteRefund'
import NotesRefundAmountModel from '../models/notesRefundAmount'
import PaymentNoteModel from '../models/paymentNote'
import { type NoteRefund, type DeliveryNote, type NotesRefundAmount, type PaymentNote } from '../interfaces'
import { cancellationDeliveryNote } from './cancellationDeliveryNote'
import { cancellationRefundNote } from './cancellationRefundNote'
import { cancellationAmountRefundNote } from './cancellationAmountRefundNote'
import { cancellationPaymentNote } from './cancellationPaymentNote'

export const cancellationDocument = async (numberDocument: number): Promise<boolean> => {
  const deliveryNote: DeliveryNote | undefined | null = await DeliveryNoteModel.findOne({ Numero: numberDocument })

  if (deliveryNote !== undefined && deliveryNote !== null) {
    return await cancellationDeliveryNote(deliveryNote)
  }
  const noteRefund: NoteRefund | undefined | null = await NoteRefundModel.findOne({ Numero: numberDocument })
  if (noteRefund !== undefined && noteRefund !== null) {
    return await cancellationRefundNote(noteRefund)
  }
  const noteRefundAmount: NotesRefundAmount | undefined | null = await NotesRefundAmountModel.findOne({ Numero: numberDocument })
  if (noteRefundAmount !== undefined && noteRefundAmount !== null) {
    return await cancellationAmountRefundNote(noteRefundAmount)
  }
  const PaymentNote: PaymentNote | undefined | null = await PaymentNoteModel.findOne({ Numero: numberDocument })
  if (PaymentNote !== undefined && PaymentNote !== null) {
    return await cancellationPaymentNote(PaymentNote)
  }
  return false
}
