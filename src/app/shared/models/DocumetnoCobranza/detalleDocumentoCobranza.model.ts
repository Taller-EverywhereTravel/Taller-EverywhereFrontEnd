// Modelo para respuesta de detalle de documento de cobranza (equivalente a DetalleDocumentoCobranzaResponseDTO)
export interface DetalleDocumentoCobranzaResponseDTO {
  id?: number;
  quantity?: number;
  description?: string;
  price?: number;
  dateCreation?: string; // ISO string format for LocalDateTime

  // IDs de relaciones para evitar lazy loading
  documentCollectionId?: number;
  documentCollectionNumber?: string;

  productId?: number;
  productDescription?: string;
}

// Modelo para request de detalle de documento de cobranza (equivalente a DetalleDocumentoCobranzaRequestDTO)
export interface DetalleDocumentoCobranzaRequestDTO {
  quantity?: number; // @Positive validation should be handled in the component
  description?: string;
  price?: number; // @Positive validation should be handled in the component
  documentCollectionId?: number;
  productId?: number;
}
