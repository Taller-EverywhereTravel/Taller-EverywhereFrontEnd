export interface EstadoCotizacionResponse {
  id: number
  description?: string
  dateCreated:string
  dateUpdated: string
}

export interface EstadoCotizacionRequest {
  description?: string
}
