import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper"
import { SliderProductItem } from "~/app/Home/SliderProductItem"
import moment from "moment"
export const SliderHotSale = ({ products = [] }) => {
  const [isWeekend, setIsWeekend] = useState(false)
  useEffect(() => {
    const date = new Date()
    const day = date.getDay()
    if (day === 5 || day === 0 || day === 6) {
      setIsWeekend(true)
    }
  }, [])
  const targetDays = [6] // 0: Chủ nhật, 1: Thứ 2, ..., 6: Thứ 7
  const [remainingTime, setRemainingTime] = useState(0)

  useEffect(() => {
    // Tìm ngày gần nhất từ hôm nay đến thứ 5
    const now = new Date()
    const targetDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + (6 - now.getDay()),
      0,
      0,
      0
    )
    console.log(now)
    console.log(targetDate)

    const interval = setInterval(() => {
      setRemainingTime(targetDate - new Date().getTime())
    }, 1000)

    // Xóa interval khi component bị unmount
    return () => clearInterval(interval)
  }, [targetDays])

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)

  // console.log(days, hours, minutes, seconds)
  return (
    <>
      {isWeekend && (
        <div className="SliderHotSale">
          <div className="heading_banner">
            <div className="Title">
              <img
                src="https://cdn2.cellphones.com.vn/600x,webp/media/wysiwyg/hst.png"
                alt=""
              />
            </div>
            <div className="time_sale">
              <h2>
                Diễn ra sau <strong>:</strong>
              </h2>
              <div className="clock_banner">
                <p>{`0${days}`.slice(-2)}</p>
                <strong>:</strong>
                <p>{`0${hours}`.slice(-2)}</p>
                <strong>:</strong>
                <p>{`0${minutes}`.slice(-2)}</p>
                <strong>:</strong>
                <p>{`0${seconds}`.slice(-2)}</p>
              </div>
            </div>
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
