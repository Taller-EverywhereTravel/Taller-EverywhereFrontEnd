import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const DEFAULT_DELAY_MS = 150;

export const mockHttpInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.useMocks) {
    return next(req);
  }

  const body = buildMockBody(req);
  const response = new HttpResponse({ status: 200, body });

  return of(response).pipe(delay(DEFAULT_DELAY_MS));
};

function buildMockBody(req: HttpRequest<unknown>): unknown {
  const url = req.url;

  if (isBlobResponse(req)) {
    return new Blob([`Mock file for ${url}`], { type: 'application/octet-stream' });
  }

  if (url.includes('/auth/login')) {
    return {
      id: 1,
      token: 'mock-token',
      name: 'Demo User',
      role: 'ADMIN',
      permissions: {
        ALL_MODULES: true
      }
    };
  }

  if (url.includes('/exchange/tipo-de-cambio')) {
    return {
      buy: '3.70',
      sell: '3.75'
    };
  }

  if (url.includes('/cotizaciones/') && url.includes('/con-detalles')) {
    return buildCotizacionConDetalles(extractId(url) ?? 1);
  }

  if (url.includes('/historial-cotizaciones')) {
    return buildHistorialCotizacionRead(url);
  }

  if (url.includes('/liquidaciones/') && url.includes('/con-detalles')) {
    return buildLiquidacionConDetalles(extractId(url) ?? 1);
  }

  switch (req.method) {
    case 'DELETE':
      return null;
    case 'POST':
    case 'PUT':
    case 'PATCH':
      return buildWriteMock(req);
    case 'GET':
      return buildReadMock(req);
    default:
      return null;
  }
}

function isBlobResponse(req: HttpRequest<unknown>): boolean {
  return req.responseType === 'blob';
}

function buildWriteMock(req: HttpRequest<unknown>): unknown {
  const base = buildWriteBase(req.url, extractId(req.url) ?? 1);
  if (req.body && typeof req.body === 'object') {
    return { ...base, ...req.body };
  }

  return base;
}

function buildReadMock(req: HttpRequest<unknown>): unknown {
  const url = req.url;

  if (url.includes('/documentos-cobranza')) {
    return buildDocumentoCobranzaRead(url);
  }

  if (url.includes('/recibos')) {
    return buildReciboRead(url);
  }

  if (url.includes('/detalles-cotizacion')) {
    return buildDetalleCotizacionRead(url);
  }

  if (url.includes('/detalles-liquidacion')) {
    return buildDetalleLiquidacionRead(url);
  }

  if (url.includes('/detalle-documento-cobranza')) {
    return buildDetalleDocumentoCobranzaRead(url);
  }

  if (url.includes('/detalle-recibo')) {
    return buildDetalleReciboRead(url);
  }

  if (url.includes('/detalle-documento')) {
    return buildDetalleDocumentoRead(url);
  }

  if (url.includes('/telefonos-persona')) {
    return buildTelefonoPersonaRead(url);
  }

  if (url.includes('/correos-persona')) {
    return buildCorreoPersonaRead(url);
  }

  if (url.includes('/categorias-personas')) {
    return buildCategoriaPersonaRead(url);
  }

  if (url.includes('/natural-juridico')) {
    return buildNaturalJuridicoRead(url);
  }

  if (url.includes('/viajeros-frecuentes')) {
    return buildViajeroFrecuenteRead(url);
  }

  if (url.includes('/viajeros')) {
    return buildViajeroRead(url);
  }

  if (url.includes('/pagos-pax')) {
    return buildPagoPaxRead(url);
  }

  if (url.includes('/observaciones-liquidacion')) {
    return buildObservacionLiquidacionRead(url);
  }

  if (url.includes('/proveedor-colaborador')) {
    return buildProveedorColaboradorRead(url);
  }

  if (url.includes('/proveedor-contacto')) {
    return buildProveedorContactoRead(url);
  }

  if (url.includes('/proveedor-grupo-contacto')) {
    return buildProveedorGrupoContactoRead(url);
  }

  if (url.includes('/personas') && url.includes('/NaturalOrJuridica')) {
    return buildPersonaDisplay(extractId(url) ?? 1);
  }

  if (url.includes('/personas-naturales')) {
    return buildPersonaNaturalRead(url);
  }

  if (url.includes('/personas-juridicas')) {
    return buildPersonaJuridicaRead(url);
  }

  if (url.includes('/personas')) {
    return buildPersonaRead(url);
  }

  if (url.includes('/cotizaciones')) {
    return buildCotizacionRead(url);
  }

  if (url.includes('/liquidaciones')) {
    return buildLiquidacionRead(url);
  }

  if (url.includes('/estados-cotizacion')) {
    return buildEstadoCotizacionRead(url);
  }

  if (url.includes('/formas-pago')) {
    return buildFormaPagoRead(url);
  }

  if (url.includes('/sucursales')) {
    return buildSucursalRead(url);
  }

  if (url.includes('/categorias')) {
    return buildCategoriaRead(url);
  }

  if (url.includes('/counters')) {
    return buildCounterRead(url);
  }

  if (url.includes('/productos') || url.includes('/producto')) {
    return buildProductoRead(url);
  }

  if (url.includes('/proveedores')) {
    return buildProveedorRead(url);
  }

  if (url.includes('/operadores')) {
    return buildOperadorRead(url);
  }

  if (url.includes('/carpeta')) {
    return buildCarpetaRead(url);
  }

  if (url.includes('/documentos')) {
    return buildDocumentoRead(url);
  }

  if (url.includes('/historial-cotizaciones')) {
    return buildHistorialCotizacionRead(url);
  }

  if (looksLikeList(url)) {
    return buildListMock(url);
  }

  return buildItemMock(url);
}

