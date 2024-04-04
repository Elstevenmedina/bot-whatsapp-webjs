import { sendMessage } from '../../initWhatsapp'
import { type whatsappMessageReceive } from '../../../interfaces/whatsappMessageReceive'
import { cancellationDocument } from '../../../utils/cancellationDocuments'
import { ManagementWhatsappNumbers } from '../../../enums/ManagementWhatsappNumbers'

export const receiveAnnulationConfirms = async (message: whatsappMessageReceive): Promise<void> => {
  const bodyMessage: string = (message.body != null && message.body !== undefined) ? message.body.toLowerCase() : ''
  const from: string = message.from
  const numberDocument: number = (message.body != null && message.body !== undefined) ? +message.body.split(' ')[1] : 0
  if (bodyMessage.includes('anular') && from.includes(ManagementWhatsappNumbers.Management1)) {
    const isCancelled: boolean = await cancellationDocument(numberDocument)
    if (isCancelled) sendMessage(from, `Documento #${numberDocument} anulado correctamente`)
  }
}
