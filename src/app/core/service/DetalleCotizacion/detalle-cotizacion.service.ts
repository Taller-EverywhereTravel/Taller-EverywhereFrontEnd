import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DetalleCotizacionResponse, DetalleCotizacionRequest, DetalleCotizacionPatchRequest } from '../../../shared/models/Cotizacion/detalleCotizacion.model'
import { environment } from '../../../../environments/environment';
import { CacheService } from '../cache.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleCotizacionService {
  private apiUrl = `${environment.baseURL}/detail-quotation`;
  private cacheService = inject(CacheService);

  constructor(private http: HttpClient) { }

  getAllDetallesCotizacion(): Observable<DetalleCotizacionResponse[]> {
    return this.http.get<DetalleCotizacionResponse[]>(this.apiUrl);
  }

  getByIdDetalleCotizacion(id: number): Observable<DetalleCotizacionResponse> {
    return this.http.get<DetalleCotizacionResponse>(`${this.apiUrl}/${id}`);
  }

  getByCotizacionId(cotizacionId: number): Observable<DetalleCotizacionResponse[]> {
    return this.http.get<DetalleCotizacionResponse[]>(`${this.apiUrl}/quotation/${cotizacionId}`);
  }

  createDetalleCotizacion(cotizacionId: number, detalleCotizacionRequest: DetalleCotizacionRequest): Observable<DetalleCotizacionResponse> {
    return this.http.post<DetalleCotizacionResponse>(`${this.apiUrl}/quotation/${cotizacionId}`, detalleCotizacionRequest).pipe(
      tap(() => {
        this.cacheService.invalidatePattern(`/quotation/${cotizacionId}/with-detail`);
      })
    );
  }

  updateDetalleCotizacion(id: number, patchPayload: DetalleCotizacionPatchRequest): Observable<DetalleCotizacionResponse> {
    return this.http.patch<DetalleCotizacionResponse>(`${this.apiUrl}/${id}`, patchPayload).pipe(
      tap((response) => {
        if (response.quotation?.id) {
          this.cacheService.invalidatePattern(`/quotation/${response.quotation.id}/with-detail`);
        }
      })
    );
  }

  deleteDetalleCotizacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.cacheService.invalidatePattern(/\/quotation\/\d+\/with-detail/);
      })
    );
  }

}
