import {
  faCalendarDays,
  faMedal,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Slider } from "~/components/Slider/Slider"
import { HomePageAccount } from "./HomePageAccount"
import { Link } from "react-router-dom"
const logo = require("~/assets/login.png")
const gift = require("~/assets/gift-box(1)1.ad696df.png")
const shipper = require("~/assets/Shipper_CPS 3.1905116.png")
const crown = require("~/assets/crown.d2de999.png")
export const HomeAccount = () => {
  return (
    <HomePageAccount>
      <div className="row HomeAccountTop">
        <div className="col col-md-6">
          <div className="AccountWelcome">
            <div className="d-flex align-items-center gap-3">
              <div className="AccountImage hideOnMobile ">
                <img src={logo} alt="" />
              </div>
            </div>
            <div className="AccountInfo">
              <div className="AccountInfoItem">
                <p>Ngày tham gia</p>
                <div className="CalendarIcon">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </div>
              </div>
              <div className="AccountInfoItem">
                <p>Hạng thành viên</p>
                <div className="CalendarIcon">
                  <FontAwesomeIcon icon={faMedal} />
                </div>
              </div>
              <div className="AccountInfoItem">
                <p>Điểm tích lũy</p>
                <div className="CalendarIcon">
                  <FontAwesomeIcon icon={faSackDollar} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-md-6">
          <div className="SliderAccount">
            <Slider />
          </div>
        </div>
      </div>
      <div className="row hideOnMobile">
        <div className="col col-md-4">
          <div className="BlockMember_box">
            <div className="BlockMember_gift-icon">
              <img src={gift} alt="" />
            </div>
            <h2>Ưu đãi của bạn</h2>
            <p>0 ưu đãi</p>
            <Link to={"/"}>Xem chi tiết</Link>
          </div>
        </div>
        <div className="col col-md-4">
          <div className="BlockMember_box">
            <div className="BlockMember_gift-icon">
              <img src={shipper} alt="" />
            </div>
            <h2>Đơn hàng của bạn</h2>
            <p>0 đơn hàng</p>
            <Link to={"/"}>Xem chi tiết</Link>
          </div>
        </div>
        <div className="col col-md-4">
          <div className="BlockMember_box">
            <div className="BlockMember_gift-icon">
              <img src={crown} alt="" />
            </div>
            <h2>Hạng thành viên</h2>
            <p>Bạn đang là</p>
            <Link to={"/"}>Xem chi tiết</Link>
          </div>
        </div>
      </div>
    </HomePageAccount>
  )
}
