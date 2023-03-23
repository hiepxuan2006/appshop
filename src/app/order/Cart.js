import {
  faChevronLeft,
  faFaceSadTear,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Loading } from "~/helper/Loading"
import { formattedNumber } from "~/helper/formatCurentcy"
import { getLocalData, setLocalData } from "~/services/StoreageServices"

export const Cart = () => {
  const [cart, setCart] = useState([])
  const [cartLocal, setCartLocal] = useState("")
  const [isUpdateCart, setIsUpdateCart] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const cartLocal = getLocalData("cart-product-list")
    console.log(cartLocal?.data?.productList)
    setCart(cartLocal?.data?.productList)
    setCartLocal(cartLocal)
    setIsUpdateCart(false)
  }, [isUpdateCart])
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
    <>
      {cart && cart.length ? (
        <div className="CartHomePage">
          <div className="CartHeading d-flex align-items-center justify-content-between fw-bold">
            <div className="GoBackCart">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className="TitleCart">Giỏ hàng</div>
            <div className="ModalCart"></div>
          </div>
          <div className="CartBody">
            {loading && <Loading show={loading} />}
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
                      <p className="PriceProductCartNoSale">
                        {formattedNumber(34990000)}
                      </p>
                      <p className="PriceRetailProduct">
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
          <div className="CartActionBuy">
            <div className="CountPriceTotal">
              <h3>Tổng tiền tạm tính</h3>
              <p>{formattedNumber(56700000)}</p>
            </div>
            <Link to="/payment-info" className="ButtonBuyCart ButtonNext">
              Tiến Hành Đặt Hàng
            </Link>
            <div className="ButtonBuyCart ButtonContinue">
              Chọn Thêm Sản Phẩm Khác
            </div>
          </div>
        </div>
      ) : (
        <div className="CartHomePage">
          <div className="CartHeading d-flex align-items-center justify-content-between fw-bold">
            <div className="GoBackCart">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className="TitleCart">Giỏ hàng</div>
            <div className="ModalCart"></div>
          </div>
          <div className="BodyCartEmpty">
            <div className="IconCartEmpty">
              <FontAwesomeIcon icon={faFaceSadTear} />
            </div>
          </div>
          <Link to="/" className="ButtonReturnHome">
            <h3>Quay lại trang chủ</h3>
          </Link>
        </div>
      )}
    </>
  )
}
