// Modelo para el detalle del documento de cobranza (básico)
export interface DetalleDocumentoCobranza {
  quantity: number;
  codeProduct: string;
  description: string;
  priceUnit: number;
  total?: number;
  nameProduct?: string;
}

// Modelo principal para el documento de cobranza (DTO)
export interface DocumentoCobranzaDTO {
  // Campos manuales
  fileVenta?: string;
  costShipping?: number;

  // Campos de cotización
  codeQuotation?: string;   // Número de cotización
  dateIssue?: string; // ISO string format for LocalDateTime
  clientName?: string;      // Nombre completo del cliente
  clientPhone?: string;
  clientDocument?: string;   // DNI o RUC del cliente
  clientAddress?: string;   // Dirección del cliente
  branchDescription?: string;
  pointPurchase?: string;
  currency?: string;
  methodPayment?: string;
  observations?: string;

  // Totales
  subtotal?: number;
  total?: number;
  importeEnLetras?: string;

  // Detalles
  detail?: DetalleDocumentoCobranza[];
}

// Modelo para la respuesta de listado de documentos (ResponseDTO)
export interface DocumentoCobranzaResponseDTO {
  id?: number;
  serie?: string;
  correlative?: number;
  dateIssue?: string; // ISO string format for LocalDateTime
  observation?: string;
  fileVenta?: string;
  costShipping?: number;
  currency?: string;

  // Información de relaciones
  quotationId?: number;
  codeQuotation?: string;  // Número de cotización
  personId?: number;
  branchId?: number;
  methodPaymentId?: number;

  // Información básica para mostrar
  clientName?: string;     // Nombre de la persona
  clientDocument?: string;  // DNI o RUC de la persona
  typeDocumentClient?: string; // Tipo de documento (DNI, RUC, etc.)
  branchDescription?: string;
  methodPaymentDescription?: string;

  // Información de carpeta
  folderId?: number;
  folderName?: string;

  // Información de PersonaJuridica (si fue seleccionada)
  personJuridicId?: number;
  personJuridicRuc?: string;
  personJuridicNameCompany?: string;

  // Información de DetalleDocumento (si fue seleccionado un documento personal)
  detailDocumentId?: number;

  // Campos de auditoría
  createdAt?: string; // ISO string format for LocalDateTime
  updatedAt?: string; // ISO string format for LocalDateTime
}

// DTO para actualización de documento de cobranza (equivalente a DocumentoCobranzaUpdateDTO)
export interface DocumentoCobranzaUpdateDTO {
  dateIssue?: string; // ISO string format for LocalDateTime
  fileVenta?: string;
  costShipping?: number;
  observation?: string;
  detailDocumentId?: number;
  branchId?: number;
  personJuridicId?: number;
  methodPaymentId?: number;
}
