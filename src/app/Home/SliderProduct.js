// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import { Autoplay } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import { SliderProductItem } from "./SliderProductItem"
import { Link } from "react-router-dom"
// import required modules
export const SliderProduct = ({ title, data = [] }) => {
  return (
    <div className="SliderProduct">
      <div className="headingSliderProduct">
        <h2>{title}</h2>
        <div className="BrandProduct">
          <p className="BrandProductItem">Apple</p>
          <p className="BrandProductItem">Samsung</p>
        </div>
        <Link to={"/san-pham/danh-muc/dien-thoai"} className="BrandProductAll">
          Xem tất cả
        </Link>
      </div>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2.5,
          },
          400: {
            slidesPerView: 2.5,
          },
          639: {
            slidesPerView: 3,
          },
          865: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        watchSlidesProgress={true}
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={5}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiperSliderProduct"
      >
        {data.length &&
          data.map((item, key) => {
            return (
              <SwiperSlide key={key}>
                <SliderProductItem item={item} />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}
