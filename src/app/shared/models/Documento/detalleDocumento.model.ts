import { PersonaNaturalResponse } from '../Persona/personaNatural.model';
import { ViajeroResponse } from '../Viajero/viajero.model';
import { DocumentoResponse } from './documento.model';

export interface DetalleDocumentoRequest {
  number: string
  dateIssue?: string
  dateExpiration?: string
  origin: string
  documentId: number
  personNaturalId: number
}

export interface DetalleDocumentoResponse {
  id: number
  number: string
  dateIssue?: string
  dateExpiration?: string
  origin: string
  created: string
  updated: string
  document: DocumentoResponse
  personNatural: PersonaNaturalResponse
}

export interface PersonaInfo {
  personId: number;
  nombreCompleto: string;
}

export interface DetalleDocumentoConPersonasDto {
  numberDocument: string;
  typeDocument: string;
  person: PersonaInfo[];
}
