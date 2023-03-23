import { useEffect, useState } from "react"
import { Slider } from "~/components/Slider/Slider"
import { DocTitle } from "~/helper/DocTitle"
import { ListCategory } from "./ListCategory"
import { MenuBottomMobile } from "./MenuBottomMobile"
import { SliderProduct } from "./SliderProduct"
import { getProducts } from "~/services/productService"
import { SliderPost } from "./SliderPost"
import { getCategories } from "~/services/categoryService"
export const Home = ({ isOpenPage }) => {
  const [showPage, setShowPage] = useState(false)
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
      <MenuBottomMobile setShowPage={setShowPage} showPage={showPage} />
    </>
  )
}
