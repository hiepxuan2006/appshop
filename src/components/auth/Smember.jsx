import React, { useContext, useEffect } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { HomeAccount } from "~/app/homePage/HomeAccount"
import { DataContext } from "~/context/AppContext"
import { HomeLayout } from "~/layout"
import { routerPrivate } from "~/router/router"
import { Notfound } from "../Notfound"

export const Smember = () => {
  const { isLogin, loading } = useContext(DataContext)
  const navigate = useNavigate()
  const getRoutes = (allRoutes) =>
    allRoutes.map((route, key) => {
      const Page = route.component
      let Layout = HomeLayout
      if (route.layout) {
        Layout = route.layout
      }
      return (
        <Route
          key={key}
          path={route.path}
          element={
            <Layout data={route.props}>
              <Page />
            </Layout>
          }
        />
      )
    })
  useEffect(() => {
    if (!isLogin) navigate("/login")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])

  return (
    <>
      <Routes>
        {getRoutes(routerPrivate)}
        <Route path="/account" element={<Navigate to="/account/homepage" />} />
      </Routes>
    </>
  )
}
