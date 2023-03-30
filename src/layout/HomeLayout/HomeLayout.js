import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import { Fragment, useState } from "react"
import Header from "~/app/Header"
import { Footer } from "~/components/footer/Footer"
import style from "./HomeLayout.module.scss"
import { MenuBottomMobile } from "~/app/Home/MenuBottomMobile"
import { CategoryMobile } from "~/app/CategoryMobile/CategoryMobile"

const cx = classNames.bind(style)
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
      {loading ? (
        <div className="loading-page">
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      ) : (
        <div className={cx("wrapper")}>
          <Header show={categoryMobile} />
          <div className={`${cx("container")}  mb-5`}>{children}</div>
          <Footer />
        </div>
      )}
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
