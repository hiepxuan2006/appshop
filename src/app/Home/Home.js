import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ScrollToTopOnMount } from "~/components/ScrollToTopOnMount"
import { SliderBanner } from "~/components/Slider/SliderReact"
import { DocTitle } from "~/helper/DocTitle"
import { LoadingProcess } from "~/helper/LoadingProcess"
import { _getCategory, _getProductGroupCategory } from "~/slice/productSlice"
import { ListCategory } from "./ListCategory"
import { SliderPost } from "./SliderPost"
import { SliderProduct } from "./SliderProduct"
import { _getBannerSlider } from "~/slice/bannerSlice"
export const Home = ({ isOpenPage }) => {
  const { productsGroupCategory, categories, loading } = useSelector(
    (state) => state.product
  )
  const { bannerSlider } = useSelector((state) => state.banner)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_getProductGroupCategory())
    dispatch(_getCategory())
    dispatch(_getBannerSlider({ horizontal: false, category: false }))
  }, [dispatch])

  const body = document.body
  if (loading === true) {
    body.classList.add(`no-scroll`)
  } else {
    body.classList.remove(`no-scroll`)
  }
  return (
    <>
      <ScrollToTopOnMount />

      {loading ? (
        <LoadingProcess />
      ) : (
        <div className="HomePageWrapper">
          <DocTitle
            title={
              "CellphoneS - Điện thoại, laptop, tablet, phụ kiện chính hãng"
            }
          />
          <div className="HomePageSlider">
            <ListCategory categories={categories} />
            <div className="SliderHomePage">
              <SliderBanner />
            </div>
            <div className="TicketHomePage">
              {bannerSlider.length > 0 &&
                bannerSlider.map((banner, key) => {
                  return (
                    <div className="TicketItem">
                      <img src={banner.image} alt="" />
                    </div>
                  )
                })}
            </div>
          </div>
          <div className="banner-promotion">
            <img
              src="https://cdn2.cellphones.com.vn/1200x75,webp,q100/https://dashboard.cellphones.com.vn/storage/banner-special-desktop-pkchaohe.png"
              alt=""
            />
          </div>
          {productsGroupCategory.length > 0 &&
            productsGroupCategory.map((product, key) => {
              return (
                <div key={key}>
                  {product.products.length > 0 && (
                    <SliderProduct
                      data={product.products}
                      category={product.category}
                    />
                  )}
                </div>
              )
            })}
          <SliderPost />
        </div>
        // <Loading show={true} />
      )}
    </>
  )
}
