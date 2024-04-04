"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpiredDeliveryNotes = void 0;
const deliveryNote_1 = __importDefault(require("../models/deliveryNote"));
const getExpiredDeliveryNotes = async () => {
    const deliveryNotes = await deliveryNote_1.default.find({ Estado: 'Por cobrar' }).sort({ Timestamp: -1 });
    let totalNet = 0;
    let totalBalance = 0;
    const deliveryNotesFormated = deliveryNotes.filter((note) => {
        const dueDate = new Date(+note.Vencimiento.split('/')[2], (+note.Vencimiento.split('/')[1] - 1), +note.Vencimiento.split('/')[0]);
        const today = new Date();
        today.setDate(today.getDate() + 5);
        const days = +dueDate - +today;
        return days <= 0;
    }).map((note) => {
        totalNet = totalNet + note.Neto;
        totalBalance = totalBalance + note.Saldo;
        return {
            Cliente: note.Cliente,
            Neto: note.Neto,
            Saldo: note.Saldo,
            CantidadTotal: note.CantidadTotal
        };
    });
    return deliveryNotesFormated;
};
exports.getExpiredDeliveryNotes = getExpiredDeliveryNotes;
