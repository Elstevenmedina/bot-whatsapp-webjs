import { type PurchaseOrders, type OrderRequest } from '../../../interfaces'
import ClientModel from '../../../models/client'
import OrderRequestModel from '../../../models/orderRequest'
import PurchaseOrderModel from '../../../models/purchaseOrders'
import { CronJob } from 'cron'
import { sendMessage } from '../../initWhatsapp'

export const sendOrderRequest = new CronJob('59 * * * * *', async () => {
  try {
    let orderRequests: OrderRequest | OrderRequest[] | null | any[] = await OrderRequestModel.findOne({ EstadoEnvio: 'Pendiente' })
    orderRequests = orderRequests ? [orderRequests] : []
    for (const request of orderRequests) {
      let message: string = '*Solicitudes de ordenes de compra para revisión*\n\n'
      const order: PurchaseOrders | null = await PurchaseOrderModel.findOne({ Numero: request.NumeroOrden })
      if (order !== undefined && order !== null) {
        const client: string = order.Cliente
        const totalPrice: string = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.PrecioTotal)

        const clientData: { NumeroAdministrativo: string } = await ClientModel.findOne({ Empresa: client }).select('NumeroAdministrativo')

        message += `*Cliente: ${client}*\n 
              Numero: ${request.NumeroOrden}\n 
              Monto: ${totalPrice}:\n
              Enlace: https://app.thomsonparts.com/aprobar-rechazar-orden/${request.NumeroOrden} \n\n`

        const whatsappNumber: string = `${clientData?.NumeroAdministrativo}@c.us`
        console.log({
          whatsappNumber,
          message
        })
        await OrderRequestModel.findOneAndUpdate({ NumeroOrden: request.NumeroOrden }, { EstadoEnvio: 'Enviado' })
        sendMessage(whatsappNumber, message)

      }
    }
  } catch (err) {
    console.log(err)
  }
})
