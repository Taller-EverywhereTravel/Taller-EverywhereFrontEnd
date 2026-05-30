import { ViajeroResponse } from './viajero.model';

export interface ViajeroFrecuenteRequest {
  airline: string;
  code: string;
}

export interface ViajeroFrecuenteResponse {
  id: number;
  airline: string;
  code: string;
  traveler: ViajeroResponse;
  created: string;
  updated: string;
}
