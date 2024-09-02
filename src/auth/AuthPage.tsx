import { handleGoogleAuth } from "./authService"


export const AuthPage = () => {
  return (
    <>
      <p className="test-p">Authentication page</p>
      <button onClick={handleGoogleAuth}>
        Google SSO
      </button>
    </>
  )
}