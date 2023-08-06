import { faHeart } from "@fortawesome/free-regular-svg-icons"
import {
  faStar,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import { formattedNumber } from "~/helper/formatCurentcy"

export const SliderProductItem = ({ item = {} }) => {
  return (
    <>
      {Object.values(item).length !== 0 ? (
        <Link to={`/san-pham/${item.slug}`} className="SliderProductItem">
          <div className="ProductItem">
            {item.sale !== 0 ? (
              <div className="ProductDiscount">
                {item.retail_price === item.sale ? (
                  ""
                ) : (
                  <p>
                    Giảm
                    {Math.ceil(
                      ((item.retail_price - item.sale) / item.retail_price) *
                        100
                    )}
                    %
                  </p>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="ImageItemProduct">
              <div className="ImageSliderProductItem mt-3">
                <img src={item.images[0]} alt="" />
              </div>
            </div>
            <div className="InfoProductItem">
              <h3 className="ProductItemName">{item.title}</h3>
              <div className="d-flex justify-content-between gap-2 mt-3">
                <p>{item.retail_price && formattedNumber(item.sale)}</p>
                {item.retail_price !== item.sale && (
                  <p className="text-decoration-line-through">
                    {item.retail_price && formattedNumber(item.retail_price)}
                  </p>
                )}
              </div>
              <div className="d-flex justify-content-start mt-3 RateProduct">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="d-flex justify-content-end mt-3 position-relative">
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: "rgb(252, 30, 70)" }}
                />
                <FontAwesomeIcon icon={faHeartSolid} className="LikeProduct" />
              </div>
            </div>
          </div>
        </Link>
      ) : (
        ""
      )}
    </>
  )
}