function looksLikeList(url: string): boolean {
  const listHints = ['carpeta/', '/sin-', '/search', '/activos', '/inactivos', '/hijos/', '/raices', '/recientes'];

  if (listHints.some((hint) => url.includes(hint))) {
    return true;
  }

  return !extractId(url);
}

function extractId(url: string): number | null {
  const match = url.match(/\/(\d+)(\/|$)/);
  if (!match) {
    return null;
  }

  return Number(match[1]);
}

function buildItemMock(url: string): Record<string, unknown> {
  const id = extractId(url) ?? 1;
  const resource = getResourceName(url);

  return {
    id,
    name: `Mock ${resource} ${id}`,
    code: `MOCK-${id}`,
    status: 'ACTIVO',
    createdAt: new Date().toISOString()
  };
}

function buildListMock(url: string): Array<Record<string, unknown>> {
  const resource = getResourceName(url);

  return [1, 2, 3].map((id) => ({
    id,
    name: `Mock ${resource} ${id}`,
    code: `MOCK-${id}`,
    status: 'ACTIVO',
    createdAt: new Date().toISOString()
  }));
}

function getResourceName(url: string): string {
  const cleanUrl = url.split('?')[0];
  const parts = cleanUrl.split('/').filter(Boolean);

  if (parts.length === 0) {
    return 'item';
  }

  const last = parts[parts.length - 1];
  const secondLast = parts.length > 1 ? parts[parts.length - 2] : 'item';

  return isNumeric(last) ? secondLast : last;
}

function isNumeric(value: string): boolean {
  return !Number.isNaN(Number(value));
}

