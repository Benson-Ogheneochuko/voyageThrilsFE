import { useErrorStore } from "./ErrorStore"
import { CoverageErrorMessages, ErrorCode, ErrorType } from "./ErrorTypes"

interface IAppError  {
  operation: string
  userMessage : string
  statusCode?: number
  errorType?: ErrorType
  errorMessage? : string
}

export class AppError extends Error implements IAppError {
  operation: string
  statusCode: number
  errorType: ErrorType
  userMessage: string

  constructor({operation, errorMessage, errorType = ErrorType.USER_ERROR, userMessage, statusCode = ErrorCode.USER_ERROR}: IAppError) {
    super(errorMessage)
    this.name = this.constructor.name
    this.operation = operation
    this.userMessage = userMessage
    this.statusCode = statusCode
    this.errorType = errorType
  }
}

interface IDevError {
  operation: string
  errorMessage: string
  errorType?: ErrorType
}

export class DevError extends AppError {
  constructor({operation, errorMessage, errorType = ErrorType.SERVER_ERROR}: IDevError) {
    super({
      operation,
      errorMessage,
      errorType,
      statusCode: 500,
      userMessage: 'An unexpected error occurred'
    })
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {

    console.log(`${error} \n`, `message: ${error.message}`)
    console.error(`${error} \n`, `stack: ${error.stack}`)
    return useErrorStore.getState().setError(error.errorType, error.statusCode, error.userMessage)
  } else {
    // Handle cases where error is not an instance of AppError
    const errorMessage = error instanceof Error ? error.message : String(error)
    const stackTrace = error instanceof Error ? error.stack : 'No stack trace available'

    if (Object.keys(CoverageErrorMessages).includes(errorMessage)) {
      return useErrorStore.getState().setError(ErrorType.NO_LOG, ErrorCode.NO_LOG, CoverageErrorMessages[errorMessage])
    }

    console.log(`Unexpected error: ${errorMessage}`)
    console.error(`Unexpected error: ${errorMessage} \n Stack: ${stackTrace}`)
    return useErrorStore.getState().setError(ErrorType.SERVER_ERROR, ErrorCode.SERVER_ERROR, 'An unexpected error occurred')
  }
}


export const routeNotFound =()=> handleError(
  new AppError({
    operation: "page not found",
    errorType: ErrorType.NOT_FOUND,
    statusCode: ErrorCode.NOT_FOUND,
    userMessage: "Route Page not found"
  })
);