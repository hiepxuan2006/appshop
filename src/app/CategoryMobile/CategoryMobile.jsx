import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCategories } from "~/services/categoryService"

export const CategoryMobile = ({ show, setShow }) => {
  const availableColors = [
    "#F4D03F", // màu vàng nhạt
    "#A9CCE3", // màu xanh nước biển
    "#E8DAEF", // màu tím nhạt
    "#F0B27A", // màu cam nhạt
    "#85C1E9", // màu xanh nhạt
    "#F9E79F", // màu vàng dịu
    "#D7BDE2", // màu tím dịu
    "#F5B7B1", // màu hồng dịu
    "#A2D9CE", // màu xanh lá cây dịu
    "#EDBB99", // màu cam dịu
  ]
  const [categories, setCategories] = useState([])
  const [categoryChose, setCategoryChose] = useState("")
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, success, message } = await getCategories()
      if (success) {
        setCategories(data)
        setCategoryChose(data[0])
      } else {
        throw new Error(message)
      }
    }
    fetchCategories()
  }, [])
  return (
    <div className="CategoryMobile">
      <nav className="category_mobile_left">
        {categories.length > 0 &&
          categories.map((category, key) => {
            return (
              <div
                onClick={() => setCategoryChose(category)}
                key={key}
                className="category_mobile_item"
                style={{ backgroundColor: availableColors[key] }}
              >
                <div className="category_mobile_image">
                  <img
                    src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_green_211119.jpg"
                    alt=""
                  />
                </div>
                <div className="category_mobile_name">{category.label}</div>
              </div>
            )
          })}
        <div
          className="category_mobile_item"
          style={
            categories.length > 0
              ? {
                  backgroundColor: availableColors[categories.length],
                }
              : {}
          }
        >
          <div className="category_mobile_image">
            <img
              src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_green_211119.jpg"
              alt=""
            />
          </div>
          <div className="category_mobile_name">Tin Công Nghệ</div>
        </div>
      </nav>
      <div className="content_category_mobile">
        {categoryChose && (
          <div className="group_content_mobile">
            <Link
              className="parent_category_mobile"
              onClick={() => setShow(false)}
              to={`/san-pham/danh-muc/${categoryChose.slug}?id=${categoryChose._id}`}
            >
              {categoryChose.label}
            </Link>
            {categoryChose.children.length > 0 &&
              categoryChose.children.map((value, key) => {
                return (
                  <div key={key} className="list_content_mobile">
                    <h3 className="mb-4 mt-4">{value.label}</h3>
                    <div className="group_list">
                      <div className="list_child">
                        {value.children.length > 0 &&
                          value.children.map((item, key) => {
                            return (
                              <Link
                                onClick={() => setShow(false)}
                                to={`/san-pham/danh-muc/${item.slug}?id=${item._id}`}
                                key={key}
                                className="title_category_mobile"
                              >
                                {item.label}
                              </Link>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}
