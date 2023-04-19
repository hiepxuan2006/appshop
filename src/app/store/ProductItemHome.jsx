import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import { formattedNumber } from "~/helper/formatCurentcy"

export const ProductItemHome = ({ product }) => {
  return (
    <Link
      to={`/san-pham/${product.slug}?id=${product._id}`}
      className="ProductHomeItem"
    >
      {product.is_Sale && (
        <div className="ProductDiscount">
          <p>{product.sale}</p>
        </div>
      )}
      <div className="ImageProductItem">
        <img src={product.images[0]} alt="" />
      </div>
      <div className="ProductItemInfo">
        <div className="ProductItemTitle">
          <h4>{product.title}</h4>
        </div>
        <div className="ProductItemPrice">
          <p className="PriceAfterSale">
            {formattedNumber(
              product.retail_price - (product.retail_price * product.sale) / 100
            )}
          </p>
          <p className="PriceRetail text-decoration-line-through">
            {formattedNumber(product.retail_price)}
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
    </Link>
  )
}
