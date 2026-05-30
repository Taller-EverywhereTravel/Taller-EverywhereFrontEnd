import { TelefonoPersonaResponse } from '../TelefonoPersona/telefonoPersona.models';
import { CorreoPersonaResponse } from '../CorreoPersona/correoPersona.model';

export interface PersonaRequest {
  address?: string
  observation?: string
}

export interface PersonaResponse {
  id: number
  address?: string
  observation?: string
  created: string
  updated: string
  phone?: TelefonoPersonaResponse[]
  mail?: CorreoPersonaResponse[]
}

export interface personaDisplay {
  id: number;
  type: string;
  identifier: string;
  name: string;
}
