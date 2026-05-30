export interface CorreoPersonaRequest {
  mail: string
  type: string
}

export interface CorreoPersonaResponse {
  id: number
  mail: string
  type: string
  created: string
  updated: string
}
