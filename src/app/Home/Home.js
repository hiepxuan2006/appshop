import { useEffect, useState } from "react"
import { Slider } from "~/components/Slider/Slider"
import { DocTitle } from "~/helper/DocTitle"
import { getCategories } from "~/services/categoryService"
import { getProducts } from "~/services/productService"
import { ListCategory } from "./ListCategory"
import { SliderPost } from "./SliderPost"
import { SliderProduct } from "./SliderProduct"
import { ScrollToTopOnMount } from "~/components/ScrollToTopOnMount"
export const Home = ({ isOpenPage }) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const _getProducts = async () => {
    const { data, message, success } = await getProducts()
    if (!success) throw new Error(message)
    setProducts(data)
  }

  const _getCategories = async () => {
    const { data, success, message } = await getCategories()
    if (!success) throw new Error(message)
    setCategories(data)
  }
  useEffect(() => {
    _getProducts()
    _getCategories()
  }, [])
  return (
    <>
      <ScrollToTopOnMount />
      <div className="HomePageWrapper">
        <DocTitle
          title={"CellphoneS - Điện thoại, laptop, tablet, phụ kiện chính hãng"}
        />
        <div className="HomePageSlider">
          <ListCategory categories={categories} />
          <div className="SliderHomePage">
            <Slider />
          </div>
          <div className="TicketHomePage">
            <div className="TicketItem">
              <img
                src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/right-airpod-moi-th33.png"
                alt=""
              />
            </div>
            <div className="TicketItem">
              <img
                src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/right-airpod-moi-th33.png"
                alt=""
              />
            </div>
            <div className="TicketItem">
              <img
                src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/right-airpod-moi-th33.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <SliderProduct data={products} title={"Điện thoại nổi bật nhất"} />
        <SliderProduct title={"Lap top"} />
        <SliderProduct title={"Lap top"} />
        <SliderPost />
      </div>
    </>
  )
}
