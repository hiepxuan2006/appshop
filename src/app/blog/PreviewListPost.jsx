import React, { Fragment } from "react"
import { Link } from "react-router-dom"

export const PreviewListPost = ({ data = [] }) => {
  return (
    <Fragment>
      {data.length > 0 &&
        data.slice(0, 3).map((item, key) => {
          return (
            <Link
              to={`/hx-blog/bai-viet/${item.slug}?id=${item._id}`}
              key={key}
              className={key === 0 ? "PreviewListPostBig" : "PreviewListPost"}
            >
              <div className="PreviewItemPost">
                <div className="ImageThumbPreview">
                  <img src={item.image} alt="" />
                </div>
                <div className="TitlePreview">
                  <p>{item.title}</p>
                </div>
              </div>
            </Link>
          )
        })}
    </Fragment>
  )
}
