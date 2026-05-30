import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PersonaNaturalRequest, PersonaNaturalResponse } from '../../../shared/models/Persona/personaNatural.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaNaturalService {
  private baseURL = `${environment.baseURL}/person-natural`;
  private http = inject(HttpClient);

  constructor() { }

  findAll(): Observable<PersonaNaturalResponse[]> {
    return this.http.get<PersonaNaturalResponse[]>(this.baseURL);
  }

  findById(id: number): Observable<PersonaNaturalResponse> {
    return this.http.get<PersonaNaturalResponse>(`${this.baseURL}/${id}`);
  }

  findByDocumento(documento: string): Observable<PersonaNaturalResponse[]> {
    const params = new HttpParams().set('documento', documento);
    return this.http.get<PersonaNaturalResponse[]>(`${this.baseURL}/document`, { params });
  }

  findByNombres(nombres: string): Observable<PersonaNaturalResponse[]> {
    const params = new HttpParams().set('nombres', nombres);
    return this.http.get<PersonaNaturalResponse[]>(`${this.baseURL}/name`, { params });
  }

  findByApellidosPaternos(apellidos: string): Observable<PersonaNaturalResponse[]> {
    const params = new HttpParams().set('apellidos', apellidos);
    return this.http.get<PersonaNaturalResponse[]>(`${this.baseURL}/surname-paternal`, { params });
  }

  findByApellidosMaternos(apellidos: string): Observable<PersonaNaturalResponse[]> {
    const params = new HttpParams().set('apellidos', apellidos);
    return this.http.get<PersonaNaturalResponse[]>(`${this.baseURL}/surname-maternal`, { params });
  }

  save(personaNaturalRequest: PersonaNaturalRequest): Observable<PersonaNaturalResponse> {
    return this.http.post<PersonaNaturalResponse>(this.baseURL, personaNaturalRequest);
  }

  update(id: number, personaNaturalRequest: PersonaNaturalRequest): Observable<PersonaNaturalResponse> {
    return this.http.patch<PersonaNaturalResponse>(`${this.baseURL}/${id}`, personaNaturalRequest);
  }

  asociarViajero(id: number, viajeroId: number): Observable<PersonaNaturalResponse> {
    return this.http.patch<PersonaNaturalResponse>(`${this.baseURL}/${id}/associate-traveler`, { viajeroId });
  }

  desasociarViajero(id: number): Observable<PersonaNaturalResponse> {
    return this.http.patch<PersonaNaturalResponse>(`${this.baseURL}/${id}/dissociate-traveler`, null);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

  findByApellidos(apellidos: string): Observable<PersonaNaturalResponse[]> {
    return this.findByApellidosPaternos(apellidos);
  }
}
