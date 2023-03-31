/* eslint-disable react-hooks/exhaustive-deps */
import {
  faArrowDownShortWide,
  faArrowUpShortWide,
  faPercent,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { ProductItemHome } from "./ProductItemHome"
import { getCategoriesById } from "~/services/categoryService"
import { SliderHotSale } from "~/components/bannerSale/SliderHotSale"
import { getProductsByCategory } from "~/services/productService"
import queryString from "query-string"
import { ScrollToTopOnMount } from "~/components/ScrollToTopOnMount"

export const ProductHomePage = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [sort_by, setSort_by] = useState("")
  const [order, setOrder] = useState("")
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState(0)
  const queryParams = new URLSearchParams(location.search)

  const sort = queryParams.get("id")
  const _getCategoriesById = async () => {
    const { data, success, message } = await getCategoriesById(sort)
    if (!success) throw new Error(message)
    setCategories(data)
  }

  const _getProductById = async () => {
    const query = { id: sort, sort_by, order }
    setLoading(true)
    setProducts([])
    const params = queryString.stringify(query, {
      skipNull: true,
      skipEmptyString: true,
    })
    const { data, success, message } = await getProductsByCategory(params)
    setLoading(false)
    if (!success) throw new Error(message)
    setProducts(data.data)
    setPages(data.pages)
  }
  useEffect(() => {
    _getCategoriesById()
  }, [sort])

  useEffect(() => {
    _getProductById()
  }, [sort_by, sort, order])

  return (
    <div className="ProductHomePage">
      {/* <div className="row"> */}
      <ScrollToTopOnMount />
      {categories.length > 0 &&
        categories.slice(0, 2).map((category, key) => {
          return (
            <div
              key={key}
              className=" col col-md-6 d-flex flex-column gap-3 mb-5"
            >
              <h2>{category.label}</h2>
              <div className="BrandProductHome ">
                {category.children &&
                  category.children.map((value, key) => {
                    return (
                      <Link
                        key={key}
                        to={`/san-pham/danh-muc/${value.slug}?id=${value._id}`}
                        className="BrandProductItemHome"
                      >
                        <p>{value.label}</p>
                      </Link>
                    )
                  })}
              </div>
            </div>
          )
        })}
      {/* </div> */}

      {categories.length > 0 && <SliderHotSale products={products} />}
      <div className="FilterProduct">
        <h3>Sắp Xếp Theo</h3>
        <div className="FilterList">
          <div
            className={`FilterItem ${order === "desc" ? "active" : ""}`}
            onClick={() => {
              setOrder("desc")
              setSort_by("retail_price")
            }}
          >
            <FontAwesomeIcon icon={faArrowDownShortWide} />
            <p>Giá từ cao - thấp</p>
          </div>
          <div
            className={`FilterItem ${order === "asc" ? "active" : ""}`}
            onClick={() => {
              setOrder("asc")
              setSort_by("retail_price")
            }}
          >
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
        {products.length > 0 &&
          products.map((item, key) => {
            return (
              <div key={key} className="col-lg-2 ProductItemHome mt-3">
                <ProductItemHome product={item} />
              </div>
            )
          })}
      </div>
      {pages > 1 && (
        <div className="MoreListProduct">
          <div className="ButtonMore">
            <p>Xem thêm Sản phẩm</p>
          </div>
        </div>
      )}
    </div>
  )
}
