import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
const logoBlog = require("~/assets/blog.png")
export const HeaderBlog = () => {
  return (
    <div className="HeaderBlog">
      <div className="HeaderBlogContent">
        <div className="BlogContentLeft">
          <div className="LogoBlog">
            <img src={logoBlog} alt="" />
          </div>
          <div className="SearchBlog">
            <input type="text" placeholder="search ...." />
            <FontAwesomeIcon className="IconSearchBlog" icon={faSearch} />
          </div>
        </div>
        <Link to="/" className="BlogContentRight">
          <FontAwesomeIcon icon={faUserCircle} />
          <p>Shop house</p>
        </Link>
      </div>
    </div>
  )
}
