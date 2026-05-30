import { CounterResponse } from '../Counter/counter.model'
import { FormaPagoResponse} from '../FormaPago/formaPago.model'
import { EstadoCotizacionResponse } from './estadoCotizacion.model'
import { SucursalResponse } from '../Sucursal/sucursal.model'
import { CarpetaResponse } from '../Carpeta/carpeta.model'
import { PersonaResponse } from '../Persona/persona.model'
import { DetalleCotizacionSimpleDTO } from '../Cotizacion/detalleCotizacion.model'

/**
 * DTO para crear o actualizar cotizaciones
 * Todos los campos son opcionales ya que usamos PATCH para actualizaciones
 */
export interface CotizacionRequest {
  nameQuotation?: string
  numAdult?: number
  numChild?: number
  dateExpiration?: string
  originDestination?: string
  dateDeparture?: string
  dateReturn?: string
  currency?: string
  observation?: string
  counterId?: number
  methodPaymentId?: number
  statusQuotationId?: number
  branchId?: number
  folder?: number
}

export type CotizacionPatchRequest = Partial<CotizacionRequest>

export interface CotizacionResponse {
  id: number
  nameQuotation?: string
  codeQuotation: string
  numAdult?: number
  numChild?: number
  dateIssue: string
  dateExpiration: string
  updated: string
  originDestination: string
  dateDeparture: string
  dateReturn: string
  currency: string
  observation?: string
  groupSelectedId?: number

  counter?: CounterResponse
  methodPayment?: FormaPagoResponse
  statusQuotation?: EstadoCotizacionResponse
  branch?: SucursalResponse
  folder?: CarpetaResponse
  person?: PersonaResponse
}

export interface CotizacionConDetallesResponseDTO {
  id: number
  nameQuotation?: string
  codeQuotation: string
  numAdult?: number
  numChild?: number
  dateIssue: string
  dateExpiration: string
  updated: string
  originDestination: string
  dateDeparture: string
  dateReturn: string
  currency: string
  observation?: string
  groupSelectedId?: number

  // Relaciones de la cotización
  counter?: CounterResponse
  methodPayment?: FormaPagoResponse
  statusQuotation?: EstadoCotizacionResponse
  branch?: SucursalResponse
  folder?: CarpetaResponse
  person?: PersonaResponse

  // Lista de detalles anidados (sin la cotización repetida)
  detail: DetalleCotizacionSimpleDTO[]
}
