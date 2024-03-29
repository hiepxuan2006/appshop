/* eslint-disable no-unused-vars */
import {
  faBarsStaggered,
  faCartFlatbed,
  faChevronRight,
  faTruckFast,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "~/context/AppContext"
import { getLocalData, removeLocalData } from "~/services/StoreageServices"
import { getCategories } from "~/services/categoryService"
import style from "./Header.module.scss"
import { Search } from "./Search"
const cx = classNames.bind(style)
const logo = require("~/assets/logo.png")
const Header = ({ isHidden = true, show = false }) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [hideOn, setHideOn] = useState(false)
  const [totalCart, setTotalCart] = useState(0)
  const { isLogin } = useContext(DataContext)

  const handleCategory = () => {
    setIsOpen(!modalIsOpen)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const { cartTotal, setCartTotal } = useContext(DataContext)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, success } = await getCategories()
      if (success) {
        setCategories(data)
      }
    }
    const cartLocal = getLocalData("cart-product-list")
    setTotalCart(cartLocal?.data?.totalQuantity)
    fetchCategories()
  }, [])

  const [scrollY, setScrollY] = useState(window.scrollY)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const ref = useRef()
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setHideOn(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [ref])
  const handleLogout = () => {
    removeLocalData("access_token")
    removeLocalData("user")
    removeLocalData("roles")
    removeLocalData("is_admin")
    window.location.href = "/"
  }
  const isLocationHome = window.location.pathname === "/"
  return (
    <div className={`${cx("wrapper")}  ${scrollY > 0 ? cx("zIndex") : ""}`}>
      <div className={`${cx("inner")}`}>
        <Link to="/" style={{ height: "100%" }}>
          <div className={cx("logo")}>
            <img src={logo} alt="" />
          </div>
        </Link>
        <div className={cx("danh-muc")} onClick={handleCategory}>
          <FontAwesomeIcon icon={faBarsStaggered} />
          <p>Danh mục</p>
        </div>
        <Search
          show={show}
          isHidden={isHidden}
          scrollY={scrollY}
          isLocationHome={isLocationHome}
        />
        <Link to={"/tra-cuu-don-hang"} className={cx("dilivery-tracking")}>
          <FontAwesomeIcon icon={faTruckFast} />
          <p>Tra cứu đơn hàng</p>
        </Link>
        <Link to="/cart" className={cx("cart")}>
          <FontAwesomeIcon className={cx("icon-cart")} icon={faCartFlatbed} />
          <p className={cx("quantity")}>{cartTotal}</p>
          <p className={cx("title")}>Giỏ hàng</p>
        </Link>
        {isLogin ? (
          <Fragment>
            <div
              ref={ref}
              className={cx("account")}
              onClick={() => setHideOn(!hideOn)}
            >
              <FontAwesomeIcon icon={faUserCircle} />
              <p>name</p>
            </div>
            <ul className={`${hideOn ? cx("tooltipAccount") : "d-none"}`}>
              <li>
                <Link onClick={() => setHideOn(false)} to={"/account/homepage"}>
                  Smember
                </Link>
              </li>
              <li onClick={() => handleLogout()}>Đăng xuất</li>
            </ul>
          </Fragment>
        ) : (
          <Link to={"/account"} className={cx("account")}>
            <FontAwesomeIcon icon={faUserCircle} />
            <p>Đăng nhập</p>
          </Link>
        )}
      </div>
      {isLocationHome && isHidden ? (
        <div
          className={`${cx("clear")}  ${scrollY > 0 ? cx("innerSticky") : ""}`}
        ></div>
      ) : (
        ""
      )}
      <div
        onClick={handleCategory}
        onRequestClose={handleCloseModal}
        className={`${cx("modal")} ${modalIsOpen ? cx("hideOnModal") : ""}`}
      >
        <div className={cx("inner-modal")}>
          <ul className={cx("list-category")}>
            {categories.length &&
              categories.map((item, key) => {
                return (
                  <li key={key}>
                    <Link to={`/san-pham/danh-muc/${item.slug}?id=${item._id}`}>
                      <p>{item.name}</p>
                      <FontAwesomeIcon icon={faChevronRight} />

                      <div className={cx("category-child")}>
                        {item.children.length &&
                          item.children.map((item, key) => {
                            return (
                              <div
                                key={key}
                                className={cx("heading-category-children")}
                              >
                                {item.name}

                                {item.children.length &&
                                  item.children.map((item, key) => {
                                    return (
                                      <Link
                                        key={key}
                                        to={`/san-pham/danh-muc/${item.slug}?id=${item._id}`}
                                        className={cx("item")}
                                      >
                                        <p> {item.name}</p>
                                      </Link>
                                    )
                                  })}
                              </div>
                            )
                          })}
                      </div>
                    </Link>
                  </li>
                )
              })}
            <li>
              <Link to={"/hx-blog"} className="d-flex">
                <p>Tin công nghệ</p>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
