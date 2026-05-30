export interface CounterRequest {
  name?: string
  code?: string
}

export interface CounterResponse {
  id: number
  name?: string
  status?: boolean
  code?: string
  dateCreated?: string
  dateUpdated?: string
}
