import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Autoplay, Pagination, Navigation } from "swiper"
import { slidersBlog } from "~/fetchData"
export const SliderBlog = () => {
  return (
    <div className="SliderBlog">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiperSliderBlog"
      >
        {slidersBlog.length &&
          slidersBlog.map((item, key) => {
            return (
              <SwiperSlide>
                <div className="ItemSliderBlog">
                  <div className="ImageItemSlider">
                    <img src={item.imgThumb} alt="" />
                  </div>
                  <div className="DescriptionItemBlog">
                    <p className="TopicBlog">{item.topic.label}</p>
                    <h2 className="TitleItem">{item.title}</h2>
                    <p className="DescriptionBlog"> {item.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}
