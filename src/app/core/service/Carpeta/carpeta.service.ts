import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarpetaRequest, CarpetaResponse } from '../../../shared/models/Carpeta/carpeta.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {
  private apiUrl = `${environment.baseURL}/folder`;

  constructor(private http: HttpClient) {
  }

  createCarpeta(carpetaRequest: CarpetaRequest, carpetaPadreId?: number): Observable<CarpetaResponse> {
    let params = new HttpParams();
    if (carpetaPadreId) {
      params = params.set('carpetaPadreId', carpetaPadreId.toString());
    }
    return this.http.post<CarpetaResponse>(this.apiUrl, carpetaRequest, {params});
  }

  getByIdCarpeta(id: number): Observable<CarpetaResponse> {
    return this.http.get<CarpetaResponse>(`${this.apiUrl}/${id}`);
  }

  getAllCarpetas(): Observable<CarpetaResponse[]> {
    return this.http.get<CarpetaResponse[]>(this.apiUrl);
  }

  updateCarpeta(id: number, carpetaRequest: CarpetaRequest): Observable<CarpetaResponse> {
    return this.http.put<CarpetaResponse>(`${this.apiUrl}/${id}`, carpetaRequest);
  }

  deleteByIdCarpeta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  findByNivelCarpeta(nivel: number): Observable<CarpetaResponse[]> {
    return this.http.get<CarpetaResponse[]>(`${this.apiUrl}/level/${nivel}`);
  }

  findByNombreCarpeta(nombre: string): Observable<CarpetaResponse[]> {
    return this.http.get<CarpetaResponse[]>(`${this.apiUrl}/search`);
  }

  finByMesCarpeta(mes: number): Observable<CarpetaResponse[]> {
    return this.http.get<CarpetaResponse[]>(`${this.apiUrl}/date/${mes}`);
  }

  finfByFechaCreacionBetweenCarpeta(fechaInicio: string, fechaFin: string): Observable<CarpetaResponse[]> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
    return this.http.get<CarpetaResponse[]>(`${this.apiUrl}/date/between`, { params });
  }

  findRecentCarpetas(): Observable<CarpetaResponse[]> {
    return this.http.get<CarpetaResponse[]>(`${this.apiUrl}/recent`);
  }

  findRaicesCarpeta(): Observable<CarpetaResponse[]> {
    return this.http.get<CarpetaResponse[]>(`${this.apiUrl}/roots`);
  }

  findCaminoCarpeta(id: number): Observable<CarpetaResponse[]> {
    return this.http.get<CarpetaResponse[]>(`${this.apiUrl}/${id}/way`);
  }

  findHijosCarpeta(id: number): Observable<CarpetaResponse[]> {
    return this.http.get<CarpetaResponse[]>(`${this.apiUrl}/children/${id}`);
  }

}
