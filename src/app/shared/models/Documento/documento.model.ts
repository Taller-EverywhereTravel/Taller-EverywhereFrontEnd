export interface DocumentoRequest {
  type: string;
  description?: string;
  status: boolean;
}

export interface DocumentoResponse {
  id: number;
  type: string;
  description?: string;
  status: boolean;
  created: string;
  updated: string;
}
