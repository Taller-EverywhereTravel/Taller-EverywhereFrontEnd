import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  AccountingEntryRequest,
  AccountingEntryResponse
} from '../../../shared/models/Accounting/accounting-entry.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingEntryService {

  private baseURL = `${environment.baseURL}/accounting-entry`;
  private http = inject(HttpClient);

  findAll(): Observable<AccountingEntryResponse[]> {
    return this.http.get<AccountingEntryResponse[]>(this.baseURL);
  }

  findById(id: number): Observable<AccountingEntryResponse> {
    return this.http.get<AccountingEntryResponse>(`${this.baseURL}/${id}`);
  }

  create(request: AccountingEntryRequest): Observable<AccountingEntryResponse> {
    return this.http.post<AccountingEntryResponse>(this.baseURL, request);
  }

  update(id: number, request: AccountingEntryRequest): Observable<AccountingEntryResponse> {
    return this.http.put<AccountingEntryResponse>(`${this.baseURL}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

  generateFromLiquidation(liquidationId: number): Observable<AccountingEntryResponse> {
    return this.http.post<AccountingEntryResponse>(
      `${this.baseURL}/generate/${liquidationId}`,
      {}
    );
  }
}