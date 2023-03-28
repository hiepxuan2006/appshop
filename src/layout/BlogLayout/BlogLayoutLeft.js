import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { getAllTopic } from "~/services/postService"
const home = require("~/assets/homeBlog.png")
const discovery = require("~/assets/discover.png")
const smartphone = require("~/assets/smartphone.png")
const paper = require("~/assets/newspaper.png")
const promotion = require("~/assets/promotion.png")

export const BlogLayoutLeft = () => {
  const [topic, setTopic] = useState([])
  const _getAllTopic = async () => {
    const { data, success, message } = await getAllTopic()
    if (!success) throw new Error(message)
    setTopic(data)
  }
  useEffect(() => {
    _getAllTopic()
  }, [])
  return (
    <div className="BlogLayoutLeft">
      <ul className="ListTopicBlog">
        <li className="">
          <NavLink to="/hx-blog/home" className="TopicBlogItem">
            <div className="ImageTopic">
              <img src={home} alt="" />
            </div>
            <p>Trang chủ</p>
          </NavLink>
        </li>

        {topic.length > 0 &&
          topic.map((item, key) => {
            return (
              <li className="" key={key}>
                <NavLink to={`/hx-blog/${item.slug}`} className="TopicBlogItem">
                  <div className="ImageTopic">
                    <img
                      src={process.env.REACT_APP_BASE_URL + "/" + item.image}
                      alt=""
                    />
                  </div>
                  <p>{item.title}</p>
                </NavLink>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
