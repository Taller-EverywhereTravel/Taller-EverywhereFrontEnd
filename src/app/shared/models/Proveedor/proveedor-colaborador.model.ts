export interface ProveedorColaboradorRequest {
    position?: string;
    name: string;
    mail?: string;
    phone?: string;
    codeCountry?: string;
    detail?: string;
    supplierId?: number;
}

export interface ProveedorColaboradorResponse {
    id: number;
    position?: string;
    name: string;
    mail?: string;
    phone?: string;
    codeCountry?: string;
    detail?: string;
    created: string;
    updated: string;
    supplierId?: number;
    supplierName?: string;
}
