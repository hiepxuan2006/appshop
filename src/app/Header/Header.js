import {
  faBarsStaggered,
  faCartFlatbed,
  faChevronRight,
  faTruckFast,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import { Fragment, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DataContext } from "~/context/AppContext"
import { getLocalData } from "~/services/StoreageServices"
import { getCategories } from "~/services/categoryService"
import style from "./Header.module.scss"
import { Search } from "./Search"
const cx = classNames.bind(style)
const logo = require("~/assets/logo.png")
const Header = ({ isHidden = true }) => {
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
          <p className={cx("quantity")}>{totalCart}</p>
          <p>Giỏ hàng</p>
        </Link>
        {isLogin ? (
          <Fragment>
            <div className={cx("account")} onClick={() => setHideOn(!hideOn)}>
              <FontAwesomeIcon icon={faUserCircle} />
              <p>name</p>
            </div>
            <ul className={`${hideOn ? cx("tooltipAccount") : "d-none"}`}>
              <li>
                <Link to={"/account/homepage"}>Smember</Link>
              </li>
              <li>Đăng xuất</li>
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
                    <Link to={"#"}>
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
                                        to="/cart"
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
