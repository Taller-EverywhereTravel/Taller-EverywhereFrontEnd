import { PersonaJuridicaResponse } from "../Persona/personaJuridica.models";
import { PersonaNaturalResponse } from "../Persona/personaNatural.model";

export interface NaturalJuridicaRequest {
  personNaturalId: number;
  personJuridicaId:  number[];
}

export interface NaturalJuridicaResponse {
  id: number;
  personNatural: PersonaNaturalResponse
  personJuridic: PersonaJuridicaResponse
  dateCreated: string;
  dateUpdated: string;
}

export interface NaturalJuridicoPatch {
  add?: number[];
  remove?: number[];
}
