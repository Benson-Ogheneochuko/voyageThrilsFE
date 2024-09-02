import { AppError, DevError } from "../errorHandler/AppError"
import { userProfileState } from "../globalState/userState"
import { ErrorType } from "../errorHandler/ErrorTypes"

const authEndpoint = `${import.meta.env.VITE_LOCAL_HOST_BASE_ENDPOINT}/auth`
export const googleAuth = (endpoint = authEndpoint) => {
  return new Promise((resolve, reject) => {
    const operation = 'Google Auth'

    const maxWidth = 480;
    const maxHeight = 600;
    const width = Math.min(screen.width, maxWidth);
    const height = Math.min(screen.height, maxHeight);
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);

    const popup = window.open(
      `${endpoint}/googleAuth`,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top}`
    )

    const popupLocation = popup?.location.href

    if (!popup) {
      reject(new AppError({
        operation,
        errorMessage: "Failed to open authentication window",
        errorType: ErrorType.USER_ERROR,
        userMessage: "Unable to open the authentication window. Please check your pop-up blocker settings and try again.",
        statusCode: 400,
      }))
      return
    }

    let authTimeoutId: number | null = null
    let checkPopupId: number | null = null
    const checkPopupInterval = 500 // milliseconds
    let initialCheckPassed = false

    // clear timeout and remove event listener
    const cleanup = () => {
      window.removeEventListener('message', handleMessage)
      if (authTimeoutId) {
        clearTimeout(authTimeoutId)
      }
      if (checkPopupId) {
        clearInterval(checkPopupId)
      }
    }

    // todo:: requires attention
    const checkPopupState = () => {
      if (popup.closed) {
        cleanup()
        reject(new AppError({
          operation,
          errorMessage: "Popup closed by user before authentication was completed",
          errorType: ErrorType.USER_ERROR,
          userMessage: "The authentication window was closed. Please try again.",
          statusCode: 400,
        }))
      } else {
        try {
          const popupLocation = popup.location.href

          if (!initialCheckPassed) {
            if (popupLocation === 'about:blank') {
              // Still loading, wait for next check
              return
            } else if (popupLocation.startsWith(endpoint)) {
              // First redirect hasn't happened yet, wait for next check
              return
            } else if (popupLocation.includes('accounts.google.com')) {
              // Successfully redirected to Google's consent screen
              initialCheckPassed = true
              return
            } else {
              // Unexpected redirect
              cleanup()
              popup.close()
              reject(new AppError({
                operation,
                errorMessage: "Unexpected redirect during authentication",
                errorType: ErrorType.USER_ERROR,
                userMessage: "An unexpected error occurred during authentication. Please try again.",
                statusCode: 400,
              }))
            }
          }
          // After initial check passed, we can't access popup.location.href due to CORS,
          // so we'll just wait for the message event
        } catch (error) {
          // This catch block will handle cross-origin errors after redirect to Google
          // We don't want to reject here, as this is expected behavior
          console.log(error)
        }
      }
    }

    // Start checking popup state
    checkPopupId = setInterval(checkPopupState, checkPopupInterval)

    // handle server response
    const handleMessage = async (event: MessageEvent) => {
      if (popupLocation !== 'about:blank' && !endpoint.includes(event.origin)) {
        cleanup()
        reject(new DevError({
          operation,
          errorMessage: `Origin mismatch or unexpected message received from origin: ${event.origin}`,
        }))
        return
      }

      try {
        const data = await JSON.parse(event.data)

        if (data.type === 'AUTH_RESULT') {
          cleanup()

          if (data.status === 'success') {
            userProfileState.getState().userProfile(data.user);
            resolve(data.user);
          } else {
            reject(new AppError({
              operation,
              errorMessage: `Authentication failed: ${data.message}`,
              errorType: ErrorType.USER_ERROR,
              userMessage: `${data.message || "We couldn't complete the authentication."} Please try again.`,
              statusCode: data.status || 401,
            }));
          }

          if (!popup.closed) {
            popup.close()
          }
        }
      } catch (error) {
        cleanup()
        reject(new DevError({
          operation,
          errorMessage: error instanceof Error ? error.message : `Error processing message: ${ String(error) }`,
        }))
      }
    }

    window.addEventListener('message', handleMessage)

    authTimeoutId = setTimeout(() => {
      cleanup()
      if (popup && !popup.closed) {
        popup.close()
      }
      reject(new AppError({
        operation,
        errorMessage: "Authentication timed out",
        errorType: ErrorType.USER_ERROR,
        userMessage: "The authentication process took too long. Please try again.",
        statusCode: 408,
      }))
    }, 300000) // 5 minutes timeout
  })
}