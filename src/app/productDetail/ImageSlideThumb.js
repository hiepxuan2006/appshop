import { useState } from "react"
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

export const ImageSlideThumb = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className="ImageSlideThumbs">
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className="mySwiperImageProductDetail"
      >
        {product.images.map((item, key) => {
          return (
            <SwiperSlide key={key}>
              <img src={process.env.REACT_APP_BASE_URL + "/" + item} alt="" />
            </SwiperSlide>
          )
        })}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={0}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperImageProductThumb"
      >
        {product.images.map((item, key) => {
          return (
            <SwiperSlide key={key}>
              <img src={process.env.REACT_APP_BASE_URL + "/" + item} alt="" />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
