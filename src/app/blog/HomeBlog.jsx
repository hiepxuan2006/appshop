import React from "react"
import { SliderBlog } from "./SliderBlog"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { PreviewListPost } from "./PreviewListPost"

export const HomeBlog = () => {
  return (
    <div className="HomeBlog">
      <SliderBlog />
      <div className="mt-5">
        <h3 className="mb-5">Tin tức cập nhật</h3>
        <div className="row">
          <div className="col col-md-8">
            <div className="PostItemBlog">
              <div className="ImageThumbPost">
                <img
                  src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/Galaxy-A54-5G-26-1-e1679502879993-350x250.jpg"
                  alt=""
                />
              </div>
              <div className="TitlePost">
                <h3>
                  Cùng mức giá nhưng đây là 4 chiếc điện thoại Android dư sức
                  đánh bại iPhone 11 “già cỗi”
                </h3>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    <p>11 giờ trước</p>
                  </div>
                  <p>Thiết bị di động</p>
                </div>
              </div>
            </div>
            <div className="PostItemBlog">
              <div className="ImageThumbPost">
                <img
                  src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/Galaxy-A54-5G-26-1-e1679502879993-350x250.jpg"
                  alt=""
                />
              </div>
              <div className="TitlePost">
                <h3>
                  Cùng mức giá nhưng đây là 4 chiếc điện thoại Android dư sức
                  đánh bại iPhone 11 “già cỗi”
                </h3>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    <p>11 giờ trước</p>
                  </div>
                  <p>Thiết bị di động</p>
                </div>
              </div>
            </div>
            <div className="PostItemBlog">
              <div className="ImageThumbPost">
                <img
                  src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/Galaxy-A54-5G-26-1-e1679502879993-350x250.jpg"
                  alt=""
                />
              </div>
              <div className="TitlePost">
                <h3>
                  Cùng mức giá nhưng đây là 4 chiếc điện thoại Android dư sức
                  đánh bại iPhone 11 “già cỗi”
                </h3>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    <p>11 giờ trước</p>
                  </div>
                  <p>Thiết bị di động</p>
                </div>
              </div>
            </div>
            <div className="PostItemBlog">
              <div className="ImageThumbPost">
                <img
                  src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/Galaxy-A54-5G-26-1-e1679502879993-350x250.jpg"
                  alt=""
                />
              </div>
              <div className="TitlePost">
                <h3>
                  Cùng mức giá nhưng đây là 4 chiếc điện thoại Android dư sức
                  đánh bại iPhone 11 “già cỗi”
                </h3>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    <p>11 giờ trước</p>
                  </div>
                  <p>Thiết bị di động</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-md-4 PreviewPosts">
            <div className="">
              <h2 className="HeadingPreview">Trên tay mới nhất</h2>
              <PreviewListPost />
            </div>
            <div className="mt-5">
              <h2 className="HeadingPreview">Đánh giá nổi bật</h2>
              <PreviewListPost />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
