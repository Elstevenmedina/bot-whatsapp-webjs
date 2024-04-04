export interface PaymentHistory {
  Comentario: string
  FechaPago: string
  Modalidad: string
  Pago: string
  Recibo: number
  Timestamp: number
  user: string
}

export interface ProductsDeliveryNote {
  Cantidad: string
  Cantidad2: string
  Codigo: string
  Descripcion: string
  Facturado: boolean
  PrecioTotal: string
  PrecioTotal2: string
  PrecioUnidad: string
  Producto: string
}

export interface DeliveryNote {
  _idCliente: string
  _idVendedor: string
  Almacen: string
  Anio: string
  CantidadTotal: number
  CantidadTotal2: number
  Cliente: string
  CodigoCliente: string
  CodigoVendedor: string
  CodigoZona: string
  ComentarioAnualcion: string
  Comision: number
  Comision2: number
  Control: string[]
  Descuento: number
  DescuentoValor: number
  Direccion: string
  Estado: string
  EstadoComision: string
  EstadoComisionSupervisor: string
  Factura: string[]
  Fecha: string
  FechaAnulacion: string
  HistorialPago: PaymentHistory[]
  LibroContable: boolean
  Mes: string
  MontoTransporte: number
  Neto: number
  Neto2: number
  Nota: string
  Numero: number
  NumeroOrden: string
  PorcentajeComision: number
  PorcentajeComisionCancelada: number
  Productos: ProductsDeliveryNote[]
  RIF: string
  Saldo: number
  SubTotal: number
  Telefono: string
  Timestamp: number
  TipoDescuento: string
  TipoPrecio: string
  TodoFactuado: boolean
  Transporte: string
  Vencimiento: string
  Vendedor: string
  Zona: string
}
