import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TelefonoPersonaRequest, TelefonoPersonaResponse } from '../../../shared/models/TelefonoPersona/telefonoPersona.models';

@Injectable({
  providedIn: 'root'
})
export class TelefonoPersonaService {
  private baseURL = `${environment.baseURL}/phone-person`;

  constructor(private http: HttpClient) { }

  findByPersonaId(personaId: number): Observable<TelefonoPersonaResponse[]> {
    return this.http.get<TelefonoPersonaResponse[]>(`${this.baseURL}/person/${personaId}`);
  }

  findById(personaId: number, telefonoId: number): Observable<TelefonoPersonaResponse> {
    return this.http.get<TelefonoPersonaResponse>(`${this.baseURL}/person/${personaId}/phone/${telefonoId}`);
  }

  create(personaId: number, telefonoData: TelefonoPersonaRequest): Observable<TelefonoPersonaResponse> {
    return this.http.post<TelefonoPersonaResponse>(`${this.baseURL}/person/${personaId}`, telefonoData);
  }

  update(personaId: number, telefonoId: number, telefonoData: TelefonoPersonaRequest): Observable<TelefonoPersonaResponse> {
    return this.http.patch<TelefonoPersonaResponse>(`${this.baseURL}/person/${personaId}/phone/${telefonoId}`, telefonoData);
  }

  delete(personaId: number,telefonoId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/person/${personaId}/phone/${telefonoId}`);
  }

  listarPorPersona(personaId: number): Observable<TelefonoPersonaResponse[]> {
    return this.findByPersonaId(personaId);
  }
}
