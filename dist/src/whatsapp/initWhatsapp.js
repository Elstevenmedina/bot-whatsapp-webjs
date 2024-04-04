"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const receiveCancellationRequest_1 = require("./receive-messages/administration/receiveCancellationRequest");
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
let init = false;
/*
let clientWhatsapp: Whatsapp | undefined

const initWhatsapp = async (): Promise<void> => {
  try {
    clientWhatsapp = await create({ session: 'sesionName' })
    void clientWhatsapp.onMessage((message: whatsappMessageReceive) => {
      receiveAnnulationConfirms(message)
    })
  } catch (err) {
    console.log(err)
  }
}

void (async () => {
  try {
    await initWhatsapp()
  } catch (err) {
    console.log(err)
  }
})()


*/
const clientWhatsapp = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth({ dataPath: "sessions", }),
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    }
});
clientWhatsapp.on('qr', (qr) => {
    qrcode_terminal_1.default.generate(qr, { small: true });
});
const sendNewMessage = () => {
    clientWhatsapp.sendMessage('584242423890@c.us', 'Prueba');
};
clientWhatsapp.on('ready', () => {
    init = true;
    console.log('Client is ready!');
});
clientWhatsapp.on('message', (msg) => {
    (0, receiveCancellationRequest_1.receiveAnnulationConfirms)(msg);
});
clientWhatsapp.initialize();
const sendMessage = (numberWhatsapp, message) => {
    if (init === false) {
        throw new Error('Client is not initialized');
    }
    else {
        clientWhatsapp.sendMessage(numberWhatsapp, message);
    }
};
exports.sendMessage = sendMessage;
