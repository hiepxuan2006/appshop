import {
  faBars,
  faEllipsis,
  faHome,
  faStore,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

export const MenuBottomMobile = ({ showPage, setShowPage }) => {
  return (
    <>
      <div className="MenuBottom">
        <NavLink
          to={"/"}
          className="d-flex ButtonBottom  HomeButton"
          onClick={() => setShowPage(false)}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Trang chủ</span>
        </NavLink>
        <div className="d-flex ButtonBottom  CategoryButton">
          <FontAwesomeIcon icon={faBars} />
          <span>Danh mục</span>
        </div>
        <div
          className="d-flex ButtonBottom  CategoryButton"
          onClick={() => setShowPage(false)}
        >
          <FontAwesomeIcon icon={faStore} />
          <span>Cửa hàng</span>
        </div>
        <NavLink
          to={"/account"}
          className="d-flex ButtonBottom  CategoryButton"
          onClick={() => setShowPage(false)}
        >
          <FontAwesomeIcon icon={faUserCircle} />
          <span>Đăng nhập</span>
        </NavLink>
        <div className="d-flex ButtonBottom  CategoryButton">
          <FontAwesomeIcon
            icon={faEllipsis}
            onClick={() => setShowPage(!showPage)}
          />
          <span>Xem thêm</span>
        </div>
      </div>
    </>
  )
}
