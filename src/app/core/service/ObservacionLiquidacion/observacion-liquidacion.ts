import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ObservacionLiquidacionRequest,ObservacionLiquidacionResponse } from '../../../shared/models/Liquidacion/observacionLiquidacion.model';
import { CacheService } from '../cache.service';

@Injectable({
  providedIn: 'root'
})
export class ObservacionLiquidacionService {
  private apiUrl = `${environment.baseURL}/observation-liquidation`;
  private cacheService = inject(CacheService);

  constructor(private http: HttpClient) {}

  findAll(): Observable<ObservacionLiquidacionResponse[]> {
    return this.http.get<ObservacionLiquidacionResponse[]>(this.apiUrl);
  }

  findById(id: number): Observable<ObservacionLiquidacionResponse> {
    return this.http.get<ObservacionLiquidacionResponse>(`${this.apiUrl}/${id}`);
  }

  create(requestDTO: ObservacionLiquidacionRequest): Observable<ObservacionLiquidacionResponse> {
    return this.http.post<ObservacionLiquidacionResponse>(this.apiUrl, requestDTO).pipe(
      tap((response) => {
        if (response.liquidation?.id) {
          this.cacheService.invalidatePattern(`/liquidation/${response.liquidation.id}`);
        } else if (requestDTO.liquidationId) {
          this.cacheService.invalidatePattern(`/liquidation/${requestDTO.liquidationId}`);
        }
      })
    );
  }

  update(id: number, requestDTO: ObservacionLiquidacionRequest): Observable<ObservacionLiquidacionResponse> {
    return this.http.put<ObservacionLiquidacionResponse>(`${this.apiUrl}/${id}`, requestDTO).pipe(
      tap((response) => {
        if (response.liquidation?.id) {
          this.cacheService.invalidatePattern(`/liquidation/${response.liquidation.id}`);
        }
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.cacheService.invalidatePattern(/\/liquidation\/\d+/);
      })
    );
  }

  findByLiquidacionId(liquidacionId: number): Observable<ObservacionLiquidacionResponse[]> {
    return this.http.get<ObservacionLiquidacionResponse[]>(`${this.apiUrl}/liquidacion/${liquidacionId}`);
  }
}
