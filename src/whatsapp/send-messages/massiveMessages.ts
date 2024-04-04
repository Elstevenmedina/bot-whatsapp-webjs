import { CronJob } from 'cron'
import WhatsappMessagesModel from '../../models/whatsappMessage'
import { sendMessage } from '../initWhatsapp'
import ClientModel from '../../models/client'

export const sendMassiveMessages = new CronJob('* 2 * * * *', async () => {
  const messages = await WhatsappMessagesModel.find({ Estado: 'Pendiente' })
  const clients = await ClientModel.find()

  for (const message of messages) {
    for (const users of message.Usuarios) {
      const clientFound = clients.find((client) => client._id.toString() === users)
      const whatsappNumber = (clientFound !== null && clientFound !== undefined) ? clientFound.Contacto1 : null
      if (whatsappNumber !== null) {
        // sendMessage(whatsappNumber, message.Contenido)
        sendMessage('584242449255@c.us', message.Contenido)
      }
    }
    await WhatsappMessagesModel.findByIdAndUpdate(message._id, {
      Estado: 'Enviado'
    })
  }
})
