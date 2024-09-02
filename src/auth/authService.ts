import { handleError } from "../errorHandler/AppError"
import { googleAuth } from "./ssoUtil"
import { userProfileState } from "../globalState/userState"


export const handleGoogleAuth = async () => {
  try {
    const user = await googleAuth()

    console.log('Authentication successful:', user, userProfileState.getState().user)
  } catch (error) {
    handleError(error)
  }
}