function buildWriteBase(url: string, id: number): Record<string, unknown> {
  if (url.includes('/documentos-cobranza')) {
    return buildDocumentoCobranzaDto(id);
  }

  if (url.includes('/recibos')) {
    return buildRecibo(id);
  }

  if (url.includes('/cotizaciones')) {
    return buildCotizacion(id);
  }

  if (url.includes('/liquidaciones')) {
    return buildLiquidacion(id);
  }

  if (url.includes('/detalles-cotizacion')) {
    return buildDetalleCotizacion(id);
  }

  if (url.includes('/detalles-liquidacion')) {
    return buildDetalleLiquidacion(id);
  }

  if (url.includes('/detalle-documento-cobranza')) {
    return buildDetalleDocumentoCobranza(id);
  }

  if (url.includes('/detalle-recibo')) {
    return buildDetalleRecibo(id);
  }

  if (url.includes('/telefonos-persona')) {
    return buildTelefonoPersona(id);
  }

  if (url.includes('/correos-persona')) {
    return buildCorreoPersona(id);
  }

  if (url.includes('/categorias-personas')) {
    return buildCategoriaPersona(id);
  }

  if (url.includes('/natural-juridico')) {
    return buildNaturalJuridica(id);
  }

  if (url.includes('/viajeros-frecuentes')) {
    return buildViajeroFrecuente(id);
  }

  if (url.includes('/viajeros')) {
    return buildViajero(id);
  }

  if (url.includes('/pagos-pax')) {
    return buildPagoPax(id);
  }

  if (url.includes('/observaciones-liquidacion')) {
    return buildObservacionLiquidacion(id);
  }

  if (url.includes('/proveedor-colaborador')) {
    return buildProveedorColaborador(id);
  }

  if (url.includes('/proveedor-contacto')) {
    return buildProveedorContacto(id);
  }

  if (url.includes('/proveedor-grupo-contacto')) {
    return buildProveedorGrupoContacto(id);
  }

  if (url.includes('/proveedor-colaborador')) {
    return buildProveedorColaborador(id);
  }

  if (url.includes('/proveedor-contacto')) {
    return buildProveedorContacto(id);
  }

  if (url.includes('/proveedor-grupo-contacto')) {
    return buildProveedorGrupoContacto(id);
  }

  if (url.includes('/detalle-documento')) {
    return buildDetalleDocumento(id);
  }

  if (url.includes('/personas-naturales')) {
    return buildPersonaNatural(id);
  }

  if (url.includes('/personas-juridicas')) {
    return buildPersonaJuridica(id);
  }

  if (url.includes('/personas')) {
    return buildPersona(id);
  }

  if (url.includes('/estados-cotizacion')) {
    return buildEstadoCotizacion(id);
  }

  if (url.includes('/formas-pago')) {
    return buildFormaPago(id);
  }

  if (url.includes('/sucursales')) {
    return buildSucursal(id);
  }

  if (url.includes('/categorias')) {
    return buildCategoria(id);
  }

  if (url.includes('/counters')) {
    return buildCounter(id);
  }

  if (url.includes('/productos') || url.includes('/producto')) {
    return buildProducto(id);
  }

  if (url.includes('/proveedores')) {
    return buildProveedor(id);
  }

  if (url.includes('/operadores')) {
    return buildOperador(id);
  }

  if (url.includes('/carpeta')) {
    return buildCarpeta(id);
  }

  if (url.includes('/documentos')) {
    return buildDocumento(id);
  }

  if (url.includes('/historial-cotizaciones')) {
    return buildHistorialCotizacion(id);
  }

  return buildItemMock(url);
}

function buildDocumentoCobranzaRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildDocumentoCobranzaResponse(id));
  }

  return buildDocumentoCobranzaResponse(extractId(url) ?? 1);
}

function buildReciboRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildRecibo(id));
  }

  return buildRecibo(extractId(url) ?? 1);
}

function buildDetalleCotizacionRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildDetalleCotizacion(id));
  }

  return buildDetalleCotizacion(extractId(url) ?? 1);
}

function buildDetalleLiquidacionRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildDetalleLiquidacion(id));
  }

  return buildDetalleLiquidacion(extractId(url) ?? 1);
}

function buildDetalleDocumentoCobranzaRead(url: string): unknown {
  if (url.includes('/documento-cobranza/') || looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildDetalleDocumentoCobranza(id));
  }

  return buildDetalleDocumentoCobranza(extractId(url) ?? 1);
}

function buildDetalleReciboRead(url: string): unknown {
  if (url.includes('/recibo/') || looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildDetalleRecibo(id));
  }

  return buildDetalleRecibo(extractId(url) ?? 1);
}

function buildDetalleDocumentoRead(url: string): unknown {
  if (url.includes('/buscar-por-numero')) {
    return [1, 2].map((id) => ({
      numeroDocumento: `DOC-${id}`,
      tipoDocumento: 'DNI',
      personas: [
        {
          personaId: id,
          nombreCompleto: `Persona ${id}`
        }
      ]
    }));
  }

  if (url.includes('/persona-natural/') || url.includes('/persona/') || looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildDetalleDocumento(id));
  }

  return buildDetalleDocumento(extractId(url) ?? 1);
}

function buildTelefonoPersonaRead(url: string): unknown {
  if (url.includes('/personas/') || looksLikeList(url)) {
    return [1, 2].map((id) => buildTelefonoPersona(id));
  }

  return buildTelefonoPersona(extractId(url) ?? 1);
}

