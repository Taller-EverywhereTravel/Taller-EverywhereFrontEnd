export interface HistorialCotizacionRequest {
  observation?: string;
  userId?: number;
  quotationId?: number;
  statusQuotationId?: number;
}

export interface HistorialCotizacionResponse {
  id: number;
  uuid?: string;
  observation?: string;
  dateCreated?: string;

  userId?: number;
  userName?: string;
  userMail?: string;

  quotationId?: number;
  codeQuotation?: string;

  statusQuotationId?: number;
  statusQuotationDescription?: string;
}

export interface HistorialCotizacionSimple {
  id: number;
  uuid?: string;
  observation?: string;
  dateCreated?: string;

  userId?: number;
  userName?: string;
  userMail?: string;

  statusQuotationId?: number;
  statusQuotationDescription?: string;
}
