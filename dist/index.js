"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./src/database");
const dotenv_1 = __importDefault(require("dotenv"));
const toClients_1 = require("./src/whatsapp/send-messages/toClients");
const cancellationRequest_1 = require("./src/whatsapp/send-messages/toAdministration/cancellationRequest");
//import './src/whatsapp/initWhatsapp'
const dailyClosing_1 = require("./src/whatsapp/send-messages/toAdministration/dailyClosing");
const weeklyClosing_1 = require("./src/whatsapp/send-messages/toAdministration/weeklyClosing");
const massiveMessages_1 = require("./src/whatsapp/send-messages/massiveMessages");
const orderRequest_1 = require("./src/whatsapp/send-messages/toAdministration/orderRequest");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const DB_HOST = 'mongodb+srv://thomsonmaster:44nmgek9l7xVQvc0@cluster0.5pqic.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-13kx2b-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true';
(0, database_1.initDB)(DB_HOST);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    toClients_1.sendMessagesClients.start();
    weeklyClosing_1.sendWeeklyCollectionRecord.start();
    orderRequest_1.sendOrderRequest.start();
    dailyClosing_1.sendDailyClosing.start();
    cancellationRequest_1.sendCancellationsRequest.start();
    massiveMessages_1.sendMassiveMessages.start();
});
