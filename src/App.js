import { useContext } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Gototop } from "./components/Gototop"
import { Loading } from "./components/Loading"
import { Notfound } from "./components/Notfound"
import { DataContext } from "./context/AppContext"
import { HomeLayout } from "./layout"
import { router } from "./router"
import { routerPrivate } from "./router/router"
import { LoadingProcess } from "./helper/LoadingProcess"

function App() {
  const { loading, setLoading } = useContext(DataContext)
  return (
    <Router>
      <div className="app">
        {loading && <LoadingProcess />}
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
    </Router>
  )
}

export default App
