"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientDebt = void 0;
const client_1 = __importDefault(require("../models/client"));
const getClientDebt = async (notes) => {
    const clientDebt = [];
    try {
        for (const note of notes) {
            const clientData = clientDebt.find((data) => data.Cliente === note.Cliente);
            if (clientData !== null && clientData !== undefined) {
                clientData.CantidadNotas += 1;
                clientData.Neto += note.Neto;
                clientData.Saldo += note.Saldo;
            }
            else {
                try {
                    const client = await client_1.default.findOne({ Empresa: note.Cliente }).select('Contacto1');
                    if (client !== null && client !== undefined) {
                        clientDebt.push({
                            Cliente: note.Cliente,
                            CantidadNotas: 1,
                            Neto: note.Neto,
                            Saldo: note.Saldo,
                            NumeroTelefonico: +client.Contacto1
                        });
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    return clientDebt;
};
exports.getClientDebt = getClientDebt;
