/* eslint-disable react-hooks/exhaustive-deps */
import {
  faCartPlus,
  faCheck,
  faTicket,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import _ from "lodash"
import React, { useContext, useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ScrollToTopOnMount } from "~/components/ScrollToTopOnMount"
import { DataContext } from "~/context/AppContext"
import { DocTitle } from "~/helper/DocTitle"
import { LoadingProcess } from "~/helper/LoadingProcess"
import { formattedNumber } from "~/helper/formatCurentcy"
import { getLocalData, setLocalData } from "~/services/StoreageServices"
import { getProductBySlug } from "~/services/productService"
import { PreviewListPost } from "../blog/PreviewListPost"
import { ImageSlideThumb } from "./ImageSlideThumb"
export const ProductDetail = () => {
  const { slug } = useParams()
  const [product, setProduct] = useState({})
  const [attributesChose, setAttributesChose] = useState({})
  const [variantChose, setVariantChose] = useState("")
  const [isChoseAttribute, setIsChoseAttribute] = useState(false)
  const [more, setMore] = useState(false)
  const [loading, setLoading] = React.useState(false)
  const [productRelation, setProductRelation] = useState([])

  const { setCartTotal } = useContext(DataContext)
  const _getProductBySlugId = async () => {
    setLoading(true)
    const params = { slug }
    const { data, success, message } = await getProductBySlug(params)
    setLoading(false)
    if (!success) throw new Error(message)
    const { relation } = data

    setProductRelation(_.sortBy([data, ...relation], "product_class"))
    setProduct(data)
    productRelation.sort((a, b) =>
      a.product_class.localeCompare(b.product_class)
    )
    // setVariantChose(data?.variants[0])
  }
  console.log(productRelation)
  useEffect(() => {
    _getProductBySlugId()
  }, [slug])
  const handleChoseAttributes = (att = {}, item) => {
    setAttributesChose({ ...attributesChose, [item._id]: att })
    setIsChoseAttribute(false)
  }
  useEffect(() => {
    const test = Object.values(attributesChose)
      .map((item) => item.slug)
      .sort()
      .join("/")
    console.log("1", test)
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
    if (variant) setVariantChose(variant[0])
  }, [attributesChose])
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

  return (
    <>
      <ScrollToTopOnMount />
      {product &&
        Object.keys(product).length !== 0 &&
        (loading ? (
          <LoadingProcess />
        ) : (
          <div className="ProductDetailPage">
            <DocTitle title={product.title} />
            <div className="ProductDetailTitle">
              {variantChose ? (
                <h2>{variantChose.title}</h2>
              ) : (
                <h2>{product.title}</h2>
              )}
            </div>
            <div className="ProductDetailInfo container">
              <div className="row flex-nowrap ProductDetailInfoBody gap-3">
                <div className="col col-md-4">
                  <ImageSlideThumb product={product} />
                </div>
                <div className="col ProductDetailContent col-md-5">
                  <div className="PriceProductDetail d-flex gap-3 ">
                    <h2>
                      {variantChose
                        ? formattedNumber(
                            variantChose.retail_price -
                              (variantChose.retail_price * product.sale) / 100
                          )
                        : formattedNumber(
                            product.retail_price -
                              (product.retail_price * product.sale) / 100
                          )}
                    </h2>
                    <h3 className="text-decoration-line-through">
                      {variantChose
                        ? formattedNumber(variantChose.retail_price)
                        : formattedNumber(product.retail_price)}
                    </h3>
                  </div>
                  <div className="ProductRelation mt-3 d-flex gap-3 ">
                    {productRelation.length > 0 &&
                      productRelation.map((item, key) => {
                        return (
                          <Link
                            to={`/san-pham/${item.slug}`}
                            className="ProductRelationItem d-flex gap-5 "
                          >
                            <p key={key}>{item.product_class}</p>
                            {item._id === product._id && (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-danger"
                              />
                            )}
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
                            <ul className="valueAttribute mb-4">
                              {item.values.map((value, key) => {
                                return (
                                  <li
                                    className={`valueAttributeItem ${
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
                                    <p>{value.name}:</p>
                                    {item.type === "color" && (
                                      <p
                                        className="StyleColor"
                                        style={{
                                          backgroundColor: `${value.value}`,
                                        }}
                                      ></p>
                                    )}
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
                    <div
                      className="AddTocart"
                      onClick={() => handleAddToCart()}
                    >
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
                <div className="col col-md-3 flex-shrink-1">
                  <div className="InfoProduct">
                    <h1>Thông tin sản phẩm</h1>
                    <p>
                      Bảo hành chính hãng 12 tháng tại trung tâm bảo hành ủy
                      quyền, 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ NSX.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="DescriptionProduct row me-2 ms-2">
              <div
                className={
                  more
                    ? "col col-md-8 ProductDescription MW-100"
                    : "col col-md-8 ProductDescription"
                }
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
              <div className="col col-md-4 ProductPreviewListPost">
                <PreviewListPost />
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
