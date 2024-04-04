import { type CancellationRequest } from '../../../interfaces'
import CancellationRequestModel from '../../../models/cancellationRequest'
import { CronJob } from 'cron'
import { sendMessage } from '../../initWhatsapp'
import { ManagementWhatsappNumbers } from '../../../enums/ManagementWhatsappNumbers'

export const sendCancellationsRequest = new CronJob('* * * * *', async () => {
  try {
    const cancellationRequests: CancellationRequest[] = await CancellationRequestModel.find({ Estado: 'Pendiente' })

    const whatsappNumber: string = ManagementWhatsappNumbers.Management1

    for (const request of cancellationRequests) {
      const message: string = `*Nueva solicitud de anulación*\n\n
            *Tipo de documento*: ${request.TipoDocumento}\n
            *Número de documento*: ${request.NumeroDocumento}\n
            *Motivo de anulación*: ${request.Motivo}\n
            *Usuario*: ${request.Usuario}\n\n
            Para aprobar la anulación escribe: *Anular ${request.NumeroDocumento}*
            `
      sendMessage(whatsappNumber, message)
    }
  } catch (err) {
    console.log(err)
  }
})
