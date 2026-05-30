// Modelo para la respuesta de listado de recibos (ResponseDTO)
export interface ReciboResponseDTO {
  id?: number;
  serie?: string;
  correlative?: number;
  dateIssue?: string; // ISO string format
  observation?: string;
  dateExpiration?: string; // ISO string format
  fileVenta?: string;
  currency?: string;

  // Información de relaciones
  quotationId?: number;
  codeQuotation?: string;
  personId?: number;
  BranchId?: number;
  methodPaymentId?: number;
  detailDocumentId?: number;

  // Información básica para mostrar
  clientName?: string;
  clientDocument?: string;
  typeDocumentClient?: string;
  branchDescription?: string;
  methodPaymentDescription?: string;

  // Información de carpeta
  folderId?: number;
  folderName?: string;

  // Información de PersonaJuridica (si fue seleccionada)
  personJuridicId?: number;
  personJuridicRuc?: string;
  personJuridicNameCompany?: string;

  // Campos de auditoría
  createdAt?: string;
  updatedAt?: string;

  // Detalles
  detail?: any[];
}

// DTO para actualización de recibo
export interface ReciboUpdateDTO {
  dateIssue?: string; // ISO string format
  fileVenta?: string;
  observation?: string;
  dateExpiration?: string; // ISO string format
  detailDocumentId?: number;
  branchId?: number;
  personJuridicId?: number;
  methodPaymentId?: number;
}
