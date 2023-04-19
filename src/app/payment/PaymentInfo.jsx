/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-access-key */
import { faPaypal } from "@fortawesome/free-brands-svg-icons"
import {
  faHomeUser,
  faM,
  faMinus,
  faMoneyBillTransfer,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Loading } from "~/helper/Loading"
import { formattedNumber } from "~/helper/formatCurentcy"
import { toastAlert } from "~/helper/toast"
import { getLocalData, setLocalData } from "~/services/StoreageServices"
import { createOrder } from "~/services/orderService"
import { AddressLocation } from "./AddressLocation"
import { Payment } from "./Payment"
export const PaymentInfo = () => {
  const [cart, setCart] = useState([])
  const [cartLocal, setCartLocal] = useState("")
  const [isUpdateCart, setIsUpdateCart] = useState(false)
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState("")
  const [address, setAddress] = useState("")
  const [deliveryType, setDeliveyType] = useState("")
  const [pay, setPay] = useState("")

  const genderRef = useRef()

  const deliveryTypeRef = useRef()

  const [data, setData] = useState({
    name: "",
    phone: "",
    note: "",
  })
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { name, phone, note } = data
  useEffect(() => {
    const cartLocal = getLocalData("cart-product-list")
    if (cartLocal?.data?.productList.length === 0) navigate("/cart")
    setCart(cartLocal?.data?.productList)
    setCartLocal(cartLocal)
    setIsUpdateCart(false)
  }, [isUpdateCart])

  const totalPrice =
    cart.length &&
    cart.reduce(
      (acc, cur) =>
        acc +
        (cur.variants.retail_price -
          (cur.variants.sale * cur.variants.retail_price) / 100) *
          cur.quantity,
      0
    )
  const handleRemoveItemCart = (value) => {
    setLoading(true)
    const { data } = cartLocal
    let { totalQuantity, productList } = data
    productList = productList.filter(
      (item) =>
        item._id !== value._id ||
        (item._id === value._id && item.variants._id !== value.variants._id)
    )
    const dataCart = {
      data: {
        totalQuantity: totalQuantity >= 1 ? totalQuantity - 1 : 0,
        productList,
      },
      __expires: Date.now() + 86400000,
    }
    setLocalData("cart-product-list", dataCart)
    setIsUpdateCart(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const changeQuantity = (value, type) => {
    setLoading(true)
    const { data } = cartLocal
    let { totalQuantity, productList } = data

    productList = productList.map((item) => {
      if (item._id === value._id && item.variants._id === value.variants._id) {
        switch (type) {
          case "minus":
            item.quantity = item.quantity > 1 ? item.quantity - 1 : 1
            if (item.quantity === 1) {
              toast.warn("Đạt số lượng tối thiểu!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
              })
            }
            break
          case "plus":
            item.quantity += 1
            break

          default:
            break
        }
      }
      return item
    })
    const dataCart = {
      data: {
        totalQuantity,
        productList,
      },
      __expires: Date.now() + 86400000,
    }
    setLocalData("cart-product-list", dataCart)
    setIsUpdateCart(true)
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }

  const handleChangeGender = (e) => {
    setGender(e.currentTarget.value)
  }

  const handleChangeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleChangeDeliveryType = (e) => {
    setDeliveyType(e.target.value)
  }

  const handleClickPay = (e) => {
    const value = e.target.accessKey
    if (value === "paypal" || value === "banking" || value === "momo") {
      toastAlert("warn", "Hệ Thống đang phát triển")
      setPay("")
    } else {
      setPay(value)
    }
  }
  const handleClick = async () => {
    setLoading(true)
    const newOrder = {
      name,
      gender,
      phone,
      deliveryType,
      note,
      totalPrice,
      product: cartLocal?.data?.productList,
      address,
      pay,
    }
    const err = {}

    if (!gender) {
      err.gender = "Vui lòng chọn danh xưng"
    }
    if (!name) {
      err.name = "Vui lòng nhập tên"
    }
    if (!phone || phone.length !== 10) {
      err.phone = "Vui lòng nhập đúng số điện thoại"
    }
    if (!deliveryType) {
      err.deliveryType = "Vui lòng chọn"
    }
    if (!address.city) {
      err.city = "Vui lòng chọn tỉnh thành"
    }
    if (!address.district) {
      err.district = "Vui lòng chọn quận huyện "
    }
    if (!address.ward) {
      err.ward = "Vui lòng chọn phường xã "
    }
    if (!address.location) {
      err.location = "Vui lòng nhập địa chỉ "
    }
    if (!pay) {
      err.pay = "Vui lòng chọn kiểu thanh toán"
    }
    setError(err)
    if (Object.values(err).length !== 0) {
      setLoading(false)
      genderRef.current.scrollIntoView({ behavior: "smooth" })
      return
    }
    const { data, success, message } = await createOrder(newOrder)
    if (!success) {
      setLoading(false)

      toastAlert("error", message)
      return
    }
    const dataCart = {
      data: {
        totalQuantity: 0,
        productList: [],
      },
      __expires: Date.now() + 86400000,
    }
    setLocalData("cart-product-list", dataCart)
    setLoading(false)

    toastAlert("success", "Đặt hàng thành công")
    navigate("/cart")
  }
  return (
    <Payment>
      <Loading show={loading} />
      <div className="PaymentInfoPage">
        <div className="CartBody" ref={genderRef}>
          {cart.map((item, key) => {
            return (
              <div className="CartBodyItem d-flex align-items-start">
                <div
                  className="DeleteProductCart"
                  onClick={() => handleRemoveItemCart(item)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
                <div className="ImageItemCart">
                  <img src={item.images[0]} alt="" />
                </div>
                <div className="InfoProductCartItem">
                  <Link to={item.link} className="NamProductCart">
                    <h4>{item.variants.title}</h4>
                  </Link>
                  <div className="DiscountSale">Giảm 20%</div>
                </div>
                <div className="CartAction">
                  <div className="PriceProductCart ">
                    <p className="PriceRetailProduct">
                      {item.variants.sale !== 0
                        ? formattedNumber(
                            item.variants.retail_price -
                              (item.variants.sale *
                                item.variants.retail_price) /
                                100
                          )
                        : formattedNumber(item.variants.retail_price)}
                    </p>
                    <p className="PriceProductCartNoSale">
                      {formattedNumber(item.variants.retail_price)}
                    </p>
                  </div>
                  <div className="QuantityCart">
                    <FontAwesomeIcon
                      className="IconQuanTity"
                      icon={faMinus}
                      onClick={() => changeQuantity(item, "minus")}
                    />

                    <p>{item.quantity}</p>
                    <FontAwesomeIcon
                      className="IconQuanTity"
                      icon={faPlus}
                      onClick={() => changeQuantity(item, "plus")}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="CountPrice">
          <h3>Tổng tiền tạm tính</h3>
          <p>{formattedNumber(totalPrice)}</p>
        </div>
        <div className="PaymentInfoCustomer">
          <h3>Thông tin khách hàng</h3>
          <div className="DeliveryTick">
            <div className="DeliveryTickItem">
              <input
                type="radio"
                name="genderRadio"
                onChange={handleChangeGender}
                id="male"
                value="male"
              />
              <label htmlFor="male">Anh</label>
            </div>
            <div className="DeliveryTickItem">
              <input
                type="radio"
                name="genderRadio"
                onChange={handleChangeGender}
                id="female"
                value="female"
              />
              <label htmlFor="female">Chị</label>
              {error.gender && <p className="ErrorFail">{error.gender}</p>}
            </div>
          </div>
          <div className="row w-100">
            <div className="form-input FormInput col col-md-6 ">
              <input
                type="text"
                placeholder=" "
                name="name"
                onChange={handleChangeData}
              />
              <label htmlFor="">Họ và tên (bắt buộc)</label>
              {error.name && <p className="ErrorFail">{error.name}</p>}
            </div>
            <div className="form-input FormInput col col-md-6 ">
              <input
                type="number"
                placeholder=" "
                name="phone"
                onChange={handleChangeData}
              />
              <label htmlFor="">Số điện thoại (bắt buộc)</label>
              {error.phone && <p className="ErrorFail">{error.phone}</p>}
            </div>
          </div>
        </div>
        <div className="PaymentInfoDelivery mt-3">
          <h3>Chọn phương thức giao hàng</h3>
          <div className="DeliveryTick" ref={deliveryTypeRef}>
            <div className="DeliveryTickItem">
              <input
                type="radio"
                name="delivery"
                onChange={handleChangeDeliveryType}
                id="address"
                value="Giao hàng tận nơi"
              />
              <label htmlFor="address">Giao hàng tận nơi</label>
            </div>
            <div className="DeliveryTickItem">
              <input
                type="radio"
                name="delivery"
                onChange={handleChangeDeliveryType}
                id="store"
                value="Nhận tại cửa hàng"
              />
              <label htmlFor="store">Nhận tại cửa hàng</label>
            </div>
            {error.deliveryType && (
              <p className="ErrorFail">{error.deliveryType}</p>
            )}
          </div>
          <AddressLocation setAddress={setAddress} error={error} />
        </div>
        <div className="FormInput">
          <input
            type="text"
            placeholder=" "
            name="note"
            onChange={handleChangeData}
          />
          <label htmlFor="">Yêu cầu khác (không bắt buộc)</label>
        </div>
        <div className="PaymentOrderDeliveryType mt-3">
          <h3 className="mb-3">Chọn hình thức thanh toán</h3>
          <div className="DeliveryType row w-100">
            <div
              accessKey="cod"
              onClick={(e) => handleClickPay(e)}
              className={`DeliveryTypeItem col col-md-3 ${
                pay === "cod" ? "active" : ""
              }`}
            >
              <p>COD</p>
              <FontAwesomeIcon className="DeliveryIcon" icon={faHomeUser} />
            </div>
            <div
              accessKey="banking"
              onClick={(e) => handleClickPay(e)}
              className={`DeliveryTypeItem col  col-md-3 ${
                pay === "banking" ? "active" : ""
              }`}
            >
              <p>Banking</p>
              <FontAwesomeIcon
                className="DeliveryIcon"
                icon={faMoneyBillTransfer}
              />
            </div>
            <div
              accessKey="momo"
              onClick={(e) => handleClickPay(e)}
              className={`DeliveryTypeItem col  col-md-3 ${
                pay === "momo" ? "active" : ""
              }`}
            >
              <p>Momo</p>
              <FontAwesomeIcon className="DeliveryIcon" icon={faM} />
            </div>
            <div
              accessKey="paypal"
              onClick={(e) => handleClickPay(e)}
              className={`DeliveryTypeItem col col-md-3 ${
                pay === "paypal" ? "active" : ""
              }`}
            >
              <p>Paypal</p>
              <FontAwesomeIcon className="DeliveryIcon" icon={faPaypal} />
            </div>
          </div>
          {error.pay && <p className="ErrorFail mt-3 w-100">{error.pay}</p>}
        </div>
        <div className="CartActionPayment">
          <div className="ButtonBuy ButtonNext" onClick={() => handleClick()}>
            Đặt hàng
          </div>
          <Link to="/" className="ButtonBuy ButtonContinue">
            Chọn Thêm Sản Phẩm Khác
          </Link>
        </div>
      </div>
    </Payment>
  )
}
