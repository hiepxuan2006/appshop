/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
// import required modules

import { useDispatch, useSelector } from "react-redux"
import SwiperCore, { Autoplay, FreeMode, Navigation, Thumbs } from "swiper"
import { _getSliders } from "~/slice/sliderSlice"
export const SliderBanner = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const { sliders } = useSelector((state) => state.slider)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_getSliders())
  }, [dispatch])
  SwiperCore.use([Autoplay])
  return (
    <div
      className={`h-100 ${sliders.length === 0 ? "bg-color-animation " : ""}`}
    >
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        // loop={true}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="mySwiper2"
      >
        {sliders.length &&
          sliders.map((item, key) => {
            return (
              <SwiperSlide key={key}>
                <img src={item.image} />
              </SwiperSlide>
            )
          })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        watchSlidesProgress={true}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {sliders.length &&
          sliders.map((item, key) => {
            return (
              <SwiperSlide key={key}>
                <div className="DescriptionSlider">
                  <p className="fw-normal text-uppercase">{item.title}</p>
                  <p className="fw-lighter">{item.description}</p>
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}
