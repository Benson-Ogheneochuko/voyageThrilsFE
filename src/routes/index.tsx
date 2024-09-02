import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router-dom"
import LandingPage from "../onboarding"
import { ScreenTemplates } from "../app/ScreensTemplate"
import { AuthPage } from "../auth/AuthPage"
import { FullScreenLayout, ProductLayout } from "./RouteLayouts"
import { TravelLocation } from "../app/TravelLocation"
import { UserProfile } from "../userModule/profile"
import { travelLocationLoader } from "../app/loaders"

import { NotFound } from "../errorHandler/ErrorComponents"


export const AppRouter = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path="/" element={<FullScreenLayout/>}>
        <Route index element={<LandingPage />} />
        <Route path="auth" element={<AuthPage />} />
      </Route>
      <Route path="/locations" element={<ProductLayout/>}>
        <Route index element={<ScreenTemplates />} />
        <Route path=':location' element={<TravelLocation/>} loader={travelLocationLoader}/>
      </Route>
      <Route path="/user-profile" element={<UserProfile/>}>

      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
)
