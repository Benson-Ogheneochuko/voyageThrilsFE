// errorTypes.ts
export enum ErrorType {
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  USER_ERROR = 'USER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

export enum ErrorCode {
  NOT_FOUND = 404,
  USER_ERROR = 400, // Bad Request
  SERVER_ERROR = 500, // Internal Server Error
  NETWORK_ERROR = 503, // Service Unavailable
  BAD_GATEWAY = 502,
  GATEWAY_TIMEOUT = 504,
  UNSUPPORTED_HTTP_VERSION = 505 // The server does not support the HTTP protocol version used in the request.
}