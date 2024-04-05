"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./src/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
(0, database_1.initDB)(process.env.DB_HOST);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    //sendMessagesClients.start()
    //
    //sendWeeklyCollectionRecord.start()
    //sendOrderRequest.start()
    //sendDailyClosing.start()
    //
    //sendCancellationsRequest.start()
    //sendMassiveMessages.start()
});
