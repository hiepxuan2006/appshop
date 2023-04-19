import classNames from "classnames/bind"
import { gapi } from "gapi-script"
import { useContext, useEffect, useState } from "react"
import { GoogleLogin } from "react-google-login"
import { Link, useNavigate } from "react-router-dom"
import { DocTitle } from "~/helper/DocTitle"
import style from "./Login.module.scss"
import { Spinner } from "react-bootstrap"
import Modal from "react-modal"
import { authGoogle, loginLocal } from "~/services/authService"
import { toast } from "react-toastify"
import AppContext, { DataContext } from "~/context/AppContext"
import { setLocalData } from "~/services/StoreageServices"
import { setAccessToken, setRoles, setUserData } from "~/services/localStoreage"
import { toastAlert } from "~/helper/toast"
import { LoadingProcess } from "~/helper/LoadingProcess"

const loginImg = require("~/assets/login.png")
const cx = classNames.bind(style)
const clientId = process.env.REACT_APP_CLIENT_ID_GOOGLE
export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: {},
  })
  const { setIsLogin, isLogin } = useContext(DataContext)
  const [loading, setLoading] = useState(false)
  const { email, password, error } = data
  const navigation = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleBlur = (e) => {
    setData({ ...data, error: Object.assign(error, { [e.target.name]: "" }) })
  }

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID_GOOGLE,
        plugin_name: "chat",
      })
    })
  }, [])

  const failureHandler = (res) => {
    toastAlert("error", "Đăng nhập thất bại")
  }

  const loginHandler = async (res) => {
    try {
      setLoading(true)
      console.log(res)
      const profileObj = res.profileObj
      const { data, success, message } = await authGoogle(profileObj)

      if (!success) throw new Error(message)
      setIsLogin(true)
      setUserData(data.profile)
      setAccessToken(data.access_token)
      setRoles(data.roles)
      setLocalData("is_admin", data.is_admin)
      toastAlert("success", "Đăng nhập thành công")
      navigation("/")
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toastAlert("error", "Đăng nhập thất bại")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { data, success, message } = await loginLocal({ email, password })
    setLoading(false)
    if (!success) {
      toastAlert("error", message)
      throw new Error(message)
    }
    setIsLogin(true)
    setUserData(data.profile)
    setAccessToken(data.access_token)
    setRoles(data.roles)
    setLocalData("is_admin", data.is_admin)
    toastAlert("success", "Đăng nhập thành công")
    navigation("/")
  }
  console.log(isLogin)
  useEffect(() => {
    if (isLogin) navigation("/account/homepage")
  }, [])
  return loading ? (
    <LoadingProcess />
  ) : (
    <div className={cx("login")}>
      <DocTitle title={"Smember | Tri ân khách hàng thân thiết"} />
      {loading && (
        <Modal
          isOpen={loading}
          className="h-100 w-100 d-flex align-items-center justify-content-center"
          // onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
          // style={customStyles}
          contentLabel="Example Modal"
        >
          <Spinner animation="border" variant="warning" />
        </Modal>
      )}
      <form className={`${cx("inner")} form-check`} onSubmit={handleSubmit}>
        <div className={cx("image")}>
          <img src={loginImg} alt="" />
        </div>
        <h2>Đăng nhập tài khoản Smember</h2>
        <div className={cx("input-text")}>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            required
            name="email"
            className={`${cx("form-input-name")}`}
            type="text"
            placeholder=" "
          />
          <label htmlFor="name">Vui lòng nhập email</label>
        </div>
        <div className={cx("input-text")}>
          <input
            onChange={handleChange}
            required
            className={cx("form-input-password")}
            type="password"
            name="password"
            placeholder=" "
          />
          <label htmlFor="">Vui lòng nhập mật khẩu</label>
        </div>
        <p>Quên mật khẩu ?</p>
        <button type="submit" className={cx("btn-login")}>
          Đăng nhập
        </button>

        <div>
          <p>hoặc</p>
        </div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Đăng nhập với google"
          className="w-100 d-flex justify-content-center rounded-pill"
          onSuccess={loginHandler}
          onFailure={failureHandler}
          cookiePolicy={"single_host_origin"}
          // isSignedIn={true}
        />

        <p className={cx("node-register")}>
          Bạn chưa có tài khoản ?<Link to="register">Đăng ký ngay</Link>
        </p>
        <div style={{ margin: "20px 0 40px" }}>
          <Link to="">Xem chính sách ưu đãi Smember</Link>
        </div>
      </form>
    </div>
  )
}
