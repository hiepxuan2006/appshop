import React from "react"
import { Link } from "react-router-dom"

export const Post = ({ item }) => {
  return (
    <Link
      to={`/hx-blog/bai-viet/${item.slug}?id=${item._id}`}
      className="PostItem"
    >
      <div className="ImagePost">
        <img src={item.image} alt="" />
      </div>
      <div className="TitlePost">
        <h3 className="TitleTileContent">{item.title}</h3>
      </div>
    </Link>
  )
}
