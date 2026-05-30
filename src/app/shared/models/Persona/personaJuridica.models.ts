import { PersonaRequest, PersonaResponse } from './persona.model'

export interface PersonaJuridicaRequest {
  ruc?: string
  nameCompany?: string
  person?: PersonaRequest
}

export interface PersonaJuridicaResponse {
  id: number
  ruc?: string
  nameCompany?: string
  created: string
  updated: string
  person: PersonaResponse
}
