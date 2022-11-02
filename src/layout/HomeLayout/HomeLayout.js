import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import style from "./HomeLayout.module.scss";
import classNames from "classnames/bind";

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
        <div className={"theme"}>
          {/* <Header /> */}
          <div className={cx("wrapper")}>
            <div className={cx("container")}>{children}</div>
          </div>
          {/* <Footer /> */}
        </div>
      )}
    </Fragment>
  );
};

export default HomeLayout;
