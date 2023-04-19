import React, { useContext } from "react"
import { Route, Navigate } from "react-router-dom"
import { DataContext } from "~/context/AppContext"

export const PrivateRoute = ({ path, element }) => {
  const { isLogin } = useContext(DataContext) // Kiểm tra xem người dùng đã đăng nhập hay chưa
  console.log(isLogin)
  if (!isLogin) {
    return <Navigate to="/account" />
  }

  return <Route path={path} element={element} />
}
