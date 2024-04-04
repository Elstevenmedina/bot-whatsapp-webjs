"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyClosing = void 0;
const deliveryNote_1 = __importDefault(require("../models/deliveryNote"));
const noteRefund_1 = __importDefault(require("../models/noteRefund"));
const notesRefundAmount_1 = __importDefault(require("../models/notesRefundAmount"));
const paymentNote_1 = __importDefault(require("../models/paymentNote"));
const moment_1 = require("../moment");
const returnFormatUSD = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};
const getDailyClosing = async () => {
    const date = (0, moment_1.getDate)();
    const deliveryNotesIssued = await deliveryNote_1.default.find({ Fecha: date });
    const deliveryNotesCancelled = await deliveryNote_1.default.find({ FechaAnulacion: date });
    const notesRefundIssued = await noteRefund_1.default.find({ Fecha: date });
    const notesRefundAmountIssued = await notesRefundAmount_1.default.find({ Fecha: date });
    const paymentNoteIssued = await paymentNote_1.default.find({ Fecha: date });
    const deliveryNoteToBeCollected = await deliveryNote_1.default.find({ Estado: 'Por cobrar' });
    const amountSold = deliveryNotesIssued.reduce((accumulator, note) => {
        return +(accumulator + note.Neto).toFixed(2);
    }, 0);
    const amountCollected = paymentNoteIssued.reduce((accumulator, note) => {
        return +(accumulator + note.PagadoTotal).toFixed(2);
    }, 0);
    const egressReturnProducts = notesRefundIssued.reduce((accumulator, note) => {
        return +(accumulator + note.ValorTotal).toFixed(2);
    }, 0);
    const egressReturnAmount = notesRefundAmountIssued.reduce((accumulator, note) => {
        return +(accumulator + note.Productos[0].Precio).toFixed(2);
    }, 0);
    const egressCancellation = deliveryNotesCancelled.reduce((accumulator, note) => {
        return +(accumulator + note.Neto).toFixed(2);
    }, 0);
    const accountsCollect = deliveryNoteToBeCollected.reduce((accumulator, note) => {
        return +(accumulator + note.Saldo).toFixed(2);
    }, 0);
    const egressReturn = +(egressReturnProducts + egressReturnAmount).toFixed(2);
    const egressGeneral = +(egressReturn + egressCancellation).toFixed(2);
    const dailyClosing = {
        amountSold: returnFormatUSD(amountSold),
        amountCollected: returnFormatUSD(amountCollected),
        egressReturnProducts: returnFormatUSD(egressReturnProducts),
        egressReturnAmount: returnFormatUSD(egressReturnAmount),
        egressCancellation: returnFormatUSD(egressCancellation),
        accountsCollect: returnFormatUSD(accountsCollect),
        egressReturn: returnFormatUSD(egressReturn),
        egressGeneral: returnFormatUSD(egressGeneral)
    };
    return dailyClosing;
};
exports.getDailyClosing = getDailyClosing;
