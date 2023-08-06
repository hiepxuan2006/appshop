import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SliderBanner } from "~/components/Slider/SliderReact"
import { DocTitle } from "~/helper/DocTitle"
import { LoadingProcess } from "~/helper/LoadingProcess"
import { _getBannerAds, _getBannerSlider } from "~/slice/bannerSlice"
import { _getCategory, _getProductGroupCategory } from "~/slice/productSlice"
import { ListCategory } from "./ListCategory"
import { SliderPost } from "./SliderPost"
import { SliderProduct } from "./SliderProduct"
import { ScrollToTopOnMount } from "~/components/ScrollToTopOnMount"
export const Home = ({ isOpenPage }) => {
  const { productsGroupCategory, categories, loading } = useSelector(
    (state) => state.product
  )
  const { bannerSlider, banner } = useSelector((state) => state.banner)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_getProductGroupCategory())
    dispatch(_getCategory())
    dispatch(_getBannerSlider({ horizontal: false, category: false }))
    dispatch(_getBannerAds({ horizontal: true }))
  }, [dispatch])

  const body = document.body
  if (loading === true) {
    body.classList.add(`no-scroll`)
  } else {
    body.classList.remove(`no-scroll`)
  }
  return (
    <>
      {loading ? (
        <LoadingProcess />
      ) : (
        <div className="HomePageWrapper">
          <DocTitle
            title={
              "CellphoneS - Điện thoại, laptop, tablet, phụ kiện chính hãng"
            }
          />
          <ScrollToTopOnMount />

          <div className={`HomePageSlider`}>
            <ListCategory categories={categories} />
            <div className="SliderHomePage">
              <SliderBanner />
            </div>
            <div
              className={`TicketHomePage ${
                bannerSlider.length === 0 ? "bg-color-animation " : ""
              }`}
            >
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
              src="https://cdn2.cellphones.com.vn/1200x75,webp,q100/https://dashboard.cellphones.com.vn/storage/b2s-special-desktop-dday-p1.png"
              alt=""
            />
          </div>

          <div>
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
          </div>
          <SliderPost />
        </div>
        // <Loading show={true} />
      )}
    </>
  )
}
