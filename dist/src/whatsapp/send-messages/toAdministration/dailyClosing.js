"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDailyClosing = void 0;
const cron_1 = require("cron");
const initWhatsapp_1 = require("../../initWhatsapp");
const getDailyClosing_1 = require("../../../utils/getDailyClosing");
const ManagementWhatsappNumbers_1 = require("../../../enums/ManagementWhatsappNumbers");
exports.sendDailyClosing = new cron_1.CronJob('01 01 21 * * *', async () => {
    const dailyClosing = await (0, getDailyClosing_1.getDailyClosing)();
    const message = `*Reporte de cierre diario*\n\n *Monto vendido*: ${dailyClosing.amountSold}\n *Monto cobrado*: ${dailyClosing.amountCollected}\n *Egreso por devoluciones*: ${dailyClosing.egressReturn}\n *Egreso por anulaciones*: ${dailyClosing.egressCancellation}\n *Egreso general*: ${dailyClosing.egressGeneral}\n *Cuentas por cobrar*: ${dailyClosing.accountsCollect} \n\n`;
    (0, initWhatsapp_1.sendMessage)(ManagementWhatsappNumbers_1.ManagementWhatsappNumbers.Management1, message);
});
