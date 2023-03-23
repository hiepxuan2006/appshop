import {
  faArrowDownShortWide,
  faArrowUpShortWide,
  faPercent,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import { ProductItemHome } from "./ProductItemHome"

export const ProductHomePage = () => {
  return (
    <div className="ProductHomePage">
      <div className="BrandProductHome">
        <Link to="#" className="BrandProductItemHome">
          <p>Samsung</p>
        </Link>
        <Link to="#" className="BrandProductItemHome">
          <p>Samsung</p>
        </Link>
        <Link to="#" className="BrandProductItemHome">
          <p>Samsung</p>
        </Link>
        <Link to="#" className="BrandProductItemHome">
          <p>Samsung</p>
        </Link>
        <Link to="#" className="BrandProductItemHome">
          <p>Samsung</p>
        </Link>
      </div>

      <div className="FilterCategory">
        <h3>Chọn theo hệ điều hành</h3>
        <div className="BrandProductHome">
          <Link to="#" className="BrandProductItemHome">
            <p>Android</p>
          </Link>
          <Link to="#" className="BrandProductItemHome">
            <p>IOS</p>
          </Link>
        </div>
      </div>
      <div className="FilterProduct">
        <h3>Sắp Xếp Theo</h3>
        <div className="FilterList">
          <div className="FilterItem">
            <FontAwesomeIcon icon={faArrowDownShortWide} />
            <p>Giá từ cao - thấp</p>
          </div>
          <div className="FilterItem">
            <FontAwesomeIcon icon={faArrowUpShortWide} />
            <p>Giá từ thấp - cao</p>
          </div>
          <div className="FilterItem">
            <FontAwesomeIcon icon={faPercent} />
            <p>Khuyến mãi hot</p>
          </div>
        </div>
      </div>
      <div className="ListProductHome row mt-5">
        <div class="col-lg-2 ProductItemHome mt-3">
          <ProductItemHome />
        </div>
        <div class="col-lg-2 ProductItemHome mt-3">
          <ProductItemHome />
        </div>
        <div class="col-lg-2 ProductItemHome mt-3">
          <ProductItemHome />
        </div>
        <div class="col-lg-2 ProductItemHome mt-3">
          <ProductItemHome />
        </div>
        <div class="col-lg-2 ProductItemHome mt-3">
          <ProductItemHome />
        </div>

        <div class="col-lg-2 ProductItemHome mt-3">
          <ProductItemHome />
        </div>

        <div class="col-lg-2 ProductItemHome mt-3">
          <ProductItemHome />
        </div>

        <div class="col-lg-2 ProductItemHome mt-3">
          <ProductItemHome />
        </div>

        <div class="col-lg-2 ProductItemHome mt-3">
          <ProductItemHome />
        </div>
        <div class="col-lg-2 ProductItemHome mt-3">
          <ProductItemHome />
        </div>
      </div>
      <div className="MoreListProduct">
        <div className="ButtonMore">
          <p>Xem thêm Sản phẩm</p>
        </div>
      </div>
    </div>
  )
}
