/* eslint-disable react/jsx-no-duplicate-props */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import Slider from "react-slick"
// Import Swiper styles
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SwiperCore, { Autoplay } from "swiper"
import "swiper/css"
import "swiper/css/autoplay"
import { SliderProductItem } from "./SliderProductItem"
// import required modules
export const SliderProduct = ({ data = [], category }) => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    const brand = category.children.filter((item) => item.key === "brand")
    if (brand.length > 0) {
      setOptions(brand)
    }
  }, [category])
  SwiperCore.use([Autoplay])
  const settings = {
    dots: true,
    infinite: data.length < 5 ? false : true,
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    // pauseOnLastSlide: false,
    autoplaySpeed: 3000, // Thiết lập thời gian chuyển đổi giữa các slide
  }
  return (
    <div className="SliderProduct">
      <div className="headingSliderProduct">
        <h2>{category.label}</h2>
        <div className="BrandProduct">
          {options.length > 0 &&
            options[0].children.length > 0 &&
            options[0].children.map((item, key) => {
              return (
                <Link
                  to={`/san-pham/danh-muc/${item.slug}?id=${item._id}`}
                  key={key + item._id}
                  className="BrandProductItem"
                >
                  {item.label}
                </Link>
              )
            })}
        </div>
        <Link
          to={`/san-pham/danh-muc/${category.slug}?id=${category._id}`}
          className="BrandProductAll"
        >
          Xem tất cả
        </Link>
      </div>
      {/* <Swiper
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
          1200: {
            slidesPerView: 5,
          },
        }}
        watchSlidesProgress={true}
        spaceBetween={5}
        modules={[Autoplay]}
        // loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper mySwiperSliderProduct"
      >
        {data.length > 0 &&
          data.map((item, key) => {
            return (
              <SwiperSlide key={key}>
                <SliderProductItem item={item} />
              </SwiperSlide>
            )
          })}
      </Swiper> */}
      <Slider {...settings} className="SlickSlider">
        {data.length > 0 &&
          data.map((item, key) => {
            return (
              // <SwiperSlide key={key}>
              <SliderProductItem key={key} item={item} />
              // </SwiperSlide>
            )
          })}
      </Slider>
    </div>
  )
}
