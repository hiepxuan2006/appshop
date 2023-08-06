import {
  faGift,
  faHistory,
  faHome,
  faMedal,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

export const HomePageAccountLeft = () => {
  return (
    <div className="HomePage-ColLeft">
      <NavLink to={"/account/homepage"} className="HomePage-MenuItem">
        <div className="ItemMenu">
          <div className="">
            <FontAwesomeIcon icon={faHome} />
          </div>
          <p>Trang chủ</p>
        </div>
      </NavLink>
      <NavLink to={"/account/order"} className="HomePage-MenuItem">
        <div className="ItemMenu">
          <div className="">
            <FontAwesomeIcon icon={faHistory} />
          </div>
          <p>Lịch sử mua hàng</p>
        </div>
      </NavLink>
      <NavLink to={"/account/promotion"} className="HomePage-MenuItem">
        <div className="ItemMenu">
          <div className="">
            <FontAwesomeIcon icon={faGift} />
          </div>
          <p>Ưu đãi của bạn</p>
        </div>
      </NavLink>
      <NavLink to={"/account/rank"} className="HomePage-MenuItem hideOnMobile">
        <div className="ItemMenu">
          <div className="">
            <FontAwesomeIcon icon={faMedal} />
          </div>
          <p>Hạng thành viên</p>
        </div>
      </NavLink>
      <NavLink to={"/account/user-info"} className="HomePage-MenuItem">
        <div className="ItemMenu">
          <div className="">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <p>Tài Khoản của bạn</p>
        </div>
      </NavLink>
      <div className="HomePage-MenuItem hideOnMobile">
        <div className="ItemMenu">
          <div className="">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
          <p>Thoát tài khoản</p>
        </div>
      </div>
    </div>
  )
}
