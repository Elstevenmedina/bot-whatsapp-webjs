import { CronJob } from 'cron'
import { sendMessage } from '../../initWhatsapp'
import { getDailyClosing } from '../../../utils/getDailyClosing'
import { ManagementWhatsappNumbers } from '../../../enums/ManagementWhatsappNumbers'

export const sendDailyClosing = new CronJob('01 01 21 * * *', async () => { //3
  const dailyClosing = await getDailyClosing()
  const message = `*Reporte de cierre diario*\n\n *Monto vendido*: ${dailyClosing.amountSold}\n *Monto cobrado*: ${dailyClosing.amountCollected}\n *Egreso por devoluciones*: ${dailyClosing.egressReturn}\n *Egreso por anulaciones*: ${dailyClosing.egressCancellation}\n *Egreso general*: ${dailyClosing.egressGeneral}\n *Cuentas por cobrar*: ${dailyClosing.accountsCollect} \n\n`
  sendMessage(ManagementWhatsappNumbers.Management1, message)
})
