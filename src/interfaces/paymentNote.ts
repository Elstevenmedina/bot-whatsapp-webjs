export interface Notes {
  Comentario: string
  Destino: string
  Modalidad: string
  Nota: string
  Observacion: string
  Pago: number
  Pendiente: number
  Referencia: string
  Restante: number
}

export interface PaymentNote {
  Cliente: string
  Comentario: string
  ComentarioAnualcion: string
  Direccion: string
  Estado: string
  Fecha: string
  Notas: Notes[]
  Numero: number
  PagadoTotal: number
  Pendiente: number
  RIF: string
  SaldoFavorInlcuido: number
  SubTotal: number
  Telefono: string
  Timestamp: string
}
