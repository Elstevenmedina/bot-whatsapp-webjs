import moment from 'moment'
import PaymentNoteModel from '../models/paymentNote'
import { type PaymentNote } from '../interfaces/paymentNote'
import { type WeeklyCollectionRecord } from '../interfaces'
import DeliveryNoteModel from '../models/deliveryNote'
import { Stores } from '../enums/Stores'
import WeeklyCollectionRecordModel from '../models/weeklyCollectionRecord'
import { getDate } from '../moment'

export const getWeeklyClosing = async (): Promise<WeeklyCollectionRecord[]> => {
  const today = moment()

  let paymentNotes: PaymentNote[] = []

  for (let i = 0; i < 7; i++) {
    const date = today.clone().subtract(i, 'days')
    const dateNote = date.format('DD/MM/YYYY')
    const paymentNoteSearched = await PaymentNoteModel.find({ Fecha: dateNote }).lean()
    paymentNotes = [...paymentNotes, ...paymentNoteSearched]
  }

  const notesStoreA = []
  const notesStoreB = []

  for (const note of paymentNotes) {
    for (const deliveryNote of note.Notas) {
      const deliveryNoteBase = await DeliveryNoteModel.findOne({ Numero: deliveryNote.Nota }).select('Almacen Cliente Neto Saldo')
      if (deliveryNoteBase !== null && deliveryNoteBase !== undefined) {
        if (deliveryNoteBase.Almacen == Stores.StoreA) {
          notesStoreA.push({
            Numero: +deliveryNote.Nota,
            Cliente: deliveryNoteBase.Cliente,
            Neto: deliveryNoteBase.Neto,
            MontoCancelado: deliveryNote.Pago,
            Saldo: deliveryNoteBase.Saldo
          })
        } else {
          notesStoreB.push({
            Numero: +deliveryNote.Nota,
            Cliente: deliveryNoteBase.Cliente,
            Neto: deliveryNoteBase.Neto,
            MontoCancelado: deliveryNote.Pago,
            Saldo: deliveryNoteBase.Saldo
          })
        }
      }
    }
  }

  notesStoreA.sort((a, b) => a.Numero - b.Numero)
  notesStoreB.sort((a, b) => a.Numero - b.Numero)
  const numberBase = 120230000001
  const weeklyCollections = []
  if (notesStoreA.length > 0) {
    const lastWeeklyCollection = await WeeklyCollectionRecordModel.findOne().sort({ Numero: -1 })
    const Number = (lastWeeklyCollection !== null && lastWeeklyCollection !== undefined) ? lastWeeklyCollection.Numero + 1 : numberBase

    const PaidTotal: number = notesStoreA.reduce((accumulator, note) => {
      return +(accumulator + note.MontoCancelado).toFixed(2)
    }, 0)

    const newWeeklyCollection = new WeeklyCollectionRecordModel({
      Numero: Number,
      Almacen: Stores.StoreA,
      Fecha: getDate(),
      PagadoTotal: PaidTotal,
      Notas: notesStoreA,
      Timestamp: Date.now()
    })

    await newWeeklyCollection.save()
    weeklyCollections.push(newWeeklyCollection)
  }

  if (notesStoreB.length > 0) {
    const lastWeeklyCollection = await WeeklyCollectionRecordModel.findOne().sort({ Numero: -1 })
    const Number = (lastWeeklyCollection !== null && lastWeeklyCollection !== undefined) ? lastWeeklyCollection.Numero + 1 : numberBase

    const PaidTotal: number = notesStoreB.reduce((accumulator, note) => {
      return +(accumulator + note.MontoCancelado).toFixed(2)
    }, 0)

    const newWeeklyCollection = new WeeklyCollectionRecordModel({
      Numero: Number,
      Almacen: Stores.StoreB,
      Fecha: getDate(),
      PagadoTotal: PaidTotal,
      Notas: notesStoreB,
      Timestamp: Date.now()

    })

    await newWeeklyCollection.save()
    weeklyCollections.push(newWeeklyCollection)
  }

  return weeklyCollections
}
