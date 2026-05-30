import { OperadorResponse } from '../Operador/operador.model'
import { ProveedorResponse } from '../Proveedor/proveedor.model'
import { ViajeroResponse, ViajeroConPersonaNatural } from '../Viajero/viajero.model'
import { ProductoResponse } from '../Producto/producto.model'
import { LiquidacionResponse } from './liquidacion.model'

export interface DetalleLiquidacionResponse {
  id: number
  ticket?: string
  documentCollection?: string
  costTicket?: number
  chargeService?: number
  valueSale?: number
  feeEmision?: string
  documentFee?: string
  comission?: string
  invoicePurchase?: string
  ticketPassenger?: string
  amountDiscount?: number
  paymentPaxUSD?: number
  paymentPaxPEN?: number
  created?: string
  updated?: string

  liquidation?: LiquidacionResponse
  traveler?: ViajeroConPersonaNatural

  product?: ProductoResponse
  supplier?: ProveedorResponse
  operator?: OperadorResponse
}

export interface DetalleLiquidacionRequest {
  liquidationId?: number    // Requerido para creación (se agrega automáticamente en servicio)
  ticket?: string
  documentCollection?: string
  costTicket?: number
  chargeService?: number
  valueSale?: number
  feeEmision?: string
  documentFee?: string
  comission?: string
  invoicePurchase?: string
  ticketPassenger?: string
  amountDiscount?: number
  paymentPaxUSD?: number
  paymentPaxPEN?: number

  // Campos opcionales - se pueden asignar después en edición
  travelerId?: number    // Opcional
  productId?: number   // Opcional
  supplierId?: number  // Opcional
  operatorId?: number   // Opcional
}

export interface DetalleLiquidacionSimple{
  id: number
  ticket?: string
  documentCollection?: string
  costTicket?: number
  chargeService?: number
  valueSale?: number
  feeEmision?: string
  documentFee?: string
  comission?: string
  invoicePurchase?: string
  ticketPassenger?: string
  amountDiscount?: number
  paymentPaxUSD?: number
  paymentPaxPEN?: number

  traveler?: ViajeroConPersonaNatural
  product?: ProductoResponse
  supplier?: ProveedorResponse
  operator?: OperadorResponse
}

export interface DetalleLiquidacionSinLiquidacion{
  id: number
  ticket?: string
  documentCollection?: string
  costTicket?: number
  chargeService?: number
  valueSale?: number
  feeEmision?: string
  documentFee?: string
  comission?: string
  invoicePurchase?: string
  ticketPassenger?: string
  amountDiscount?: number
  paymentPaxUSD?: number
  paymentPaxPEN?: number
  created?: string
  updated?: string

  traveler?: ViajeroConPersonaNatural
  product?: ProductoResponse
  supplier?: ProveedorResponse
  operator?: OperadorResponse
}
