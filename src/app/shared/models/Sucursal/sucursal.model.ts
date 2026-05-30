export interface SucursalRequest {
  description: string;
  address: string;
  phone: string;
  mail: string;
  status: boolean;
}

export interface SucursalResponse {
  id: number;
  description: string;
  address: string;
  phone: string;
  mail: string;
  status: boolean;
  dateCreated: string;
  dateUpdated: string;
}
