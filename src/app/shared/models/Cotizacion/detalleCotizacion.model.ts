import { CotizacionResponse } from './cotizacion.model'
import { ProductoResponse } from '../Producto/producto.model';
import { ProveedorResponse } from '../Proveedor/proveedor.model';
import { CategoriaResponse } from '../Categoria/categoria.model';
import { OperadorResponse } from '../Operador/operador.model';


/**
 * DTO para crear o actualizar detalles de cotización
 * Todos los campos son opcionales para flexibilidad con PATCH
 */
export interface DetalleCotizacionRequest {
  quantity?: number;          // ✅ Opcional para flexibilidad
  unit?: number;           // ✅ Opcional
  description?: string;      // ✅ Opcional
  category?: number;        // ✅ Cambio: categoriaId → categoria (número/ID)
  comission?: number;         // ✅ Opcional
  priceHistory?: number;  // ✅ Opcional
  selected?: boolean;    // ✅ Campo para marcar si está seleccionado
  categoryId?: number;      // Para compatibilidad con backend DTO
  productId?: number;       // ✅ ID de producto (enviado en el payload)
  supplierId?: number;      // ✅ ID de proveedor (enviado en el payload)
  operatorId?: number;       // ✅ ID de operador (enviado en el payload)
}

/**
 * Tipo para PATCH: permite enviar solo los campos que se van a actualizar
 */
export type DetalleCotizacionPatchRequest = Partial<DetalleCotizacionRequest>

export interface DetalleCotizacionResponse {
  id: number
  quantity?: number
  unit?: number
  description?: string
  created?: string
  updated?: string
  quotation?: CotizacionResponse
  product?: ProductoResponse
  supplier?: ProveedorResponse
  operator?: OperadorResponse
  category?: CategoriaResponse        // ✅ Cambio: categoriaId → categoria (objeto)
  comission?: number
  priceHistory?: number
  selected?: boolean
}

export interface DetalleCotizacionSimpleDTO{
  id: number;
  quantity?: number;
  unit?: number;
  description?: string;
  priceHistory?: number;
  created?: string | Date;
  updated?: string | Date;
  comission?: number;

  category?: CategoriaResponse;
  product?: ProductoResponse;
  supplier?: ProveedorResponse;
  operator?: OperadorResponse;
}
