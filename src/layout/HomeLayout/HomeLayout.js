import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import { Fragment, useState } from "react"
import Header from "~/app/Header"
import { Footer } from "~/components/footer/Footer"
import style from "./HomeLayout.module.scss"

const cx = classNames.bind(style)
const HomeLayout = ({ children }) => {
  const [loading, setLoading] = useState(false)

  return (
    <Fragment>
      {loading ? (
        <div className="loading-page">
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      ) : (
        <div className={cx("wrapper")}>
          <Header />
          <div className={`${cx("container")} mb-5`}>{children}</div>
          <Footer />
        </div>
      )}
    </Fragment>
  )
}

export default HomeLayout
