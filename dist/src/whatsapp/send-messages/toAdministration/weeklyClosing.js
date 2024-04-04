"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWeeklyCollectionRecord = void 0;
const cron_1 = require("cron");
const getWeeklyClosing_1 = require("../../../utils/getWeeklyClosing");
const initWhatsapp_1 = require("../../initWhatsapp");
exports.sendWeeklyCollectionRecord = new cron_1.CronJob('01 01 21 * * fri', async () => {
    const weeklyCollection = await (0, getWeeklyClosing_1.getWeeklyClosing)();
    if (weeklyCollection[0] !== null && weeklyCollection[0] !== undefined) {
        const message = `*Constancia semanal de cobro*\n\n Monto Cobrado :${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(weeklyCollection[0].PagadoTotal)} \n\n https://app.thomsonparts.com/ver-constancia-cobros/${weeklyCollection[0].Numero}`;
        (0, initWhatsapp_1.sendMessage)('584244577241@c.us' /*ManagementWhatsappNumbers.Management1*/, message);
    }
    if (weeklyCollection[1] !== null && weeklyCollection[1] !== undefined) {
        const message = `*Constancia semanal de cobro*\n\n Monto Cobrado :${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(weeklyCollection[1].PagadoTotal)} \n\n https://app.thomsonparts.com/ver-constancia-cobros/${weeklyCollection[1].Numero}`;
        (0, initWhatsapp_1.sendMessage)('584244577241@c.us' /*ManagementWhatsappNumbers.Management2*/, message);
    }
});
