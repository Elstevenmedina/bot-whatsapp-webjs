import { CronJob } from 'cron'
import { sendMessage } from '../../initWhatsapp'
import { getDailyClosing } from '../../../utils/getDailyClosing'
import { ManagementWhatsappNumbers } from '../../../enums/ManagementWhatsappNumbers'

export const sendDailyClosing = new CronJob('01 01 21 * * *', async () => { //3
  const dailyClosing = await getDailyClosing()
  const message = `*Reporte de cierre diario*\n\n *Monto vendido*: ${dailyClosing.amountSold}\*nMonto cobrado*: ${dailyClosing.amountCollected}\*nEgreso por devoluciones*: ${dailyClosing.egressReturn}\*nEgreso por anulaciones*: ${dailyClosing.egressCancellation}\*nEgreso general*: ${dailyClosing.egressGeneral}\*nCuentas por cobrar*: ${dailyClosing.accountsCollect} \n\n`
  sendMessage(ManagementWhatsappNumbers.Management1, message)
})
