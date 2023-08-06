/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
const logo = require("~/assets/Shipper.png")
export const Footer = () => {
  return (
    <footer className="new_footer_area bg_color">
      <div className="d-flex flex-column align-items-center">
        <div className="FooterBody">
          <div className="dk-footer-box-info">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="footer_logo" className="img-fluid" />
            </Link>
            <div className="footer-social-link">
              <h3>Follow us</h3>
              <ul>
                <li>
                  <a
                    className="fa fa-facebook"
                    href="https://facebook.com/imhx.206"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li>
                  <a className="fa fa-twitter" href="#">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a
                    className="fa fa-google-plus"
                    href="https://github.com/hiepxuan2006"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </li>
                <li>
                  <a className="fa fa-linkedin" href="#">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
                <li>
                  <a className="fa fa-instagram" href="#">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form className="contact-form mt-3">
            <h3>CONTACT ME</h3>
            <div className="row">
              <div className="FormInput col col-md-6">
                <input type="text" placeholder=" " />
                <label htmlFor="">Họ và tên</label>
              </div>
              <div className="FormInput col col-md-6">
                <input type="text" placeholder=" " />
                <label htmlFor="">Địa chỉ email</label>
              </div>
            </div>
            <div className="d-flex gap-1">
              <div className="controls mt-3 flex-grow-1">
                <textarea
                  id="contact-message"
                  name="comments"
                  placeholder="Your message"
                  className="form-control requiredField"
                  data-new-placeholder=" ... "
                  rows={4}
                  defaultValue={""}
                />
                <i className="fa fa-comment" />
              </div>
              <div className="d-flex align-items-center">
                <div className=" mt-3 ButtonContact flex-shrink-1">
                  Gửi tin nhắn
                </div>
              </div>
            </div>
          </form>
        </div>
        <p className="copyright-text w-100 text-center">
          Copyright &copy; 2017 All Rights Reserved by hiepxuan2006
        </p>
      </div>
      <div className="footer_bg">
        <div className="footer_bg_one"></div>
        <div className="footer_bg_two"></div>
      </div>
    </footer>
  )
}