function buildCorreoPersonaRead(url: string): unknown {
  if (url.includes('/personas/') || looksLikeList(url)) {
    return [1, 2].map((id) => buildCorreoPersona(id));
  }

  return buildCorreoPersona(extractId(url) ?? 1);
}

function buildCategoriaPersonaRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildCategoriaPersona(id));
  }

  return buildCategoriaPersona(extractId(url) ?? 1);
}

function buildNaturalJuridicoRead(url: string): unknown {
  if (url.includes('/persona-juridica/') || url.includes('/persona-natural/') || looksLikeList(url)) {
    return [1, 2].map((id) => buildNaturalJuridica(id));
  }

  return buildNaturalJuridica(extractId(url) ?? 1);
}

function buildViajeroFrecuenteRead(url: string): unknown {
  if (url.includes('/viajero/') || url.includes('/search/') || looksLikeList(url)) {
    return [1, 2].map((id) => buildViajeroFrecuente(id));
  }

  return buildViajeroFrecuente(extractId(url) ?? 1);
}

function buildViajeroRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2].map((id) => buildViajero(id));
  }

  return buildViajero(extractId(url) ?? 1);
}

function buildPagoPaxRead(url: string): unknown {
  if (url.includes('/liquidacion/') || looksLikeList(url)) {
    return [1, 2].map((id) => buildPagoPax(id));
  }

  return buildPagoPax(extractId(url) ?? 1);
}

function buildObservacionLiquidacionRead(url: string): unknown {
  if (url.includes('/liquidacion/') || looksLikeList(url)) {
    return [1, 2].map((id) => buildObservacionLiquidacion(id));
  }

  return buildObservacionLiquidacion(extractId(url) ?? 1);
}

function buildProveedorColaboradorRead(url: string): unknown {
  if (url.includes('/proveedor/') || looksLikeList(url)) {
    return [1, 2].map((id) => buildProveedorColaborador(id));
  }

  return buildProveedorColaborador(extractId(url) ?? 1);
}

function buildProveedorContactoRead(url: string): unknown {
  if (url.includes('/proveedor/') || url.includes('/grupo/') || looksLikeList(url)) {
    return [1, 2].map((id) => buildProveedorContacto(id));
  }

  return buildProveedorContacto(extractId(url) ?? 1);
}

function buildProveedorGrupoContactoRead(url: string): unknown {
  if (url.includes('/search') || looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildProveedorGrupoContacto(id));
  }

  return buildProveedorGrupoContacto(extractId(url) ?? 1);
}

function buildPersonaRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildPersona(id));
  }

  return buildPersona(extractId(url) ?? 1);
}

function buildPersonaNaturalRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildPersonaNatural(id));
  }

  return buildPersonaNatural(extractId(url) ?? 1);
}

function buildPersonaJuridicaRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildPersonaJuridica(id));
  }

  return buildPersonaJuridica(extractId(url) ?? 1);
}

function buildCotizacionRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildCotizacion(id));
  }

  return buildCotizacion(extractId(url) ?? 1);
}

function buildLiquidacionRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildLiquidacion(id));
  }

  return buildLiquidacion(extractId(url) ?? 1);
}

function buildEstadoCotizacionRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildEstadoCotizacion(id));
  }

  return buildEstadoCotizacion(extractId(url) ?? 1);
}

function buildFormaPagoRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildFormaPago(id));
  }

  return buildFormaPago(extractId(url) ?? 1);
}

function buildSucursalRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildSucursal(id));
  }

  return buildSucursal(extractId(url) ?? 1);
}

function buildCategoriaRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildCategoria(id));
  }

  return buildCategoria(extractId(url) ?? 1);
}

function buildCounterRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildCounter(id));
  }

  return buildCounter(extractId(url) ?? 1);
}

function buildProductoRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildProducto(id));
  }

  return buildProducto(extractId(url) ?? 1);
}

function buildProveedorRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildProveedor(id));
  }

  return buildProveedor(extractId(url) ?? 1);
}

function buildOperadorRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildOperador(id));
  }

  return buildOperador(extractId(url) ?? 1);
}

function buildCarpetaRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildCarpeta(id));
  }

  return buildCarpeta(extractId(url) ?? 1);
}

function buildDocumentoRead(url: string): unknown {
  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildDocumento(id));
  }

  return buildDocumento(extractId(url) ?? 1);
}

