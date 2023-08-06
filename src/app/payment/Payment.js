import {
  faAddressCard,
  faBoxOpen,
  faCartPlus,
  faChevronLeft,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DocTitle } from "~/helper/DocTitle"

export const Payment = ({ children }) => {
  return (
    <div className="PaymentPage">
      <DocTitle title={"Tiến hành đặt hàng"} />
      <div className="PaymentHeader">
        <div className="PaymentBack">
          <FontAwesomeIcon icon={faChevronLeft} />
          <p>Trở về</p>
        </div>
        <div className="PaymentTitle">Thông tin đặt hàng</div>
      </div>
      <div className="PaymentBody">
        <div className="PaymentBodyHeading">
          <div className="PaymentHeaderItem PaymentChoseProduct active">
            <FontAwesomeIcon className="PaymentItemIcon " icon={faCartPlus} />
            <p>Chọn sản phẩm</p>
          </div>
          <div className="PaymentHeaderItem PaymentInfo active">
            <FontAwesomeIcon className="PaymentItemIcon" icon={faAddressCard} />
            <p>Thông tin đặt hàng</p>
          </div>
          <div className="PaymentHeaderItem PaymentShell">
            <FontAwesomeIcon className="PaymentItemIcon" icon={faCreditCard} />
            <p>Thanh toán</p>
          </div>
          <div className="PaymentHeaderItem PaymentFinish">
            <FontAwesomeIcon className="PaymentItemIcon" icon={faBoxOpen} />
            <p>Hoàn thành đặt hàng</p>
          </div>
        </div>
        <div className="PaymentBodyContent">{children}</div>
      </div>
    </div>
  )
}
