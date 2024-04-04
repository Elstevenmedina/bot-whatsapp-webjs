import ClientModel from '../models/client'
import { type ClientsDebt } from '../interfaces/clientDebt'
import { type DeliveryNoteDebt } from '../interfaces/DeliveryNoteDebt'

export const getClientDebt = async (notes: DeliveryNoteDebt[]): Promise<ClientsDebt[]> => {
  const clientDebt: ClientsDebt[] = []
  try {
    for (const note of notes) {
      const clientData: ClientsDebt | undefined = clientDebt.find((data) => data.Cliente === note.Cliente)
      if (clientData !== null && clientData !== undefined) {
        clientData.CantidadNotas += 1
        clientData.Neto += note.Neto
        clientData.Saldo += note.Saldo
      } else {
        try {
          const client: { Contacto1: string } = await ClientModel.findOne({ Empresa: note.Cliente }).select('Contacto1')
          if (client !== null && client !== undefined) {
            clientDebt.push({
              Cliente: note.Cliente,
              CantidadNotas: 1,
              Neto: note.Neto,
              Saldo: note.Saldo,
              NumeroTelefonico: +client.Contacto1
            })
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  } catch (err) {
    console.log(err)
  }

  return clientDebt
}
