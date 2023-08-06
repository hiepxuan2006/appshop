import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import { Link } from "react-router-dom"
import { Autoplay, Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
export const SliderBlog = ({ data = [] }) => {
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
        {data.length &&
          data.map((item, key) => {
            return (
              <SwiperSlide>
                <div className="ItemSliderBlog">
                  <Link
                    to={`/hx-blog/bai-viet/${item.slug}?id=${item._id}`}
                    className="ImageItemSlider"
                  >
                    <img src={item.image} alt="" />
                  </Link>
                  <div className="DescriptionItemBlog">
                    <p className="TopicBlog">{item.topic_id.label}</p>
                    <Link
                      to={`/hx-blog/bai-viet/${item.slug}?id=${item._id}`}
                      className="TitleItem"
                    >
                      {item.title}
                    </Link>
                    <p
                      className="DescriptionBlog fw-lighter"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></p>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}
