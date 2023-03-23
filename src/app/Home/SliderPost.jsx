import React from "react"
import { Autoplay } from "swiper"

import { Post } from "./Post"
import { Swiper, SwiperSlide } from "swiper/react"
export const SliderPost = () => {
  return (
    <div className="SliderPostPage">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Tin Công Nghệ</h1>
        <p>Xem tất cả</p>
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
            slidesPerView: 4,
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
        className="mySwiperSliderPost"
      >
        <SwiperSlide>
          <Post />
        </SwiperSlide>
        <SwiperSlide>
          <Post />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Post />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Post />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
