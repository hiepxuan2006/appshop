/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { ImageSlideThumb } from "./ImageSlideThumb"
import { formattedNumber } from "~/helper/formatCurentcy"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import { getProduct } from "~/services/productService"
import queryString from "query-string"
import _ from "lodash"
import { getLocalData, setLocalData } from "~/services/StoreageServices"
import { toast } from "react-toastify"

export const ProductDetail = () => {
  const { slug } = useParams()
  const [product, setProduct] = useState({})
  const [attributesChose, setAttributesChose] = useState({})
  const [variantChose, setVariantChose] = useState("")
  const [isChoseAttribute, setIsChoseAttribute] = useState(false)

  const url = window.location.href
  const pathParts = url.split("/")
  const lastPart = pathParts[pathParts.length - 1]
  const idParts = lastPart.split("?id=")
  const id = idParts[idParts.length - 1]
  const _getProductBySlugId = async () => {
    const params = queryString.stringify(
      { slug, id },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    )
    const { data, success, message } = await getProduct(params)
    if (!success) throw new Error(message)
    setProduct(data)
  }
  useEffect(() => {
    _getProductBySlugId()
  }, [])
  const handleChoseAttributes = (att = {}, item) => {
    setAttributesChose({ ...attributesChose, [item._id]: att })
    setIsChoseAttribute(false)
  }
  useEffect(() => {
    const test = Object.values(attributesChose)
      .map((item) => item.slug)
      .join("/")
    const variant =
      product.variants &&
      product.variants.length &&
      product.variants.filter((item) => {
        const option = _.get(item, "options")
        const slug = option.map((item) => item.slug).join("/")
        return test === slug
      })
    if (variant) setVariantChose(variant[0])
  }, [attributesChose])
  const handleAddToCart = () => {
    if (!variantChose) setIsChoseAttribute(true)
    else {
      const itemProduct = Object.assign({}, product, {
        variants: variantChose,
        link: window.location.pathname + "?id=" + id,
      })
      const cart = getLocalData("cart-product-list")
      if (!cart) {
        itemProduct.quantity = 1
        const dataCart = {
          data: { totalQuantity: 1, productList: [itemProduct] },
          __expires: Date.now() + 86400000,
        }
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
  return (
    <>
      {Object.keys(product).length !== 0 && (
        <div className="ProductDetailPage">
          <div className="ProductDetailTitle">
            {variantChose ? (
              <h1>{variantChose.title}</h1>
            ) : (
              <h1>{product.title}</h1>
            )}
          </div>
          <div className="ProductDetailInfo container">
            <div className="row flex-nowrap ProductDetailInfoBody gap-3">
              <div className="col col-md-4">
                <ImageSlideThumb product={product} />
              </div>
              <div className="col ProductDetailContent col-md-5">
                <div className="PriceProductDetail d-flex gap-3 justify-content-between">
                  <h1>
                    {variantChose
                      ? formattedNumber(variantChose.retail_price)
                      : formattedNumber(product.retail_price)}
                  </h1>
                  <h1 className="text-decoration-line-through">
                    {formattedNumber(16000000)}
                  </h1>
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
        </div>
      )}
    </>
  )
}
