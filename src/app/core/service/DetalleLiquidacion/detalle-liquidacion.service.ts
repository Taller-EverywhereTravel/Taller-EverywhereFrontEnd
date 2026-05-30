import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DetalleLiquidacionRequest, DetalleLiquidacionResponse, DetalleLiquidacionSinLiquidacion } from '../../../shared/models/Liquidacion/detalleLiquidacion.model';
import { environment} from '../../../../environments/environment';
import { CacheService } from '../cache.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleLiquidacionService {
  private apiUrl = `${environment.baseURL}/detail-liquidation`;
  private cacheService = inject(CacheService);

  constructor(private http: HttpClient) {}

  getAllDetallesLiquidacion(): Observable<DetalleLiquidacionResponse[]> {
    return this.http.get<DetalleLiquidacionResponse[]>(this.apiUrl);
  }

  getDetalleLiquidacionById(id: number): Observable<DetalleLiquidacionResponse> {
    return this.http.get<DetalleLiquidacionResponse>(`${this.apiUrl}/${id}`);
  }

  getDetallesByLiquidacionId(liquidacionId: number): Observable<DetalleLiquidacionSinLiquidacion[]> {
    return this.http.get<DetalleLiquidacionSinLiquidacion[]>(`${this.apiUrl}/liquidation/${liquidacionId}`);
  }

  createDetalleLiquidacion(liquidacionId: number, detalleLiquidacionRequest: DetalleLiquidacionRequest): Observable<DetalleLiquidacionResponse> {
    const requestWithLiquidacionId = {
      ...detalleLiquidacionRequest,
      liquidacionId: liquidacionId
    };
    return this.http.post<DetalleLiquidacionResponse>(this.apiUrl, requestWithLiquidacionId).pipe(
      tap(() => {
        this.cacheService.invalidatePattern(`/liquidation/${liquidacionId}/with-detail`);
      })
    );
  }

  updateDetalleLiquidacion(id: number, detalleLiquidacionRequest: DetalleLiquidacionRequest): Observable<DetalleLiquidacionResponse> {
    return this.http.patch<DetalleLiquidacionResponse>(`${this.apiUrl}/${id}`, detalleLiquidacionRequest).pipe(
      tap((response) => {
        if (response.liquidation?.id) {
          this.cacheService.invalidatePattern(`/liquidation/${response.liquidation.id}/with-detail`);
        }
      })
    );
  }

  deleteDetalleLiquidacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.cacheService.invalidatePattern(/\/liquidation\/\d+\/with-detail/);
      })
    );
  }

}
