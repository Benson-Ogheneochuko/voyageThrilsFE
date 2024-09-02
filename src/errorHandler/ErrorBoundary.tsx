// ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react'
import { useErrorStore } from './ErrorStore'
import { ErrorComponent } from './ErrorComponents'
import { ErrorType } from './ErrorTypes'
import { AppError } from './AppError'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false}
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { setError } = useErrorStore.getState()

    if (error instanceof AppError) {
      setError(ErrorType.USER_ERROR, error.statusCode, error.userMessage)
      console.error('User Error: \n\n', error, errorInfo)
    } else {
      setError(ErrorType.SERVER_ERROR, 500, 'An unexpected error occurred')
      console.error('Uncaught error: \n\n', error, errorInfo)
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorComponent />
    }

    return this.props.children
  }
}

// This wrapper component combines the class component with the store
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundaryClass>
      {children}
    </ErrorBoundaryClass>
  )
}

export default ErrorBoundary