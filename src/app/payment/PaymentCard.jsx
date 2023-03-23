import React from "react"
import { Payment } from "./Payment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHomeUser,
  faM,
  faMoneyBill,
  faMoneyBillTransfer,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons"
import { faPaypal } from "@fortawesome/free-brands-svg-icons"

export const PaymentCard = () => {
  return (
    <Payment>
      <div className="PaymentCardPage">
        <div className="PaymentOrder">
          <div className="PaymentOrderHeader mb-3">
            <h3>Cảm ơn anh A đã cho cellphone có cơ hội được phục vụ</h3>
          </div>
          <div className="PaymentOrderContent mt-3">
            <h3 className="w-100 text-center ">Thông tin đơn hàng</h3>
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
              <h3>Tông tiền:</h3> <p>63000000</p>
            </div>
          </div>
        </div>
        <div className="PaymentOrderDeliveryType mt-3">
          <h3 className="mb-3">Chọn hình thức thanh toán</h3>
          <div className="DeliveryType row w-100">
            <div className="DeliveryTypeItem col  col-md-6">
              <p>Thanh toán tiền mặt khi nhận hàng</p>
              <FontAwesomeIcon className="DeliveryIcon" icon={faHomeUser} />
            </div>
            <div className="DeliveryTypeItem col  col-md-6">
              <p>CHuyển khoản Ngân hàng</p>
              <FontAwesomeIcon
                className="DeliveryIcon"
                icon={faMoneyBillTransfer}
              />
            </div>
            <div className="DeliveryTypeItem col  col-md-6">
              <p>Ví momo</p>
              <FontAwesomeIcon className="DeliveryIcon" icon={faM} />
            </div>
            <div className="DeliveryTypeItem col  col-md-6">
              <p>Paypal</p>
              <FontAwesomeIcon className="DeliveryIcon" icon={faPaypal} />
            </div>
          </div>
        </div>
        <div className="CartActionPayment">
          <div className="ButtonBuy ButtonNext">Tiến Tục</div>
          <div className="ButtonBuy ButtonContinue">
            Chọn Thêm Sản Phẩm Khác
          </div>
        </div>
      </div>
    </Payment>
  )
}
