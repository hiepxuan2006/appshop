import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment/moment"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPost, getPostGroup } from "~/services/postService"
import { PreviewListPost } from "./PreviewListPost"
import { SliderBlog } from "./SliderBlog"
import { ScrollToTopOnMount } from "~/components/ScrollToTopOnMount"

export const HomeBlog = () => {
  const [post, setPost] = useState([])
  const [postGr, setPostGr] = useState([])
  const _getPostHome = async () => {
    const { data, success, message } = await getPost()
    if (!success) throw new Error(message)
    setPost(data.post)
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
  return (
    <div className="HomeBlog">
      <ScrollToTopOnMount />

      <SliderBlog data={post.length > 0 && post.slice(0, 4)} />
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
                      <img src={item.image} alt="" />
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
                console.log(item)

                return (
                  <>
                    {item.posts.length && (
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
