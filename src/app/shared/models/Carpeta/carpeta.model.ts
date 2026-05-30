export interface CarpetaRequest {
  name?: string
  description?: string
}

export interface CarpetaResponse {
  id: number
  name?: string
  description?: string
  created: string
  updated: string
  level: number
  folderFatherId?: number
}
