import { AppError, handleError } from "../errorHandler/AppError"
import { ErrorType } from "../errorHandler/ErrorTypes"
import { userProfileState } from "../globalState/userState"

const apiEndpoint = `${import.meta.env.VITE_LOCAL_HOST_USER_ENDPOINT}`
const testEmail = `${import.meta.env.VITE_TEST_EMAIL}`

export const fetchUserProfile = async (param = testEmail) => {
  const options: RequestInit = {
    method: 'POST',
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: param
    })
  }

  try {
    const result = await fetch(apiEndpoint, options)
    const userData = await result.json()

    if (!result || !result.ok ) {
      throw new AppError({
        operation: 'GET_USER',
        userMessage: userData.message || 'Unable to fetch user profile. Please try again later.',
        errorType: ErrorType.USER_ERROR,
        statusCode: userData.statusCode
      });
    }

    userProfileState.getState().userProfile(userData.data)

    return userData
  } catch (error) {
    handleError(error)
  }
}