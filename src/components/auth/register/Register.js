import { faGooglePlus } from "@fortawesome/free-brands-svg-icons"
import {
  faArrowAltCircleLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import { useState } from "react"
import { Link } from "react-router-dom"
import { validatePassword } from "~/helper/regexPassword"
import style from "./Register.module.scss"
import { DocTitle } from "~/helper/DocTitle"
const loginImg = require("~/assets/login.png")
const cx = classNames.bind(style)
export const Register = () => {
  const [data, setData] = useState({
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
    error: {},
  })
  const { phone, email, password, passwordConfirm, error } = data

  const handleChage = (e) => {
    setData({ ...data, error: "", [e.target.name]: e.target.value })
  }
  const validate = validatePassword(password)
  const handleRegister = (e) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      return setData({
        ...data,
        error: { ...error, pass: "Mật khẩu không khớp" },
      })
    }
  }
  console.log(error)
  return (
    <div className={cx("register")}>
      <DocTitle title={"Smember | Tri ân khách hàng thân thiết"} />

      <form onSubmit={handleRegister} className={cx("inner")}>
        <div className={cx("back")}>
          <Link to="/account">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </Link>
          <h2>Đăng ký tài khoản</h2>
        </div>
        <div className={cx("image")}>
          <img src={loginImg} alt="" />
        </div>
        <h2>Đăng ký tài khoản Smember</h2>
        <div className={cx("input-text")}>
          <input
            required
            name="phone"
            className={cx("form-input-name")}
            type="text"
            placeholder=" "
            onChange={handleChage}
          />
          <label htmlFor="name">Vui lòng nhập số điện thoại(bắt buộc)</label>
        </div>
        <div className={cx("input-text")}>
          <input
            required
            name="email"
            className={cx("form-input-name")}
            type="email"
            placeholder=" "
            onChange={handleChage}
          />
          <label htmlFor="name">Vui lòng nhập địa chỉ email(bắt buộc)</label>
        </div>
        <div className={cx("input-text")}>
          <input
            required
            className={cx("form-input-password")}
            type="password"
            placeholder=" "
            onChange={handleChage}
            name="password"
          />
          <label htmlFor="">Vui lòng nhập mật khẩu</label>
        </div>
        <p
          className={`${cx("note")} ${password ? cx("hideOn") : ""} ${
            !validate.length ? cx("success") : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faCheck}
            className={!validate.length ? cx("success") : cx("failed")}
          />
          Mật khẩu phải nhiều hơn 8 ký tự
        </p>
        <p
          className={`${cx("note")} ${password ? cx("hideOn") : ""} ${
            !validate.capitalize ? cx("success") : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faCheck}
            className={!validate.capitalize ? cx("success") : cx("failed")}
          />
          Ít nhất 1 chữ thường 1 chữ in hoa
        </p>
        <p
          className={`${cx("note")} ${password ? cx("hideOn") : ""} ${
            !validate.number ? cx("success") : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faCheck}
            className={!validate.number ? cx("success") : cx("failed")}
          />
          Ít nhất 1 chữ số
        </p>
        <p
          className={`${cx("note")} ${password ? cx("hideOn") : ""} ${
            !validate.characters ? cx("success") : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faCheck}
            className={!validate.characters ? cx("success") : cx("failed")}
          />
          Chứa ký tự đặc biệt
        </p>
        <div className={cx("input-text")}>
          <input
            required
            name="passwordConfirm"
            type="password"
            placeholder=" "
            onChange={handleChage}
          />
          <label htmlFor="">Xác nhận lại mật khẩu</label>
          {/* <div className={cx("iconEye")}>
            <FontAwesomeIcon icon={faEyeSlash} />
            <FontAwesomeIcon icon={faEye} />
          </div> */}
        </div>
        <p className={`${cx("error")}`}>{error.pass}</p>
        <button type="submit" className={cx("btn-login")}>
          Đăng Ký
        </button>

        <div>
          <p>hoặc</p>
        </div>
        <button className={cx("btn-login-gg")}>
          <FontAwesomeIcon icon={faGooglePlus} />
          <p> Đăng nhập bằng Google</p>
        </button>
        <p className={cx("node-register")}>
          Bạn có tài khoản ?<Link to="/account">Đăng nhập ngay</Link>
        </p>
      </form>
    </div>
  )
}
