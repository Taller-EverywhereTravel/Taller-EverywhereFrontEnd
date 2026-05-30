// Modelo para el detalle del recibo (ResponseDTO)
export interface DetalleReciboResponseDTO {
  id?: number;
  amount?: number;
  description?: string;
  price?: number;
  productId?: number;
  productDescription?: string;
  receiptId?: number;
  receiptNumber?: string;
  dateCreated?: string;
  dateUpdated?: string;
}

// DTO para crear/actualizar detalle de recibo
export interface DetalleReciboRequestDTO {
  amount?: number;
  description?: string;
  price?: number;
  receiptId?: number;
  productId?: number;
}