function buildHistorialCotizacionRead(url: string): unknown {
  if (url.includes('/cotizacion/')) {
    return [1, 2, 3].map((id) => buildHistorialCotizacionSimple(id));
  }

  if (looksLikeList(url)) {
    return [1, 2, 3].map((id) => buildHistorialCotizacion(id));
  }

  return buildHistorialCotizacion(extractId(url) ?? 1);
}

function buildPersonaDisplay(id: number): Record<string, unknown> {
  return {
    id,
    tipo: 'NATURAL',
    identificador: `DNI-${id}`,
    nombre: `Persona ${id}`
  };
}

function buildPersona(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    direccion: `Direccion ${id}`,
    observacion: `Observacion ${id}`,
    creado: now,
    actualizado: now,
    telefonos: [
      {
        id: id * 10,
        numero: `900000${id}`,
        codigoPais: '+51',
        tipo: 'MOVIL',
        descripcion: 'Principal',
        creado: now,
        actualizado: now
      }
    ],
    correos: [
      {
        id: id * 20,
        email: `persona${id}@demo.com`,
        tipo: 'PERSONAL',
        creado: now,
        actualizado: now
      }
    ]
  };
}

function buildPersonaNatural(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    documento: `DNI${id}000`,
    nombres: `Nombre ${id}`,
    apellidosPaterno: `Paterno ${id}`,
    apellidosMaterno: `Materno ${id}`,
    sexo: 'M',
    creado: now,
    actualizado: now,
    persona: buildPersona(id),
    viajero: buildViajero(id),
    categoriaPersona: buildCategoriaPersona(id)
  };
}

function buildPersonaJuridica(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    ruc: `20${id}0000000`,
    razonSocial: `Empresa ${id}`,
    creado: now,
    actualizado: now,
    persona: buildPersona(id)
  };
}

function buildViajero(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    fechaNacimiento: '1990-01-01',
    nacionalidad: 'PE',
    residencia: 'LIMA',
    creado: now,
    actualizado: now,
    personaNatural: {
      id,
      documento: `DNI${id}000`,
      nombres: `Nombre ${id}`,
      apellidosPaterno: `Paterno ${id}`,
      apellidosMaterno: `Materno ${id}`,
      sexo: 'M',
      creado: now,
      actualizado: now
    }
  };
}

function buildTelefonoPersona(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    numero: `900000${id}`,
    codigoPais: '+51',
    tipo: 'PRINCIPAL',
    descripcion: 'Principal',
    creado: now,
    actualizado: now
  };
}

function buildCorreoPersona(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    email: `persona${id}@demo.com`,
    tipo: 'PRINCIPAL',
    creado: now,
    actualizado: now
  };
}

function buildCategoriaPersona(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    nombre: `Categoria Persona ${id}`,
    descripcion: `Descripcion ${id}`,
    creado: now,
    actualizado: now
  };
}

function buildNaturalJuridica(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    personaNatural: buildPersonaNatural(id),
    personaJuridica: buildPersonaJuridica(id),
    fechaCreacion: now,
    fechaActualizacion: now
  };
}

function buildViajeroFrecuente(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    areolinea: `Airline ${id}`,
    codigo: `VIP-${id}`,
    viajero: buildViajero(id),
    creado: now,
    actualizado: now
  };
}

function buildCounter(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    nombre: `Counter ${id}`,
    estado: true,
    codigo: `C-${id}`,
    fechaCreacion: now,
    fechaActualizacion: now
  };
}

function buildFormaPago(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    codigo: id,
    descripcion: `Forma ${id}`,
    fechaCreacion: now,
    fechaActualizacion: now
  };
}

function buildEstadoCotizacion(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    descripcion: `Estado ${id}`,
    fechaCreacion: now,
    fechaActualizacion: now
  };
}

function buildSucursal(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    descripcion: `Sucursal ${id}`,
    direccion: `Direccion ${id}`,
    telefono: `900000${id}`,
    email: `sucursal${id}@demo.com`,
    estado: true,
    fechaCreacion: now,
    fechaActualizacion: now
  };
}

function buildCategoria(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    nombre: `Categoria ${id}`,
    creado: now,
    actualizado: now
  };
}

