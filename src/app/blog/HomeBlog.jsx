import React, { useEffect, useState } from "react"
import { SliderBlog } from "./SliderBlog"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { PreviewListPost } from "./PreviewListPost"
import { getPost, getPostGroup } from "~/services/postService"
import moment from "moment/moment"
import { Link } from "react-router-dom"

export const HomeBlog = () => {
  const [post, setPost] = useState([])
  const [postGr, setPostGr] = useState([])
  const _getPostHome = async () => {
    const { data, success, message } = await getPost()
    if (!success) throw new Error(message)
    setPost(data)
  }
  const _getPostGrHome = async () => {
    const { data, success, message } = await getPostGroup()
    if (!success) throw new Error(message)
    setPostGr(data)
  }
  useEffect(() => {
    _getPostHome()
    _getPostGrHome()
  }, [])
  console.log(postGr)
  return (
    <div className="HomeBlog">
      <SliderBlog data={post.slice(0, 4)} />
      <div className="mt-5">
        <h3 className="mb-5">Tin tức cập nhật</h3>
        <div className="row">
          <div className="col col-md-8">
            {post.length > 0 &&
              post.map((item, key) => {
                return (
                  <Link
                    to={`/hx-blog/bai-viet/${item.slug}?id=${item._id}`}
                    className="PostItemBlog"
                  >
                    <div className="ImageThumbPost">
                      <img
                        src={process.env.REACT_APP_BASE_URL + "/" + item.image}
                        alt=""
                      />
                    </div>
                    <div className="TitlePost">
                      <h3>{item.title}</h3>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <FontAwesomeIcon icon={faClockRotateLeft} />
                          <p>
                            {moment(item.created).startOf("hour").fromNow()}
                          </p>
                        </div>
                        <p>{item.topic_id.label}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
          </div>
          <div className="col col-md-4 PreviewPosts">
            {postGr.length > 0 &&
              postGr.map((item, key) => {
                return (
                  <>
                    {item.posts.length >= 3 && (
                      <div className="mb-5" key={key}>
                        <h2 className="HeadingPreview">{item.title}</h2>
                        <PreviewListPost data={item.posts.slice(0, 3)} />
                      </div>
                    )}
                  </>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
