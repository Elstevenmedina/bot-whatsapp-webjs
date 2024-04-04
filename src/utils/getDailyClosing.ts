import DeliveryNoteModel from '../models/deliveryNote'
import NoteRefundModel from '../models/noteRefund'
import NotesRefundAmountModel from '../models/notesRefundAmount'
import PaymentNoteModel from '../models/paymentNote'
import { getDate } from '../moment'

const returnFormatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

interface ReturnValueDailyClosing {
  amountSold: string
  amountCollected: string
  egressReturnProducts: string
  egressReturnAmount: string
  egressCancellation: string
  accountsCollect: string
  egressReturn: string
  egressGeneral: string
}

export const getDailyClosing = async (): Promise<ReturnValueDailyClosing> => {
  const date = getDate()

  const deliveryNotesIssued = await DeliveryNoteModel.find({ Fecha: date })
  const deliveryNotesCancelled = await DeliveryNoteModel.find({ FechaAnulacion: date })
  const notesRefundIssued = await NoteRefundModel.find({ Fecha: date })
  const notesRefundAmountIssued = await NotesRefundAmountModel.find({ Fecha: date })
  const paymentNoteIssued = await PaymentNoteModel.find({ Fecha: date })
  const deliveryNoteToBeCollected = await DeliveryNoteModel.find({ Estado: 'Por cobrar' })

  const amountSold = deliveryNotesIssued.reduce((accumulator, note) => {
    return +(accumulator + note.Neto).toFixed(2)
  }, 0)

  const amountCollected = paymentNoteIssued.reduce((accumulator, note) => {
    return +(accumulator + note.PagadoTotal).toFixed(2)
  }, 0)

  const egressReturnProducts = notesRefundIssued.reduce((accumulator, note) => {
    return +(accumulator + note.ValorTotal).toFixed(2)
  }, 0)

  const egressReturnAmount = notesRefundAmountIssued.reduce((accumulator, note) => {
    return +(accumulator + note.Productos[0].Precio).toFixed(2)
  }, 0)

  const egressCancellation = deliveryNotesCancelled.reduce((accumulator, note) => {
    return +(accumulator + note.Neto).toFixed(2)
  }, 0)

  const accountsCollect = deliveryNoteToBeCollected.reduce((accumulator, note) => {
    return +(accumulator + note.Saldo).toFixed(2)
  }, 0)

  const egressReturn: number = +(egressReturnProducts + egressReturnAmount).toFixed(2)
  const egressGeneral: number = +(egressReturn + egressCancellation).toFixed(2)

  const dailyClosing = {
    amountSold: returnFormatUSD(amountSold),
    amountCollected: returnFormatUSD(amountCollected),
    egressReturnProducts: returnFormatUSD(egressReturnProducts),
    egressReturnAmount: returnFormatUSD(egressReturnAmount),
    egressCancellation: returnFormatUSD(egressCancellation),
    accountsCollect: returnFormatUSD(accountsCollect),
    egressReturn: returnFormatUSD(egressReturn),
    egressGeneral: returnFormatUSD(egressGeneral)
  }

  return dailyClosing
}
