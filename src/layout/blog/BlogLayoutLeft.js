import React from "react"
import { NavLink } from "react-router-dom"
const home = require("~/assets/homeBlog.png")
const discovery = require("~/assets/discover.png")
const smartphone = require("~/assets/smartphone.png")
const paper = require("~/assets/newspaper.png")
const promotion = require("~/assets/promotion.png")

export const BlogLayoutLeft = () => {
  return (
    <div className="BlogLayoutLeft">
      <ul className="ListTopicBlog">
        <li className="">
          <NavLink to="/hx-blog" className="TopicBlogItem">
            <div className="ImageTopic">
              <img src={home} alt="" />
            </div>
            <p>Trang chủ</p>
          </NavLink>
        </li>
        <li className="">
          <NavLink to="/" className="TopicBlogItem">
            <div className="ImageTopic">
              <img src={paper} alt="" />
            </div>
            <p>Tin công nghệ</p>
          </NavLink>
        </li>
        <li className="">
          <NavLink to="/" className="TopicBlogItem">
            <div className="ImageTopic">
              <img src={discovery} alt="" />
            </div>
            <p>Khám phá</p>
          </NavLink>
        </li>
        <li className="">
          <NavLink to="/" className="TopicBlogItem">
            <div className="ImageTopic">
              <img src={smartphone} alt="" />
            </div>
            <p>Trên tay</p>
          </NavLink>
        </li>
        <li className="">
          <NavLink to="/" className="TopicBlogItem">
            <div className="ImageTopic">
              <img src={promotion} alt="" />
            </div>
            <p>Khuyến mãi</p>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
