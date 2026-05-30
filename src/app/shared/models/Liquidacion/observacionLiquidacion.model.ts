import { LiquidacionResponse } from './liquidacion.model'
export interface ObservacionLiquidacionRequest {
  description?: string
  value?: number
  document?: string
  numberDocument?: string
  liquidationId?: number
}

export interface ObservacionLiquidacionResponse {
  id: number
  description?: string
  value?: number
  document?: string
  numberDocument?: string
  created?: string
  updated?: string
  liquidation?: LiquidacionResponse
}

export interface ObservacionLiquidacionSimple {
  id: number
  description?: string
  value?: number
  document?: string
  numberDocument?: string
  created?: string
  updated?: string
}
