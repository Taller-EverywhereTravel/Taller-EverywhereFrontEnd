export interface TelefonoPersonaRequest {
   number: string
   codeCountry: string
   type: string
   description?: string
}

export interface TelefonoPersonaResponse {
   id: number
   number: string
   codeCountry: string
   type: string
   description?: string
   created: string
   updated: string
}
