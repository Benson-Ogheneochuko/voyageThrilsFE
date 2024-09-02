// errorTypes.ts
export enum ErrorType {
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  USER_ERROR = 'USER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  NO_LOG = 'NO_LOG'
}

export enum ErrorCode {
  NO_LOG = 0,
  NOT_FOUND = 404,
  USER_ERROR = 400, // Bad Request
  SERVER_ERROR = 500, // Internal Server Error
  NETWORK_ERROR = 503, // Service Unavailable
  BAD_GATEWAY = 502,
  GATEWAY_TIMEOUT = 504,
  UNSUPPORTED_HTTP_VERSION = 505 // The server does not support the HTTP protocol version used in the request.
}

export const CoverageErrorMessages: Record<string, string> = {
  "Failed to fetch": 'Unable to connect to the server. Please check your internet connection or try again later.',
  "AbortError": 'The request timed out. Please try again.'
}