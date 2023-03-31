import React, { useState } from "react"
import { Link } from "react-router-dom"
const shipper = require("~/assets/Shipper.png")
export const CheckOrder = () => {
  const [value, setValue] = useState({
    phone: "",
    code: "",
  })
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const handleClickCheck = () => {}
  return (
    <div className="CheckOrderPage d-flex justify-content-between">
      <div className="CheckOrderPageBg"></div>
      <div className="CheckOrderPageImage">
        <img src={shipper} alt="" />
      </div>
      <div className=""></div>
      <div className="CheckOrder w-50 h-100 ">
        <h2>Kiểm tra thông đơn hàng và tình trạng vận chuyển</h2>
        <div className="FormInput">
          <input
            type="text"
            onChange={handleChange}
            name="phone"
            placeholder=" "
          />
          <label htmlFor="">Số điện thoại (bắt buộc)</label>
        </div>
        <div className="FormInput">
          <input
            type="text"
            onChange={handleChange}
            name="code"
            placeholder=" "
          />
          <label htmlFor="">Nhập mã đơn hàng (bắt buộc)</label>
        </div>
        <button onClick={() => handleClickCheck()} className="CheckOrderButton">
          Kiểm Tra
        </button>
        <p className="d-none OptionCheckOrder">hoặc</p>
        <Link to={"/account"} className="CheckLoginButton d-none">
          Đăng nhập để tra cứu thuận tiện hơn
        </Link>
      </div>
    </div>
  )
}
