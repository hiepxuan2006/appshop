// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/pagination"

// import required modules
import { Autoplay, Grid } from "swiper"
import { SliderProductItem } from "./SliderProductItem"

export function SliderRow() {
  return (
    <div div className="SlideProductRow">
      <Swiper
        slidesPerView={5}
        grid={{
          rows: 2,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        watchSlidesProgress={true}
        modules={[Grid, Autoplay]}
        className="mySwiperRow"
      >
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
        <SwiperSlide>
          <SliderProductItem />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
