import * as React from "react"
import { useEffect } from "react"
import {
  getLocalData,
  removeLocalData,
  setLocalData,
} from "~/services/StoreageServices"
import { secretAccount } from "~/services/authService"

export const DataContext = React.createContext()
const AppContext = (props) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)
  const [isLogin, setIsLogin] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [cartTotal, setCartTotal] = React.useState(0)

  useEffect(() => {
    const cartLocal = getLocalData("cart-product-list")
    if (cartLocal && Date.now - cartLocal.__expires > 0) {
      const cartEmpty = {
        data: {
          totalQuantity: 3,
          productList: [],
          __expires: Date.now() + 86400000,
        },
      }
      setCartTotal(0)
      setLocalData("cart-product-list", cartEmpty)
    }
    setCartTotal(cartLocal?.data?.totalQuantity)
  }, [])
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

      setIsLogin(true)
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
    cartTotal,
    setCartTotal,
  }
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  )
}

export default AppContext
