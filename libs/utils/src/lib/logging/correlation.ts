/**
 * Correlation ID Utilities
 * For tracking requests across services
 */

import { v4 as uuidv4 } from 'uuid';

export const CORRELATION_ID_HEADER = 'x-correlation-id';
export const REQUEST_ID_HEADER = 'x-request-id';

/**
 * Generate a new correlation ID
 */
export function generateCorrelationId(): string {
  return uuidv4();
}

/**
 * Generate a new request ID
 */
export function generateRequestId(): string {
  return uuidv4();
}

/**
 * Extract correlation ID from headers
 */
export function extractCorrelationId(
  headers: Headers | Record<string, string | string[] | undefined>
): string | undefined {
  if (headers instanceof Headers) {
    return headers.get(CORRELATION_ID_HEADER) || undefined;
  }

  const value = headers[CORRELATION_ID_HEADER];
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Extract request ID from headers
 */
export function extractRequestId(
  headers: Headers | Record<string, string | string[] | undefined>
): string | undefined {
  if (headers instanceof Headers) {
    return headers.get(REQUEST_ID_HEADER) || undefined;
  }

  const value = headers[REQUEST_ID_HEADER];
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Get or create correlation ID from headers
 */
export function getOrCreateCorrelationId(
  headers: Headers | Record<string, string | string[] | undefined>
): string {
  return extractCorrelationId(headers) || generateCorrelationId();
}

/**
 * Get or create request ID from headers
 */
export function getOrCreateRequestId(
  headers: Headers | Record<string, string | string[] | undefined>
): string {
  return extractRequestId(headers) || generateRequestId();
}

/**
 * Next.js middleware helper for correlation IDs
 */
export function withCorrelationId(request: Request): {
  correlationId: string;
  requestId: string;
  headers: Headers;
} {
  const correlationId = getOrCreateCorrelationId(request.headers);
  const requestId = generateRequestId();

  const headers = new Headers(request.headers);
  headers.set(CORRELATION_ID_HEADER, correlationId);
  headers.set(REQUEST_ID_HEADER, requestId);

  return { correlationId, requestId, headers };
}
