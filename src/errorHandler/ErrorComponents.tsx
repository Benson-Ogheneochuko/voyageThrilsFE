// ErrorComponents.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ErrorCode, ErrorType } from './ErrorTypes';
import { useErrorStore } from './ErrorStore';
import { useFeedbackStore } from '../globalState/feedbackStore';

interface ErrorProps {
  errorType?: ErrorType;
  errorCode?: number;
  errorMessage?: string;
  errorPath?: string;
}

export const NotFound = () => {
  const { setError } = useErrorStore();

  useEffect(() => {
    setError(ErrorType.NOT_FOUND, ErrorCode.NOT_FOUND, 'Route Page not found');
  }, [setError]);

  return <ErrorComponent />;
}

export const TemplateErrorElement: React.FC<{ errorCode: number; errorMessage: string }> = ({ errorCode, errorMessage }) => {
  return (
    <div className="errorElement">
      <h1>Error {errorCode}</h1>
      <p>{errorMessage}</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};


export const ErrorComponent: React.FC<ErrorProps>= (props : ErrorProps) => {
  const { errorType, errorCode, errorMessage, clearError } = useErrorStore() || props
  useEffect(() => {
    return () => clearError()
  }, [clearError])

  switch (errorType) {
    case ErrorType.NOT_FOUND:
    case ErrorType.NETWORK_ERROR:
      return <TemplateErrorElement errorCode={errorCode || ErrorCode[errorType]} errorMessage={errorMessage || 'User Error'} />;

    case ErrorType.USER_ERROR:
    case ErrorType.SERVER_ERROR:
      useFeedbackStore.getState().showFeedback(errorMessage as string, 'error');
      return null;

    default:
      return <TemplateErrorElement errorCode={520} errorMessage={'An Unexpected Error Occurred'} />;
  }
};