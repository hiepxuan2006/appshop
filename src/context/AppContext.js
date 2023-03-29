import * as React from "react"
import { useEffect } from "react"
import { removeLocalData } from "~/services/StoreageServices"
import { secretAccount } from "~/services/authService"

export const DataContext = React.createContext()
const AppContext = (props) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)
  const [isLogin, setIsLogin] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const secretLogin = async () => {
    try {
      // setLoading(true)
      const { data, success, message } = await secretAccount()
      if (!success) {
        removeLocalData("access_token")
        removeLocalData("user")
        removeLocalData("roles")
        removeLocalData("is_admin")
        throw new Error(message)
      }

      // setIsLogin(true)
      setLoading(false)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    secretLogin()
  }, [])
  const value = {
    isCollapsed,
    setIsCollapsed,
    setIsLogin,
    isLogin,
    loading,
    setLoading,
  }
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  )
}

export default AppContext
