/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { ScrollToTopOnMount } from "~/components/ScrollToTopOnMount"
import { getPostById } from "~/services/postService"

export const PostDetail = () => {
  const [post, setPost] = useState("")

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const sort = queryParams.get("id")

  const _getPostById = async () => {
    const { data, success, message } = await getPostById(sort)
    if (!success) throw new Error(message)
    setPost(data)
  }
  useEffect(() => {
    _getPostById()
  }, [sort])
  return (
    <div className="PostDetailPage">
      <ScrollToTopOnMount />

      <div className="ImagePostDetail">
        <img src={post.image} alt="" />
      </div>
      <div className="BodyPost">
        <div className="TopicPost">
          <p>{!!post && post.topic_id.label}</p>
        </div>
        <div className="HeadingPost">
          <h2>{!!post && post.title}</h2>
        </div>
        <div className="AuthorPost">
          <div className="AvatarAuthor">
            <img
              src="https://www.shutterstock.com/image-vector/picture-vector-icon-no-image-260nw-1732584341.jpg"
              alt=""
            />
          </div>
          <div className="NameAuthor">
            <p>hiepxuan</p>
            <p>20/06/1998</p>
          </div>
        </div>
        <div
          className="ContentPost"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </div>
  )
}
