import { PersonaResponse } from "../Persona/persona.model";
import { PersonaNaturalSinViajero, PersonaNaturalSinViajeroResponse } from "../Persona/personaNatural.model";

export interface ViajeroRequest {
  dateBirth?: string;
  nationality?: string;
  residence?: string;
  personId: number;
}

export interface ViajeroResponse {
  id: number;
  dateBirth?: string;
  nationality?: string;
  residence?: string;
  created: string;
  updated: string;
}

export interface ViajeroConPersonaNatural {
  id: number;
  dateBirth?: string;
  nationality?: string;
  residence?: string;
  created?: string;
  updated?: string;
  personNatural?: PersonaNaturalSinViajero
}

export interface ViajeroConPersonaResponse {
  id: number;
  dateBirth?: string;
  nationality?: string;
  residence?: string;
  created: string;
  updated: string;
  personNatural: PersonaNaturalSinViajeroResponse;
}
