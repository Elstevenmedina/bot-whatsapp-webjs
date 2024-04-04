import { CronJob } from 'cron'
import { getWeeklyClosing } from '../../../utils/getWeeklyClosing'
import { sendMessage } from '../../initWhatsapp'
import { ManagementWhatsappNumbers } from '../../../enums/ManagementWhatsappNumbers'

export const sendWeeklyCollectionRecord = new CronJob('01 01 21 * * fri', async () => {
  const weeklyCollection = await getWeeklyClosing()

  if (weeklyCollection[0] !== null && weeklyCollection[0] !== undefined) {
    const message = `*Constancia semanal de cobro*\n\n Monto Cobrado :${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(weeklyCollection[0].PagadoTotal)} \n\n https://app.thomsonparts.com/ver-constancia-cobros/${weeklyCollection[0].Numero}`
    sendMessage('584244577241@c.us'/*ManagementWhatsappNumbers.Management1*/, message)
  }
  if (weeklyCollection[1] !== null && weeklyCollection[1] !== undefined) {
    const message = `*Constancia semanal de cobro*\n\n Monto Cobrado :${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(weeklyCollection[1].PagadoTotal)} \n\n https://app.thomsonparts.com/ver-constancia-cobros/${weeklyCollection[1].Numero}`
    sendMessage('584244577241@c.us'/*ManagementWhatsappNumbers.Management2*/, message)
  }
})
