import React, { useEffect, useState } from "react"
import { Payment } from "./Payment"
import { AddressLocation } from "./AddressLocation"
import { formattedNumber } from "~/helper/formatCurentcy"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getLocalData, setLocalData } from "~/services/StoreageServices"
import { Loading } from "~/helper/Loading"
import { Link } from "react-router-dom"
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
export const PaymentInfo = () => {
  const [cart, setCart] = useState([])
  const [cartLocal, setCartLocal] = useState("")
  const [isUpdateCart, setIsUpdateCart] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cartLocal = getLocalData("cart-product-list")

    setCart(cartLocal?.data?.productList)
    setCartLocal(cartLocal)
    setIsUpdateCart(false)
  }, [isUpdateCart])

  const totalPrice =
    cart.length &&
    cart.reduce((acc, cur) => acc + cur.variants.retail_price * cur.quantity, 0)
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
  return (
    <Payment>
      <div className="PaymentInfoPage">
        {loading && <Loading show={loading} />}
        <div className="CartBody">
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
                  <img
                    src="https://image.cellphones.com.vn/200x/media/catalog/product/x/_/x_m_25.png"
                    alt=""
                  />
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
                      {formattedNumber(item.variants.retail_price)}
                    </p>
                    <p className="PriceProductCartNoSale">
                      {formattedNumber(34990000)}
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
              <input type="radio" name="genderRadio" id="male" />
              <label htmlFor="male">Anh</label>
            </div>
            <div className="DeliveryTickItem">
              <input type="radio" name="genderRadio" id="female" />
              <label htmlFor="female">Chị</label>
            </div>
          </div>
          <div className="row w-100">
            <div className="form-input FormInput col col-md-6 ">
              <input type="text" placeholder=" " />
              <label htmlFor="">Họ và tên (bắt buộc)</label>
            </div>
            <div className="form-input FormInput col col-md-6 ">
              <input type="text" placeholder=" " />
              <label htmlFor="">Số điện thoại (bắt buộc)</label>
            </div>
          </div>
        </div>
        <div className="PaymentInfoDelivery mt-3">
          <h3>Chọn phương thức giao hàng</h3>
          <div className="DeliveryTick">
            <div className="DeliveryTickItem">
              <input type="radio" name="delivery" id="address" />
              <label htmlFor="address">Giao hàng tận nơi</label>
            </div>
            <div className="DeliveryTickItem">
              <input type="radio" name="delivery" id="store" />
              <label htmlFor="store">Nhận tại cửa hàng</label>
            </div>
          </div>
          <AddressLocation />
        </div>
        <div className="FormInput">
          <input type="text" placeholder=" " />
          <label htmlFor="">Yêu cầu khác (không bắt buộc)</label>
        </div>
        <div className="CartActionPayment">
          <div className="ButtonBuy ButtonNext">Tiến Tục</div>
          <Link to="/" className="ButtonBuy ButtonContinue">
            Chọn Thêm Sản Phẩm Khác
          </Link>
        </div>
      </div>
    </Payment>
  )
}
