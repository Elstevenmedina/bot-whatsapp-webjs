import mongoose, { Schema } from 'mongoose'
import { type Client } from '../interfaces'

const clientechema = new Schema<Client>({
  _idVendedor: { type: String, require: true },
  Apellidos: { type: String, require: true },
  ApellidosVendedor: { type: String, require: true },
  Cedula: { type: String, require: true },
  Codigo: { type: Number, require: true },
  CodigoPostal: { type: String },
  CodigoZona: { type: String, require: true },
  Contacto1: { type: String, require: true },
  Contacto2: { type: String },
  Direccion: { type: String, require: true },
  email: { type: String, require: true },
  Empresa: { type: String, require: true },
  Estado: { type: String, default: 'Activo' },
  Nombres: { type: String, require: true },
  NombresVendedor: { type: String, require: true },
  NumeroAdministrativo: { type: String, require: true },
  RIF: { type: String, require: true },
  SaldoFavor: { type: Number, default: 0 },
  TipoPrecio: { type: String, require: true },
  Zona: { type: String, require: true }
})

const ClientModel = mongoose.model<Client>('clientes', clientechema)

export default ClientModel
