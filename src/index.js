import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import GlobalStyle from "~/app/globalStyle"
import reportWebVitals from "./reportWebVitals"
import "./scss/app.scss"
import AppContext from "./context/AppContext"
import { Notify } from "./helper/toast"
import { Provider } from "react-redux"
import store from "./store"
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <Provider store={store}>
        <AppContext>
          <App />
          <Notify />
        </AppContext>
      </Provider>
    </GlobalStyle>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
