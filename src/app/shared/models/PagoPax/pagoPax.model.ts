import { LiquidacionResponse } from '../Liquidacion/liquidacion.model';
import { FormaPagoResponse } from '../FormaPago/formaPago.model';

export interface PagoPaxRequest {
  amount: number;
  currency?: string;
  detail?: string;
  liquidationId: number;
  methodPaymentId: number;
}

export interface PagoPaxResponse {
  id: number;
  amount: number;
  currency?: string;
  detail?: string;
  created: string;
  updated: string;
  liquidation?: LiquidacionResponse;
  methodPayment?: FormaPagoResponse;
}

export interface PagoPaxTemp {
  id?: number;
  monto: number;
  moneda: string;
  detalle?: string;
  formaPagoId?: number;
  formaPago?: FormaPagoResponse;
  creado?: string;
  actualizado?: string;
  isTemporary?: boolean;
}