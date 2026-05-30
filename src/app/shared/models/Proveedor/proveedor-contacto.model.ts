export interface ProveedorContactoRequest {
    description?: string;
    mail?: string;
    number?: string;
    codeCountry?: string;
    supplierId?: number;
    groupContactId?: number;
}

export interface ProveedorContactoResponse {
    id: number;
    description?: string;
    mail?: string;
    number?: string;
    codeCountry?: string;
    created: string;
    updated: string;
    supplierId?: number;
    supplierName?: string;
    groupContactId?: number;
    groupContactName?: string;
}
