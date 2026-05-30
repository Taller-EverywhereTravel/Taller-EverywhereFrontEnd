export interface ProductoRequest {
  description: string;
  type: string;
}

export interface ProductoResponse {
  id: number;
  code: string;
  description: string;
  type: string;
  created: string;
  updated: string;
}
