/* eslint-disable react/jsx-no-duplicate-props */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import Slider from "react-slick"
// Import Swiper styles
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { SliderProductItem } from "./SliderProductItem"
import { Autoplay } from "swiper"
// import required modules
export const SliderProduct = ({ data = [], category = "" }) => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    const brand =
      category && category.children.filter((item) => item.key === "brand")
    if (brand.length > 0) {
      setOptions(brand)
    }
  }, [category])
  const settings = {
    dots: true,
    infinite: true,
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
    autoplaySpeed: 3000, // Thiết lập thời gian chuyển đổi giữa các slide
  }
  return (
    <div
      className={`SliderProduct ${
        data.length === 0 ? "bg-color-animation " : ""
      }`}
    >
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
      {data.length && data.length <= 5 ? (
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
            1200: {
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
          className={`mySwiperSliderProduct ${
            data.length === 0 ? "bg-color-animation " : ""
          }`}
        >
          {data.length > 0 &&
            data.map((item, key) => {
              return (
                <SwiperSlide key={key}>
                  <SliderProductItem item={item} />
                </SwiperSlide>
              )
            })}
        </Swiper>
      ) : (
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
      )}
    </div>
  )
}
