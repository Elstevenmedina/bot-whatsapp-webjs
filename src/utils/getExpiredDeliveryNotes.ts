import { type DeliveryNoteDebt } from '../interfaces'
import DeliveryNoteModel from '../models/deliveryNote'

export const getExpiredDeliveryNotes = async (): Promise<DeliveryNoteDebt[]> => {
  const deliveryNotes = await DeliveryNoteModel.find({ Estado: 'Por cobrar' }).sort({ Timestamp: -1 })
  let totalNet: number = 0
  let totalBalance: number = 0

  const deliveryNotesFormated = deliveryNotes.filter((note) => {
    const dueDate: Date = new Date(
      +note.Vencimiento.split('/')[2],
      (+note.Vencimiento.split('/')[1] - 1),
      +note.Vencimiento.split('/')[0])

    const today: Date = new Date()

    today.setDate(today.getDate() + 5)
    const days: number = +dueDate - +today
    return days <= 0
  }).map((note) => {
    totalNet = totalNet + note.Neto
    totalBalance = totalBalance + note.Saldo
    return {
      Cliente: note.Cliente,
      Neto: note.Neto,
      Saldo: note.Saldo,
      CantidadTotal: note.CantidadTotal
    }
  })

  return deliveryNotesFormated
}
