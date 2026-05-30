export interface CategoriaPersonaRequest {
    name: string;
    description?: string;
}

export interface CategoriaPersonaResponse {
    id: number;
    name: string;
    description?: string;
    created: string;
    updated: string;
}
