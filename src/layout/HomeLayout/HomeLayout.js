import classNames from "classnames/bind"
import { Fragment, useState } from "react"
import Header from "~/app/Header"
import { MenuBottomMobile } from "~/app/Home/MenuBottomMobile"
import { Footer } from "~/components/footer/Footer"
import style from "./HomeLayout.module.scss"
import { ScrollToTopOnMount } from "~/components/ScrollToTopOnMount"

const cx = classNames.bind(style)
const bannerTop1 = require("~/assets/bannerTop/top-banner-chinh-sach-bao-hanh-doi-tra.webp")
const bannerTop2 = require("~/assets/bannerTop/top-banner-chinh-hang-xuat-vat-day-du.webp")
const bannerTop3 = require("~/assets/bannerTop/top-banner-giao-nhanh-mien-phi.webp")
const HomeLayout = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [showPage, setShowPage] = useState(false)
  const [categoryMobile, setCategoryMobile] = useState(false)
  const body = document.body
  if (categoryMobile === true) {
    body.classList.add(`no-scroll`)
  } else {
    body.classList.remove(`no-scroll`)
  }
  return (
    <Fragment>
      <div className={cx("wrapper")}>
        <div className="Top">
          <div className="TopBanner">
            <div className="TopBannerItem">
              <img src={bannerTop1} alt="" />
            </div>
            <div className="TopBannerItem">
              <img src={bannerTop2} alt="" />
            </div>
            <div className="TopBannerItem">
              <img src={bannerTop3} alt="" />
            </div>
          </div>
        </div>
        <Header show={categoryMobile} />
        <div className={`${cx("container")}  mb-5`}>{children}</div>
        <Footer />
      </div>
      <MenuBottomMobile
        show={categoryMobile}
        setShow={setCategoryMobile}
        setShowPage={setShowPage}
        showPage={showPage}
      />
    </Fragment>
  )
}

export default HomeLayout
