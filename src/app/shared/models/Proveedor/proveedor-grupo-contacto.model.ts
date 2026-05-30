export interface ProveedorGrupoContactoRequest {
    name: string;
    description?: string;
}

export interface ProveedorGrupoContactoResponse {
    id: number;
    name: string;
    description?: string;
    created: string;
    updated: string;
}
