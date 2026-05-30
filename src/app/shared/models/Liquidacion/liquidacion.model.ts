import { CarpetaResponse } from '../Carpeta/carpeta.model'
import { CotizacionResponse } from '../Cotizacion/cotizacion.model'
import { FormaPagoResponse } from '../FormaPago/formaPago.model'
import { ProductoResponse } from '../Producto/producto.model'
import { DetalleLiquidacionSimple } from './detalleLiquidacion.model'
import { ObservacionLiquidacionSimple } from './observacionLiquidacion.model'

export interface LiquidacionRequest {
  number?: string
  datePurchase?: string
  destiny?: string
  numberPassenger?: number
  productId?: number
  methodPaymentId?: number
  quotationId?: number
}

export interface LiquidacionResponse {
  id: number
  number?: string
  datePurchase?: string
  destiny?: string
  numberPassenger?: number
  created?: string
  updated?: string

  quotation?: CotizacionResponse
  product?: ProductoResponse
  methodPayment?: FormaPagoResponse
  folder?: CarpetaResponse
  observationLiquidation?: ObservacionLiquidacionSimple[]
}

export interface LiquidacionConDetallesResponse {
  id: number
  number?: string
  datePurchase?: string
  destiny?: string
  numberPassenger?: number
  created?: string
  updated?: string

  quotation?: CotizacionResponse
  product?: ProductoResponse
  methodPayment?: FormaPagoResponse
  folder?: CarpetaResponse

  detail?: DetalleLiquidacionSimple[]
  observation?: ObservacionLiquidacionSimple[]
}
