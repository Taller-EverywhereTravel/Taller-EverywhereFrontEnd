
export interface ProveedorRequest {
  name: string;
}

export interface ProveedorResponse {
  id: number;
  name: string;
  nameJuridic?: string;
  ruc?: number;
  created: string;
  updated: string;
}
