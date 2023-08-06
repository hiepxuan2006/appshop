/* eslint-disable react-hooks/exhaustive-deps */
import { faCartPlus, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import _ from "lodash"
import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Loading } from "~/components/Loading"
import { DataContext } from "~/context/AppContext"
import { DocTitle } from "~/helper/DocTitle"
import { formattedNumber } from "~/helper/formatCurentcy"
import { setRecentlyViewedProducts } from "~/helper/recentlyViewedProduct"
import { getLocalData, setLocalData } from "~/services/StoreageServices"
import { getProductBySlug } from "~/services/productService"
import { SliderProduct } from "../Home/SliderProduct"
import { ImageSlideThumb } from "./ImageSlideThumb"
import { ScrollToTopOnMount } from "~/components/ScrollToTopOnMount"
export const ProductDetail = () => {
  const { slug } = useParams()
  const [product, setProduct] = useState("")
  const [attributesChose, setAttributesChose] = useState({})
  const [variantChose, setVariantChose] = useState("")
  const [isChoseAttribute, setIsChoseAttribute] = useState(false)
  const [more, setMore] = useState(false)
  const [loading, setLoading] = React.useState(false)
  const [productRelation, setProductRelation] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const { setCartTotal } = useContext(DataContext)
  const [speBasic, setSpeBasic] = useState([])
  const { visible, setVisible } = useContext(DataContext)

  const _getProductBySlugId = async () => {
    setLoading(true)
    const params = { slug }
    const { data, success, message } = await getProductBySlug(params)
    setLoading(false)
    if (!success) throw new Error(message)
    const { relation } = data

    setProductRelation(_.sortBy([data, ...relation], "product_class"))
    setProduct(data)
    setRecentlyViewed(setRecentlyViewedProducts(data))
  }
  useEffect(() => {
    _getProductBySlugId()
  }, [slug])
  useEffect(() => {
    setVisible(false)
  }, [])
  const handleChoseAttributes = (att = {}, item) => {
    setAttributesChose({ [item._id]: att })
    setIsChoseAttribute(false)
  }
  useEffect(() => {
    const test = Object.values(attributesChose)
      .map((item) => item.slug)
      .sort()
      .join("/")

    const variant =
      product.variants &&
      product.variants.length &&
      product.variants.filter((item) => {
        const option = _.get(item, "options")
        const slug = option
          .map((item) => item.slug)
          .sort()
          .join("/")
        return test === slug
      })
    console.log("======", attributesChose)
    if (variant) setVariantChose(variant[0])
  }, [attributesChose, slug])
  console.log(variantChose)
  const handleAddToCart = () => {
    if (!variantChose) setIsChoseAttribute(true)
    else {
      const itemProduct = Object.assign({}, product, {
        variants: variantChose,
        link: window.location.pathname,
      })
      const cart = getLocalData("cart-product-list")
      if (!cart) {
        itemProduct.quantity = 1
        const dataCart = {
          data: { totalQuantity: 1, productList: [itemProduct] },
          __expires: Date.now() + 86400000,
        }
        setCartTotal(dataCart.data.totalQuantity)
        setLocalData("cart-product-list", dataCart)
        toast.success("Thêm vào giỏ hàng thành công!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      } else {
        const { data, __expires } = cart
        let { totalQuantity, productList = [] } = data
        const newProductList =
          productList.length &&
          productList.filter(
            (item) =>
              item._id === itemProduct._id &&
              item.variants._id === itemProduct.variants._id
          )
        if (newProductList.length) {
          productList = productList.map((item) => {
            if (
              item._id === itemProduct._id &&
              item.variants._id === itemProduct.variants._id
            )
              item.quantity += 1
            return item
          })
        } else {
          itemProduct.quantity = 1
          productList.push(itemProduct)
        }
        const dataCart = {
          data: {
            totalQuantity: totalQuantity + 1,
            productList,
          },
          __expires: Date.now() + 86400000,
        }
        setCartTotal(dataCart.data.totalQuantity)

        setLocalData("cart-product-list", dataCart)

        toast.success("Thêm vào giỏ hàng thành công!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }
    }
  }

  const handleReadMore = () => {
    setMore(true)
  }
  useEffect(() => {
    if (!!product && !!product.specification) {
      const data = product.specification.map((item) => item.value[0])

      setSpeBasic(data)
    } else {
      setSpeBasic([])
    }
  }, [slug, product])
  return (
    <>
      {product && Object.keys(product).length !== 0 ? (
        <div className="ProductDetailPage">
          {loading && <Loading />}
          <DocTitle title={product.title} />
          <ScrollToTopOnMount />

          <div className="ProductDetailTitle">
            {variantChose ? <p>{product.title}</p> : <p>{product.title}</p>}
          </div>
          <div className="ProductDetailInfo container">
            <div className="row flex-nowrap ProductDetailInfoBody ">
              <div className="col-sm-7 ">
                <ImageSlideThumb product={product} />
              </div>
              <div className=" ProductDetailContent col-sm-5">
                <div className="ProductRelation  row m-0">
                  {productRelation.length > 0 &&
                    productRelation.map((item, key) => {
                      return (
                        <Link
                          to={`/san-pham/${item.slug}`}
                          className={`ProductRelationItem col col-md-4 ${
                            item._id === product._id
                              ? "ProductRelationChose"
                              : ""
                          }`}
                          key={key}
                        >
                          {item._id === product._id && (
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-white IconCheckProduct"
                            />
                          )}
                          <div className="d-flex gap-3">
                            <p
                              className="ProductRelationTag"
                              key={key}
                              dangerouslySetInnerHTML={{
                                __html: item.product_class,
                              }}
                            ></p>
                          </div>
                          <div className="">
                            {formattedNumber(product.sale)}
                          </div>
                        </Link>
                      )
                    })}
                </div>
                <div className="AttributeProduct mt-3">
                  {product.attributes.length &&
                    product.attributes.map((item, key) => {
                      return (
                        <div className="AttributeProductItem">
                          <h2 className="mb-4">{item.name} :</h2>
                          <ul className="row valueAttribute mb-4">
                            {item.values.map((value, key) => {
                              return (
                                <li
                                  className={`valueAttributeItem col col-md-4 ${
                                    attributesChose[item._id] &&
                                    attributesChose[item._id].position ===
                                      value.position
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleChoseAttributes(value, item)
                                  }
                                >
                                  <div className="d-flex gap-1">
                                    <p>{value.name}</p>
                                    {item.type === "color" && (
                                      <p
                                        className="StyleColor"
                                        style={{
                                          backgroundColor: `${value.value}`,
                                        }}
                                      ></p>
                                    )}
                                  </div>
                                  <div className="PriceVariant">
                                    {product.sale === "0"
                                      ? formattedNumber(product.retail_price)
                                      : formattedNumber(product.sale)}
                                  </div>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      )
                    })}
                  <p
                    className={`mt-3 mb-3 text-danger ${
                      isChoseAttribute ? "" : "d-none"
                    }`}
                  >
                    Vui Lòng chọn phân loại hàng
                  </p>
                </div>
                <div className="ActionBuyProduct">
                  <div className="BuyNow text-center">
                    <p>Mua Ngay</p>
                    <span className="fw-lighter">
                      (Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)
                    </span>
                  </div>
                  <div className="AddTocart" onClick={() => handleAddToCart()}>
                    <FontAwesomeIcon icon={faCartPlus} />
                    <span>Thêm vào giỏ</span>
                  </div>
                </div>
                <div className="ActionAmortization">
                  <div className="ActionAmortizationItem">
                    <p>Trả góp 0%</p>
                    <span>Xét duyệt qua điện thoại</span>
                  </div>
                  <div className="ActionAmortizationItem">
                    <p>Trả góp qua thẻ</p>
                    <span>Visa , Master Card , JCB </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {recentlyViewed.length > 0 && (
            <div className="recentlyViewedProducts">
              <h>Sản phẩm vừa xem</h>
              <SliderProduct data={recentlyViewed} />
            </div>
          )}
          <div className="DescriptionProduct row me-2 ms-2">
            <div
              className={` col-lg-8 col-md-8 col-sm-12 ${
                more ? "ProductDescription MW-100" : "ProductDescription"
              }`}
            >
              <div className="SalientFeatures flex-column mt-3 mb-3 d-flex">
                <h1 className="w-100 text-center">Đặc Điểm Nổi Bật</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.salient_features,
                  }}
                ></div>
              </div>
              <div
                className="Description"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
              <div
                className={more ? "d-none" : "ReadMore"}
                onClick={() => handleReadMore()}
              >
                <p>Xem thêm</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-0 ">
              <div className="ProductSpecification">
                <h2 className="text-center">Thông số kỹ thuật</h2>
                {speBasic.length > 0 &&
                  speBasic.map((spe, key) => {
                    return (
                      <div key={key} className="d-flex mt-2">
                        <p className="col col-6">
                          <strong>{spe.label}</strong>
                        </p>
                        <p
                          className="fs-4"
                          dangerouslySetInnerHTML={{ __html: spe.data }}
                        ></p>
                      </div>
                    )
                  })}
                <div className="btn mt-4 fs-4 border text-center d-flex justify-content-center">
                  <p>Xem chi tiết</p>
                </div>
              </div>
            </div>
          </div>
          <div className="EvaluateProduct">
            <h1>Đánh giá và nhận xét về {product.title}</h1>
          </div>
        </div>
      ) : (
        <div className="ProductDetailPage mt-2 ">
          <div className="bg-color-animation ProductDetailTitle "></div>
          <div
            className=" ProductDetailInfo row"
            style={{ height: "420px", gap: "0" }}
          >
            <div className="col col-md-4 bg-color-animation"></div>
            <div className="col col-md-5 bg-color-animation"></div>
            <div className="col col-md-3 bg-color-animation  flex-grow-1"></div>
          </div>
          <div
            className="bg-color-animation DescriptionProduct "
            style={{ height: "200px" }}
          ></div>
        </div>
      )}
    </>
  )
}
