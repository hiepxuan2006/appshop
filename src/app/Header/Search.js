/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import { useContext, useEffect, useRef, useState } from "react"
import useDebounce from "~/hook/useDebounce"

import {
  faSearch,
  faSpinner,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons"
import queryString from "query-string"
import { toastAlert } from "~/helper/toast"
import { searchProducts } from "~/services/productService"
import style from "./Header.module.scss"
import { Link } from "react-router-dom"
import { formattedNumber } from "~/helper/formatCurentcy"
import { DataContext } from "~/context/AppContext"
const cx = classNames.bind(style)
export const Search = ({ isLocationHome, isHidden, scrollY, show = false }) => {
  const [value, setValue] = useState("")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef()
  const { visible, setVisible } = useContext(DataContext)
  const onChangeSearch = (e) => {
    setValue(e.target.value)
  }
  const deBounce = useDebounce(value)

  const _searchProduct = async () => {
    if (!deBounce.trim()) {
      setProducts([])
      return
    }
    setLoading(true)
    const query = { title: deBounce }

    const paramString = queryString.stringify(query, {
      skipNull: true,
      skipEmptyString: true,
    })
    const { data, success, message } = await searchProducts(paramString)

    setLoading(false)
    if (!success) {
      toastAlert("error", message)
      throw new Error(message)
    }
    setProducts(data.data)
  }

  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false)
        setProducts([])
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [ref])

  useEffect(() => {
    _searchProduct()
  }, [deBounce])
  return (
    <div
      className={`${cx("search")} ${
        !isHidden || !isLocationHome || scrollY > 0 || show
          ? cx("positionRelative")
          : ""
      }`}
    >
      <FontAwesomeIcon className={cx("icon-search")} icon={faSearch} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Bạn cần tìm gì ..."
        onChange={onChangeSearch}
        value={value}
        onFocus={() => setVisible(true)}
      />
      {!loading && !!value && (
        <FontAwesomeIcon
          icon={faXmarkCircle}
          className={cx("close")}
          onClick={() => {
            inputRef.current.focus()
            setValue("")
            setProducts([])
          }}
        />
      )}
      {loading && (
        <FontAwesomeIcon icon={faSpinner} className={cx("spinners")} />
      )}
      {visible && products.length > 0 ? (
        <div className={cx("modal-product-search")} ref={ref}>
          <ul>
            <li>
              {products.map((item, key) => {
                return (
                  <Link
                    className="d-flex align-items-center gap-1"
                    to={`/san-pham/${item.slug}`}
                  >
                    <div className={cx("image")}>
                      <img src={item.images[0]} alt="" />
                    </div>
                    <div className="d-flex flex-column w-100 flex-shrink-1 pe-2">
                      <h4 className="TitleResultsItem">{item.title}</h4>
                      <div className="d-flex justify-content-between">
                        <p>
                          {formattedNumber(
                            item.retail_price -
                              (item.retail_price * item.sale) / 100
                          )}
                        </p>
                        <p className="text-decoration-line-through">
                          {formattedNumber(item.retail_price)}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