function buildProducto(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    codigo: `PRD-${id}`,
    descripcion: `Producto ${id}`,
    tipo: 'SERVICIO',
    creado: now,
    actualizado: now
  };
}

function buildProveedor(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    nombre: `Proveedor ${id}`,
    nombreJuridico: `Proveedor SA ${id}`,
    ruc: 20000000000 + id,
    creado: now,
    actualizado: now
  };
}

function buildOperador(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    nombre: `Operador ${id}`,
    creado: now,
    actualizado: now
  };
}

function buildCarpeta(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    nombre: `Carpeta ${id}`,
    descripcion: `Descripcion ${id}`,
    creado: now,
    actualizado: now,
    nivel: 1,
    carpetaPadreId: null
  };
}

function buildDocumento(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    tipo: 'DNI',
    descripcion: `Documento ${id}`,
    estado: true,
    creado: now,
    actualizado: now
  };
}

function buildCotizacion(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    nombreCotizacion: `Cotizacion ${id}`,
    codigoCotizacion: `COT-${id}`,
    cantAdultos: 2,
    cantNinos: 1,
    fechaEmision: now,
    fechaVencimiento: now,
    actualizado: now,
    origenDestino: 'LIM-CUS',
    fechaSalida: '2025-06-10',
    fechaRegreso: '2025-06-15',
    moneda: 'PEN',
    observacion: `Observacion ${id}`,
    grupoSeleccionadoId: 1,
    counter: buildCounter(1),
    formaPago: buildFormaPago(1),
    estadoCotizacion: buildEstadoCotizacion(1),
    sucursal: buildSucursal(1),
    carpeta: buildCarpeta(1),
    personas: buildPersona(1)
  };
}

function buildDetalleCotizacion(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    cantidad: 1,
    unidad: 1,
    descripcion: `Detalle cotizacion ${id}`,
    creado: now,
    actualizado: now,
    comision: 10,
    precioHistorico: 120,
    seleccionado: true,
    cotizacion: buildCotizacion(1),
    producto: buildProducto(1),
    proveedor: buildProveedor(1),
    operador: buildOperador(1),
    categoria: buildCategoria(1)
  };
}

function buildCotizacionConDetalles(id: number): Record<string, unknown> {
  const base = buildCotizacion(id);
  return {
    ...base,
    detalles: [
      buildDetalleCotizacionSimple(1, { categoriaId: 1, seleccionado: true }),
      buildDetalleCotizacionSimple(2, { categoriaId: 2, seleccionado: true }),
      buildDetalleCotizacionSimple(3, { categoriaId: 2, seleccionado: true }),
      buildDetalleCotizacionSimple(4, { categoriaId: 3, seleccionado: false }),
      buildDetalleCotizacionSimple(5, { categoriaId: 3, seleccionado: false })
    ]
  };
}

function buildDetalleCotizacionSimple(
  id: number,
  options?: { categoriaId?: number; seleccionado?: boolean }
): Record<string, unknown> {
  const now = nowIso();
  const categoriaId = options?.categoriaId ?? 2;
  return {
    id,
    cantidad: 1,
    unidad: 1,
    descripcion: `Detalle ${id}`,
    precioHistorico: 100 + id,
    creado: now,
    actualizado: now,
    comision: 5,
    seleccionado: options?.seleccionado ?? false,
    categoria: buildCategoria(categoriaId),
    producto: buildProducto(1),
    proveedor: buildProveedor(1),
    operador: buildOperador(1)
  };
}

function buildLiquidacion(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    numero: `LIQ-${id}`,
    fechaCompra: now,
    destino: 'CUSCO',
    numeroPasajeros: 3,
    creado: now,
    actualizado: now,
    cotizacion: buildCotizacion(1),
    producto: buildProducto(1),
    formaPago: buildFormaPago(1),
    carpeta: buildCarpeta(1),
    observacionesLiquidacion: [
      {
        id: 1,
        descripcion: 'Observacion 1',
        valor: 50,
        documento: 'DOC',
        numeroDocumento: 'DOC-001',
        creado: now,
        actualizado: now
      }
    ]
  };
}

function buildLiquidacionConDetalles(id: number): Record<string, unknown> {
  const base = buildLiquidacion(id);
  return {
    ...base,
    detalles: [1, 2].map((detailId) => buildDetalleLiquidacionSimple(detailId)),
    observaciones: [
      {
        id: 1,
        descripcion: 'Observacion 1',
        valor: 50,
        documento: 'DOC',
        numeroDocumento: 'DOC-001',
        creado: base['creado'],
        actualizado: base['actualizado']
      }
    ]
  };
}

