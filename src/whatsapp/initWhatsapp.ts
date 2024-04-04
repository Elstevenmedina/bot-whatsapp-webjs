import { type Whatsapp, create } from 'venom-bot'
import { receiveAnnulationConfirms } from './receive-messages/administration/receiveCancellationRequest'
import { type whatsappMessageReceive } from '../interfaces'
import { Client, LocalAuth } from 'whatsapp-web.js'
import QRCodeTerminal from 'qrcode-terminal';
let init: boolean = false

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

const clientWhatsapp = new Client({
  authStrategy: new LocalAuth({ dataPath: "sessions", }),
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
  }
});

clientWhatsapp.on('qr', (qr) => {
  QRCodeTerminal.generate(qr, { small: true });
});

const sendNewMessage = () => {
  clientWhatsapp.sendMessage('584242423890@c.us', 'Prueba')
}

clientWhatsapp.on('ready', () => {
  init = true
  console.log('Client is ready!');
});
clientWhatsapp.on('message', (msg) => {
  receiveAnnulationConfirms(msg)
});

clientWhatsapp.initialize();

export const sendMessage = (numberWhatsapp: string, message: string): void => {
  if (init === false) {
    throw new Error('Client is not initialized')
  } else {
    clientWhatsapp.sendMessage(numberWhatsapp, message)
  }
}
