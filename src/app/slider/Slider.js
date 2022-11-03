import style from "./Slider.module.scss";
import classNames from "classnames/bind";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
const cx = classNames.bind(style);

const Slider = () => {
  return (
    <div className={cx("wrapper")}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        Navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={cx("mySwiper")}
      >
        <SwiperSlide className={cx("swiper-slide-show")}>
          <div className={cx("slider-item")}>
            <div className={cx("slider-content")}>
              <h1 className={cx("text")}>AMAZING HOUSEPLANT</h1>

              <div className={cx("top")}>
                <div className={cx("inline", "inline1")}></div>
                <div className={cx("inline", "inline2")}></div>
              </div>
              <div className={cx("bottom")}>
                <div className={cx("inline", "inline1")}></div>
                <div className={cx("inline", "inline2")}></div>
                <div className={cx("inline", "inline3")}></div>
              </div>
            </div>
            <img
              src="https://codex-themes.com/thegem/sites/shop-plants/wp-content/uploads/2022/01/hero.jpg"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cx("slider-item")}>
            <img
              src="https://codex-themes.com/thegem/sites/shop-plants/wp-content/uploads/2022/01/hero.jpg"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cx("slider-item")}>
            <img
              src="https://codex-themes.com/thegem/sites/shop-plants/wp-content/uploads/2022/01/hero.jpg"
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
