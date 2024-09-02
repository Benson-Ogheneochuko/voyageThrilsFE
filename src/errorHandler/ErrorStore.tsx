// errorStore.ts
import { create } from 'zustand'
import { ErrorType } from './ErrorTypes'
import { useFeedbackStore } from '../globalState/feedbackStore'

interface ErrorState {
  hasError: boolean
  errorType: ErrorType | null
  errorCode?: number
  errorMessage?: string
  errorPath?: string
  setError: (type: ErrorType, code?: number, message?: string, path?: string) => void
  clearError: () => void
}

export const useErrorStore = create<ErrorState>((set) => ({
  hasError: false,
  errorType: null,
  errorCode: undefined,
  errorMessage: undefined,
  errorPath: undefined,
  setError: (type, code, message, path) => {
    set({
      hasError: true,
      errorType: type,
      errorCode: code,
      errorMessage: message,
      errorPath: path
    })

     if ([ErrorType.SERVER_ERROR, ErrorType.USER_ERROR].includes(type)) {
      useFeedbackStore.getState().showFeedback(message as string, 'error')
     }
  },
  clearError: () =>
    set({
      hasError: false,
      errorType: null,
      errorCode: undefined,
      errorMessage: undefined,
      errorPath: undefined
    })
}))