import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartArrowDown,
  faClose,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(style);
const logo = require("~/assets/logo.jpg");

const Header = () => {
  const [hideBarsMobile, setHideBarsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const handleHideBars = () => {
    setHideBarsMobile(!hideBarsMobile);
  };
  useEffect(() => {
    const handleScrollY = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScrollY);
  }, [scrollY]);
  console.log(scrollY);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("top")}>
          <div className={cx("logo")}>
            <img src={logo} alt="" />
          </div>
          <div className={cx("center")}>
            <div className={cx("search")}>
              <input type="text" />
              <div className={cx("icon")}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
          </div>
          <div className={cx("action")}>
            <div className={cx("cart")}>
              <FontAwesomeIcon icon={faCartArrowDown} />
              <div className={cx("quantity-cart")}>
                <p>3</p>
              </div>
            </div>
            <div className={cx("user")}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div
              for="checked_bars"
              onClick={() => handleHideBars()}
              className={cx("menu")}
            >
              {hideBarsMobile ? (
                <FontAwesomeIcon icon={faClose} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </div>
          </div>
        </div>
        <div
          className={`${
            hideBarsMobile ? cx("bot", "on-show") : cx("bot", "hidden")
          }`}
        >
          <ul className={cx("list-category")}>
            <li className={cx("item-category")}>home</li>
            <li className={cx("item-category")}>home</li>
            <li className={cx("item-category")}>home</li>
            <li className={cx("item-category")}>home</li>
            <li className={cx("item-category")}>home</li>
            <li className={cx("item-category")}>home</li>
            <li className={cx("item-category")}>home</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
