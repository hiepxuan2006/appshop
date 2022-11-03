import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import style from "./HomeLayout.module.scss";
import classNames from "classnames/bind";
import Header from "~/app/Header";

const cx = classNames.bind(style);
const HomeLayout = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Fragment>
      {loading ? (
        <div className="loading-page">
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      ) : (
        <div className={cx("wrapper")}>
          <Header />
          <div className={cx("container")}>{children}</div>
          {/* <Footer /> */}
        </div>
      )}
    </Fragment>
  );
};

export default HomeLayout;
