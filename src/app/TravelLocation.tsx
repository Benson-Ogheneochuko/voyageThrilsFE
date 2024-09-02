import { useLoaderData } from "react-router-dom"

export const TravelLocation = () => {
  const location = useLoaderData()

  return(
    <>
    {location}
    </>
  )
}

export default TravelLocation