import React from "react"
import { Payment } from "./Payment"
import { formattedNumber } from "~/helper/formatCurentcy"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faCheck } from "@fortawesome/free-solid-svg-icons"

export const PaymentComplete = () => {
  return (
    <Payment>
      <div className="PaymentComplete">
        <div className="PaymentCompleteNote">
          <p>
            * Nhân viên của hàng sẽ goi điện xác nhận với quý khách trong vòng
            15 phút
          </p>
          <p>
            * Các đơn hàng từ 21h30 đến 8h sáng ngày hôm sau của hàng sẽ liên hệ
            với quý khác trước 10h trưa cùng ngày
          </p>
        </div>
        <div className="PaymentCompleteInfo mt-3 ">
          <h2>Đặt Hàng Thành Công</h2>
          <div className="d-flex align-items-center justify-content-between">
            <div className="PaymentOrderCode d-flex gap-3">
              <h3>Đơn hàng :</h3>
              <p>567899876</p>
            </div>
            {/* <div className="PaymentOrderManager d-flex gap-3">
                <p>Quản lý đơn hàng</p>
                <p>Hủy</p>
              </div> */}
          </div>
          <div className="d-flex gap-3">
            <h3>Người nhận hàng :</h3>
            <p> Anh Hiep , 0943076182</p>
          </div>
          <div className="d-flex gap-3">
            <h3> Giao đến :</h3>
            <p>diễn lộc diễn châu nghệ an</p>
          </div>
          <div className="d-flex gap-3">
            <h3> Hình thức thanh toán :</h3>
            <p>Nhận hàng thanh toán tiền mặt</p>
          </div>
          <div className="d-flex gap-3">
            <h3>Tông tiền:</h3> <p>63000000</p>
          </div>
        </div>
        <div className="PaymentProduct">
          <div className="PaymentProductItem">
            <div className="PaymentProductImage">
              <img
                src="https://image.cellphones.com.vn/200x/media/catalog/product/x/_/x_m_25.png"
                alt=""
              />
            </div>
            <div className="PaymentProductInfo">
              <h3>Iphone 14 Pro max Đen / 256gb</h3>
              <div className="d-flex gap-3">
                <p>Giá :</p>
                <p>{formattedNumber(27990000)}</p>
                <p className="text-decoration-line-through">
                  {formattedNumber(27990000)}
                </p>
              </div>
              <div className="d-flex">
                <p>Số lượng :</p>
                <p>1</p>
              </div>
              <div className="d-flex">
                <p>Tông tiền :</p>
                <p>{formattedNumber(27900000)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="PaymentCompleteButton">
          <div className="CheckOrderComplete PaymentCompleteButtonIcon">
            <p>Kiểm tra đơn hàng</p>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="NextBuyProduct PaymentCompleteButtonIcon">
            <p>PaymentComplete</p>
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
        </div>
      </div>
    </Payment>
  )
}
