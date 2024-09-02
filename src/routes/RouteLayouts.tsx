import { Outlet } from "react-router-dom";

export const FullScreenLayout = () =>{
  return <Outlet />
}

export const ProductLayout = () =>{
  return (
    <>
      <p>Product nav</p>
      <Outlet />
    </>
  )
}