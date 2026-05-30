import { NaturalJuridicaRequest, NaturalJuridicaResponse, NaturalJuridicoPatch } from './../../../shared/models/NaturalJuridica/naturalJuridica.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NaturalJuridicoService {

  private baseURL = `${environment.baseURL}/natural-juridic`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<NaturalJuridicaResponse[]> {
    return this.http.get<NaturalJuridicaResponse[]>(this.baseURL);
  }

  findById(id: number): Observable<NaturalJuridicaResponse> {
    return this.http.get<NaturalJuridicaResponse>(`${this.baseURL}/${id}`);
  }

  findByPersonaNaturalId(personaNaturalId: number): Observable<NaturalJuridicaResponse[]> {
    return this.http.get<NaturalJuridicaResponse[]>(`${this.baseURL}/person-natural/${personaNaturalId}`);
  }

  findByPersonaJuridicaId(personaJuridicaId: number): Observable<NaturalJuridicaResponse[]> {
    return this.http.get<NaturalJuridicaResponse[]>(`${this.baseURL}/person-juridica/${personaJuridicaId}`);
  }

  create(request: NaturalJuridicaRequest): Observable<NaturalJuridicaResponse[]> {
    return this.http.post<NaturalJuridicaResponse[]>(this.baseURL, request);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

  deleteByPersonas(personaNaturalId: number, personaJuridicaId: number): Observable<void> {
    const url = `${this.baseURL}/person-natural/${personaNaturalId}/person-juridic/${personaJuridicaId}`;
    return this.http.delete<void>(url);
  }

  patchByPersonaNaturalId(personaNaturalId: number, patchData: NaturalJuridicoPatch): Observable<NaturalJuridicaResponse[]> {
    return this.http.patch<NaturalJuridicaResponse[]>(`${this.baseURL}/person-natural/${personaNaturalId}`, patchData);
  }
}
