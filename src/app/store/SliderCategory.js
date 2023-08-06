// Import Swiper styles
import Slider from "react-slick"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
export const SliderCategory = ({ bannerCategory = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 3000,
  }
  return (
    <div className="SliderCategory ">
      <Slider {...settings} className="SlickSliderCategory">
        {bannerCategory.length > 0 &&
          bannerCategory.map((slider, key) => {
            return (
              <div
                key={key}
                className="image-slider-category h-100 w-100 rounded rounded-lg overflow-hidden"
              >
                <img
                  className="h-100 w-100"
                  style={{ objectFit: "contain" }}
                  src={slider.image}
                  alt=""
                />
              </div>
            )
          })}
      </Slider>
    </div>
  )
}
