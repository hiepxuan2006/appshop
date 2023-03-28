/* eslint-disable no-unused-vars */
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link } from "react-router-dom"
import { LoadingProcess } from "~/helper/LoadingProcess"

export const ListCategory = ({ categories = [] }) => {
  const [modalIsOpen, setIsOpen] = useState(true)

  const handleCloseModal = () => {
    setIsOpen(false)
  }
  return (
    <ul className="ListCategoryHomePage">
      {categories.length &&
        categories.map((item, key) => {
          return (
            <li key={item._id + key} className="ItemCategoryHomePage">
              <Link
                to={`/san-pham/danh-muc/${item.slug}?id=${item._id}`}
                className="d-flex align-items-center gap-3"
              >
                <p> {item.label}</p>
              </Link>
              <FontAwesomeIcon icon={faChevronRight} />
              <div className="ModalSubCategory ps-3">
                {item.children.length &&
                  item.children.map((value, key) => {
                    return (
                      <div key={key} className="SubCategoryItem">
                        <h3>{value.label}</h3>

                        {value.children.length &&
                          value.children.map((valueSub, key) => {
                            return (
                              <Link
                                key={key}
                                to={`/san-pham/danh-muc/${valueSub.slug}`}
                                className="LinkCategorySub"
                              >
                                <p>{valueSub.label}</p>
                              </Link>
                            )
                          })}
                      </div>
                    )
                  })}
              </div>
            </li>
          )
        })}
      <li className="ItemCategoryHomePage">
        <Link to={`/hx-blog/home`} className="d-flex align-items-center gap-3">
          <p>Tin tức</p>
        </Link>
        <FontAwesomeIcon icon={faChevronRight} />
      </li>
    </ul>
  )
}