function buildDetalleLiquidacion(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    ticket: `TCK-${id}`,
    documentoCobro: `DOC-${id}`,
    costoTicket: 120,
    cargoServicio: 15,
    valorVenta: 135,
    feeEmision: '5',
    documentoFee: 'FEE',
    comision: '10',
    facturaCompra: `FAC-${id}`,
    boletaPasajero: `BOL-${id}`,
    montoDescuento: 0,
    pagoPaxUSD: 0,
    pagoPaxPEN: 135,
    creado: now,
    actualizado: now,
    liquidacion: buildLiquidacion(1),
    viajero: buildViajero(1),
    producto: buildProducto(1),
    proveedor: buildProveedor(1),
    operador: buildOperador(1)
  };
}

function buildDetalleLiquidacionSimple(id: number): Record<string, unknown> {
  return {
    id,
    ticket: `TCK-${id}`,
    documentoCobro: `DOC-${id}`,
    costoTicket: 120,
    cargoServicio: 15,
    valorVenta: 135,
    feeEmision: '5',
    documentoFee: 'FEE',
    comision: '10',
    facturaCompra: `FAC-${id}`,
    boletaPasajero: `BOL-${id}`,
    montoDescuento: 0,
    pagoPaxUSD: 0,
    pagoPaxPEN: 135,
    viajero: buildViajero(1),
    producto: buildProducto(1),
    proveedor: buildProveedor(1),
    operador: buildOperador(1)
  };
}

function buildDocumentoCobranzaResponse(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    serie: 'F001',
    correlativo: 1000 + id,
    fechaEmision: now,
    observaciones: `Observacion ${id}`,
    fileVenta: `FV-${id}`,
    costoEnvio: 0,
    moneda: 'PEN',
    cotizacionId: 1,
    codigoCotizacion: `COT-${id}`,
    personaId: 1,
    sucursalId: 1,
    formaPagoId: 1,
    clienteNombre: `Cliente ${id}`,
    clienteDocumento: `DNI${id}000`,
    tipoDocumentoCliente: 'DNI',
    sucursalDescripcion: 'Sucursal Principal',
    formaPagoDescripcion: 'Contado',
    carpetaId: 1,
    carpetaNombre: 'Carpeta 1',
    personaJuridicaId: 1,
    personaJuridicaRuc: `20${id}0000000`,
    personaJuridicaRazonSocial: `Empresa ${id}`,
    detalleDocumentoId: 1,
    detalles: [1, 2].map((detailId) => buildDetalleDocumentoCobranza(detailId)),
    createdAt: now,
    updatedAt: now
  };
}

function buildDocumentoCobranzaDto(id: number): Record<string, unknown> {
  return {
    fileVenta: `FV-${id}`,
    costoEnvio: 0,
    codigoCotizacion: `COT-${id}`,
    fechaEmision: nowIso(),
    clienteNombre: `Cliente ${id}`,
    clienteTelefono: `900000${id}`,
    clienteDocumento: `DNI${id}000`,
    clienteDireccion: `Direccion ${id}`,
    sucursalDescripcion: 'Sucursal Principal',
    puntoCompra: 'WEB',
    moneda: 'PEN',
    formaPago: 'Contado',
    observaciones: `Observacion ${id}`,
    subtotal: 100,
    total: 100,
    importeEnLetras: 'CIEN',
    detalles: [
      {
        cantidad: 1,
        codigoProducto: 'PRD-1',
        descripcion: 'Producto 1',
        precioUnitario: 100,
        total: 100,
        nombreProducto: 'Producto 1'
      }
    ]
  };
}

function buildDetalleDocumentoCobranza(id: number): Record<string, unknown> {
  return {
    id,
    cantidad: 1,
    descripcion: `Detalle ${id}`,
    precio: 100,
    fechaCreacion: nowIso(),
    documentoCobranzaId: 1,
    documentoCobranzaNumero: 'F001-000001',
    productoId: 1,
    productoDescripcion: 'Producto 1'
  };
}

