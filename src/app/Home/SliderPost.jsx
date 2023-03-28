import React, { useState } from "react"
import { Autoplay } from "swiper"

import { Post } from "./Post"
import { Swiper, SwiperSlide } from "swiper/react"
import { getPost } from "~/services/postService"
import { useEffect } from "react"
import { SkeletonTheme } from "react-loading-skeleton"
export const SliderPost = () => {
  const [post, setPost] = useState([])
  const _getPostHome = async () => {
    const { data, success, message } = await getPost()
    if (!success) throw new Error(message)
    setPost(data)
  }
  useEffect(() => {
    _getPostHome()
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
