import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { formattedNumber } from "~/helper/formatCurentcy"

export const ProductItemHome = ({ product }) => {
  console.log(product)
  return (
    <div className="ProductHomeItem">
      {product.is_Sale && (
        <div className="ProductDiscount">
          <p>{product.sale}</p>
        </div>
      )}
      <div className="ImageProductItem">
        <img
          src={process.env.REACT_APP_BASE_URL + "/" + product.images[0]}
          alt=""
        />
      </div>
      <div className="ProductItemInfo">
        <div className="ProductItemTitle">
          <h4>Iphone 14 pro max chính hãng</h4>
        </div>
        <div className="ProductItemPrice">
          <p className="PriceAfterSale">{formattedNumber(39000000)}</p>
          <p className="PriceRetail text-decoration-line-through">
            {formattedNumber(39000000)}
          </p>
        </div>
        <div className="AddCart">
          <p>Thêm vào giỏ</p>
          <FontAwesomeIcon icon={faCartPlus} />
        </div>
        <div className="ProductLike">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
    </div>
  )
}
