import { Autoplay } from "swiper"

import { useEffect } from "react"
import { SkeletonTheme } from "react-loading-skeleton"
import { useDispatch, useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { _getPost } from "~/slice/sliderSlice"
import { Post } from "./Post"
export const SliderPost = () => {
  const { post } = useSelector((state) => state.slider)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(_getPost())
  }, [])
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
        {post.length > 0 &&
          post.slice(0, 4) &&
          post.map((item, key) => {
            return (
              <SwiperSlide key={key}>
                {<Post item={item} /> || <SkeletonTheme />}
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}
