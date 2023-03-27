import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper"
import { SliderProductItem } from "~/app/Home/SliderProductItem"
export const SliderHotSale = ({ products = [] }) => {
  const [isWeekend, setIsWeekend] = useState(false)
  useEffect(() => {
    const date = new Date()
    const day = date.getDay()
    if (day === 6 || day === 0) {
      setIsWeekend(true)
    }
  }, [])
  return (
    <>
      {isWeekend && (
        <div className="SliderHotSale">
          <div className="Title">
            <img
              src="https://cdn2.cellphones.com.vn/600x,webp/media/wysiwyg/hst.png"
              alt=""
            />
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
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            modules={[Autoplay]}
            slidesPerView={5}
            spaceBetween={10}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            // modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper mySwiperSliderHotSale"
          >
            {products.length > 0 &&
              products.map((item, key) => {
                return (
                  <SwiperSlide>
                    <SliderProductItem item={item} />
                  </SwiperSlide>
                )
              })}
          </Swiper>
        </div>
      )}
    </>
  )
}
