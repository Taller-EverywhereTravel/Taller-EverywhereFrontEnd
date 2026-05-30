export interface FormaPagoResponse {
  id: number
  code?: number
  description?: string
  dateCreated?: string
  dateUpdated?: string
}

export interface FormaPagoRequest {
  code?: number
  description?: string
}
