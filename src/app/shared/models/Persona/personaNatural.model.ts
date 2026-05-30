import { CategoriaPersonaResponse } from '../CategoriaPersona/categoriaPersona.models'
import { ViajeroResponse } from '../Viajero/viajero.model'
import { PersonaRequest, PersonaResponse } from './persona.model'

export interface PersonaNaturalRequest {
  document?: string
  name?: string
  surnamePaternal?: string
  surnameMaternal?: string
  sex?: string
  travelerId?: number
  categoryPersonId?: number
  person?: PersonaRequest
}

export interface PersonaNaturalResponse {
  id: number
  document?: string
  name?: string
  surnamePaternal?: string
  surnameMaternal?: string
  sex?: string
  created: string
  updated: string
  person: PersonaResponse
  traveler?: ViajeroResponse
  categoryPerson?: CategoriaPersonaResponse
}

export interface PersonaNaturalViajero{
  travelerId?: number;
}

export interface PersonaNaturalCategoria{
  categoryId?: number;
}

export interface PersonaNaturalSinViajero {
  id: number
  document?: string
  name?: string
  surnamePaternal?: string
  surnameMaternal?: string
  sex?: string
  created: string
  updated: string
  person?: PersonaResponse
  categoryPerson?: CategoriaPersonaResponse
}

export interface PersonaNaturalSinViajeroResponse {
  id: number
  document?: string
  name?: string
  surnamePaternal?: string
  surnameMaternal?: string
  sex?: string
  created: string
  updated: string
  person: PersonaResponse
  categoryPerson?: CategoriaPersonaResponse
  // SIN campo viajero para evitar referencia circular
}
