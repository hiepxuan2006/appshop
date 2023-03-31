import { useContext } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { DataContext } from "./context/AppContext"
import { Loading } from "./helper/Loading"
import { HomeLayout } from "./layout"
import { router } from "./router"
import { Gototop } from "./components/Gototop"
import { LoadingProcess } from "./helper/LoadingProcess"

function App() {
  const { loading, setLoading } = useContext(DataContext)
  return (
    <Router>
      {loading ? (
        <LoadingProcess />
      ) : (
        <div className="app">
          <Routes>
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
          </Routes>
          <Gototop />
        </div>
      )}
    </Router>
  )
}

export default App
