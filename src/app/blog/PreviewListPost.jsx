import React, { Fragment } from "react"

export const PreviewListPost = () => {
  return (
    <Fragment>
      <div className="PreviewListPostBig">
        {/* hiện thị ảnh lớn PreviewListPostBig - anh nhỏ PreviewListPost */}
        <div className="PreviewItemPost">
          <div className="ImageThumbPreview">
            <img
              src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/Sforum-Huawei-66W-Ultra-Slim-6-scaled-e1679446923680.jpg"
              alt=""
            />
          </div>
          <div className="TitlePreview">
            <p>
              Trên tay củ sạc Huawei với thiết kế “siêu mỏng cánh” với công suất
              cực cao 66W, giá vô cùng hợp lý
            </p>
          </div>
        </div>
      </div>
      <div className="PreviewListPost">
        {/* hiện thị ảnh lớn PreviewListPostBig - anh nhỏ PreviewListPost */}
        <div className="PreviewItemPost">
          <div className="ImageThumbPreview">
            <img
              src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/Sforum-Huawei-66W-Ultra-Slim-6-scaled-e1679446923680.jpg"
              alt=""
            />
          </div>
          <div className="TitlePreview">
            <p>
              Trên tay củ sạc Huawei với thiết kế “siêu mỏng cánh” với công suất
              cực cao 66W, giá vô cùng hợp lý
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
