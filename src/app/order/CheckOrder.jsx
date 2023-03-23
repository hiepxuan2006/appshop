import React from "react"
const shipper = require("~/assets/Shipper.png")
export const CheckOrder = () => {
  return (
    <div className="CheckOrderPage d-flex justify-content-between">
      <div className="CheckOrderPageBg"></div>
      <div className="CheckOrderPageImage">
        <img src={shipper} alt="" />
      </div>
      <div></div>
      <div className="CheckOrder w-50 h-100 ">
        <h2>Kiểm tra thông đơn hàng và tình trạng vận chuyển</h2>
        <div className="FormInput">
          <input type="text" placeholder=" " />
          <label htmlFor="">Số điện thoại (bắt buộc)</label>
        </div>
        <div className="FormInput">
          <input type="text" placeholder=" " />
          <label htmlFor="">Số điện thoại (bắt buộc)</label>
        </div>
        <div className="CheckOrderButton">Kiểm Tra</div>
      </div>
    </div>
  )
}
