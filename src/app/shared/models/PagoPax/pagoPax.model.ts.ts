import { LiquidacionResponse } from "../Liquidacion/liquidacion.model";
import { FormaPagoResponse } from "../FormaPago/formaPago.model";

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
