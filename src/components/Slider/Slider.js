import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
// import required modules

import SwiperCore, {
  FreeMode,
  Navigation,
  Thumbs,
  Autoplay,
  Pagination,
} from "swiper"
import { getSliders } from "~/services/SliderService"
export const Slider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [sliders, setSliders] = useState([])

  const _getSliders = async () => {
    const { data, message, success } = await getSliders()

    if (!success) throw new Error(message)
    const { sliders: sliderRel } = data
    setSliders(sliderRel)
  }

  useEffect(() => {
    _getSliders()
  }, [])
  SwiperCore.use([Autoplay])
  return (
    <>
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
                <img src={process.env.REACT_APP_BASE_URL + "/" + item.image} />
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
    </>
  )
}
