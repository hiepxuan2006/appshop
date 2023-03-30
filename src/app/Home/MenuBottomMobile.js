import {
  faBars,
  faEllipsis,
  faHome,
  faStore,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { CategoryMobile } from "../CategoryMobile/CategoryMobile"
import { useState } from "react"

export const MenuBottomMobile = ({ showPage, setShowPage, setShow, show }) => {
  const [activeId, setActiveId] = useState("")
  return (
    <>
      <div className="MenuBottom">
        {show && (
          <CategoryMobile
            setActiveId={setActiveId}
            show={show}
            setShow={setShow}
          />
        )}
        <Link
          to={"/"}
          className={`${
            activeId === "home" ? "active" : ""
          } d-flex ButtonBottom  CategoryButton`}
          onClick={() => {
            setActiveId("home")
            setShow(false)
          }}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Trang chủ</span>
        </Link>
        <Link
          onClick={() => {
            setShow(!show)
            setActiveId("category")
          }}
          className={`${
            activeId === "category" ? "active" : ""
          } d-flex ButtonBottom  CategoryButton`}
        >
          <FontAwesomeIcon icon={faBars} />
          <span>Danh mục</span>
        </Link>
        <div
          className={`${
            activeId === "store" ? "active" : ""
          } d-flex ButtonBottom  CategoryButton`}
          onClick={() => {
            setActiveId("store")
            setShow(false)
          }}
        >
          <FontAwesomeIcon icon={faStore} />
          <span>Cửa hàng</span>
        </div>
        <Link
          to={"/account"}
          className={`${
            activeId === "auth" ? "active" : ""
          } d-flex ButtonBottom  CategoryButton`}
          onClick={() => {
            setActiveId("auth")
            setShow(false)
          }}
        >
          <FontAwesomeIcon icon={faUserCircle} />
          <span>Đăng nhập</span>
        </Link>
        <div
          className={` ${
            activeId === "more" ? "active" : ""
          } d-flex ButtonBottom  CategoryButton`}
        >
          <FontAwesomeIcon
            icon={faEllipsis}
            onClick={() => {
              setActiveId("more")
              // setShow(!showPage)
            }}
          />
          <span>Xem thêm</span>
        </div>
      </div>
    </>
  )
}
