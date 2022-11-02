import { Route, Router, Routes } from "react-router-dom";
import { HomeLayout } from "./layout";
import { router } from "./router";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {router.map((route, index) => {
            const Page = route.component;
            let Layout = HomeLayout;
            if (route.layout) {
              Layout = route.layout;
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
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
