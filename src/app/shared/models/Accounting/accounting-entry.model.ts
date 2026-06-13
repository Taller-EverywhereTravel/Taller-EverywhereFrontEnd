export interface AccountingEntryDetailRequest {
  accountName: string;
  description?: string;
  debitAmount: number;
  creditAmount: number;
}

export interface AccountingEntryDetailResponse {
  id: number;
  accountingEntryId: number;
  accountName: string;
  description: string;
  debitAmount: number;
  creditAmount: number;
}

export interface AccountingEntryRequest {
  entryNumber: string;
  entryDate: string;
  description: string;
  documentType?: string;
  documentNumber?: string;
  liquidationId?: number;
  details?: AccountingEntryDetailRequest[];
}

export interface AccountingEntryResponse {
  id: number;
  entryNumber: string;
  entryDate: string;
  description: string;
  totalDebit: number;
  totalCredit: number;
  status: string;
  sourceType: string;
  sourceId: number;
  documentType: string;
  documentNumber: string;
  liquidationId: number;
  createdAt: string;
  updatedAt: string;
  details?: AccountingEntryDetailResponse[];
}