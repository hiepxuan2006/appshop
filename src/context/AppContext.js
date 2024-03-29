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
  const [loading, setLoading] = React.useState(true)
  const [cartTotal, setCartTotal] = React.useState(0)
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
  const [visible, setVisible] = React.useState(false)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

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
    setLoading(true)
    try {
      const { success, message } = await secretAccount()
      if (!success) {
        removeLocalData("access_token")
        removeLocalData("user")
        removeLocalData("roles")
        removeLocalData("is_admin")
        setIsLogin(false)
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
    windowWidth,
    visible,
    setVisible,
  }
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  )
}

export default AppContext