function buildDetalleRecibo(id: number): Record<string, unknown> {
  return {
    id,
    cantidad: 1,
    descripcion: `Detalle recibo ${id}`,
    precio: 100,
    productoId: 1,
    productoDescripcion: 'Producto 1',
    reciboId: 1,
    reciboNumero: 'R001-000001',
    fechaCreacion: nowIso(),
    fechaActualizacion: nowIso()
  };
}

function buildRecibo(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    serie: 'R001',
    correlativo: 2000 + id,
    fechaEmision: now,
    observaciones: `Observacion ${id}`,
    fechaVencimiento: now,
    fileVenta: `RV-${id}`,
    moneda: 'PEN',
    cotizacionId: 1,
    codigoCotizacion: `COT-${id}`,
    personaId: 1,
    sucursalId: 1,
    formaPagoId: 1,
    detalleDocumentoId: 1,
    clienteNombre: `Cliente ${id}`,
    clienteDocumento: `DNI${id}000`,
    tipoDocumentoCliente: 'DNI',
    sucursalDescripcion: 'Sucursal Principal',
    formaPagoDescripcion: 'Contado',
    carpetaId: 1,
    carpetaNombre: 'Carpeta 1',
    personaJuridicaId: 1,
    personaJuridicaRuc: `20${id}0000000`,
    personaJuridicaRazonSocial: `Empresa ${id}`,
    createdAt: now,
    updatedAt: now,
    detalles: [1, 2].map((detailId) => buildDetalleRecibo(detailId))
  };
}

function buildDetalleDocumento(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    numero: `DOC-${id}`,
    fechaEmision: now,
    fechaVencimiento: now,
    origen: 'LIMA',
    creado: now,
    actualizado: now,
    documento: buildDocumento(1),
    personaNatural: buildPersonaNatural(1)
  };
}

function buildPagoPax(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    monto: 150 + id * 10,
    moneda: id % 2 === 0 ? 'PEN' : 'USD',
    detalle: `Pago pax ${id}`,
    creado: now,
    actualizado: now,
    liquidacion: buildLiquidacion(1),
    formaPago: buildFormaPago(1)
  };
}

function buildObservacionLiquidacion(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    descripcion: `Observacion ${id}`,
    valor: 50 + id * 5,
    documento: 'DOC',
    numeroDocumento: `DOC-${id}`,
    creado: now,
    actualizado: now,
    liquidacion: buildLiquidacion(1)
  };
}

function buildProveedorColaborador(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    cargo: 'Comercial',
    nombre: `Colaborador ${id}`,
    email: `colaborador${id}@demo.com`,
    telefono: `900000${id}`,
    codigoPais: '+51',
    detalle: 'Contacto principal',
    creado: now,
    actualizado: now,
    proveedorId: 1,
    proveedorNombre: 'Proveedor 1'
  };
}

function buildProveedorContacto(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    descripcion: `Contacto ${id}`,
    email: `contacto${id}@demo.com`,
    numero: `900100${id}`,
    codigoPais: '+51',
    creado: now,
    actualizado: now,
    proveedorId: 1,
    proveedorNombre: 'Proveedor 1',
    grupoContactoId: 1,
    grupoContactoNombre: 'Ventas'
  };
}

function buildProveedorGrupoContacto(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    nombre: `Grupo ${id}`,
    descripcion: `Grupo de contacto ${id}`,
    creado: now,
    actualizado: now
  };
}

function buildHistorialCotizacion(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    uuid: `hist-${id}`,
    observacion: `Cambio ${id}`,
    fechaCreacion: now,
    usuarioId: 1,
    usuarioNombre: 'Demo User',
    usuarioEmail: 'demo@everywhere.test',
    cotizacionId: 1,
    codigoCotizacion: `COT-${id}`,
    estadoCotizacionId: 1,
    estadoCotizacionDescripcion: 'En Proceso'
  };
}

function buildHistorialCotizacionSimple(id: number): Record<string, unknown> {
  const now = nowIso();
  return {
    id,
    uuid: `hist-${id}`,
    observacion: `Cambio ${id}`,
    fechaCreacion: now,
    usuarioId: 1,
    usuarioNombre: 'Demo User',
    usuarioEmail: 'demo@everywhere.test',
    estadoCotizacionId: 1,
    estadoCotizacionDescripcion: 'En Proceso'
  };
}

function nowIso(): string {
  return new Date().toISOString();
}
