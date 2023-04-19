import React, { useContext } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { HomeAccount } from "./app/homePage/HomeAccount"
import { Gototop } from "./components/Gototop"
import { DataContext } from "./context/AppContext"
import { LoadingProcess } from "./helper/LoadingProcess"
import { HomeLayout } from "./layout"
import { router } from "./router"
import { PrivateRoute } from "~/components/auth/PrivateRoute"
import { Smember } from "./components/auth/Smember"
import { Notfound } from "./components/Notfound"
import { routerPrivate } from "./router/router"

function App() {
  const { loading, setLoading } = useContext(DataContext)
  return (
    <Router>
      {loading ? (
        <LoadingProcess />
      ) : (
        <div className="app">
          <Routes>
            {routerPrivate.map((route, key) => {
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
            })}
            {router.map((route, index) => {
              const Page = route.component
              let Layout = HomeLayout
              if (route.layout) {
                Layout = route.layout
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout data={route.props}>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
            <Route path="*" element={<Notfound />} />
          </Routes>
          <Gototop />
        </div>
      )}
    </Router>
  )
}

export default App
