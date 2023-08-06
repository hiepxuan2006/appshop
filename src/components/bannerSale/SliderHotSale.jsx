/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// import required modules
import { Autoplay } from "swiper"
import { SliderProductItem } from "~/app/Home/SliderProductItem"
import { DataContext } from "~/context/AppContext"
export const SliderHotSale = ({ products = [] }) => {
  const [isWeekend, setIsWeekend] = useState(false)
  const { windowWidth } = useContext(DataContext)
  useEffect(() => {
    const date = new Date()
    const day = date.getDay()
    if (day === 5 || day === 0 || day === 6 || day === 4) {
      setIsWeekend(true)
    }
  }, [])
  const targetDays = [6]
  const [remainingTime, setRemainingTime] = useState(0)

  useEffect(() => {
    const now = new Date()
    const targetDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + (6 - now.getDay()),
      0,
      0,
      0
    )
    const interval = setInterval(() => {
      setRemainingTime(targetDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDays])

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)
  const date = new Date()
  const day = date.getDay()

  const [countdown, setCountdown] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const targetDay = 0
      const daysLeft = (targetDay + 7 - now.getDay()) % 7
      const hoursLeft = 23 - now.getHours()
      const minutesLeft = 59 - now.getMinutes()
      const secondsLeft = 59 - now.getSeconds()
      setCountdown({
        days: daysLeft,
        hours: hoursLeft,
        minutes: minutesLeft,
        seconds: secondsLeft,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [countdown])
  return (
    <>
      {isWeekend && (
        <div className="SliderHotSale">
          <div
            className={`heading_banner mb-3 ${
              windowWidth < 1200 ? "flex-column" : ""
            }`}
          >
            <div className="Title">
              <img
                src="https://cdn2.cellphones.com.vn/600x,webp/media/wysiwyg/hst.png"
                alt=""
              />
            </div>
            {(day === 6) | (day === 0) && countdown ? (
              <div className="time_sale">
                <h3>Kết thúc sau :</h3>
                <div className="clock_banner">
                  <p>{`0${countdown.days}`.slice(-2)}</p>
                  <strong>:</strong>
                  <p>{`0${countdown.hours}`.slice(-2)}</p>
                  <strong>:</strong>
                  <p>{`0${countdown.minutes}`.slice(-2)}</p>
                  <strong>:</strong>
                  <p>{`0${countdown.seconds}`.slice(-2)}</p>
                </div>
              </div>
            ) : (
              <div className="time_sale">
                <h3>
                  Diễn ra sau <strong>:</strong>
                </h3>
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
            )}
          </div>
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 2,
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
              1080: {
                slidesPerView: 5,
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
            className="mySwiperSliderHost mySwiperSliderHotSale"
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
