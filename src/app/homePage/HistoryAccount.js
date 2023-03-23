import React, { useState } from "react"
import { HomePageAccount } from "./HomePageAccount"
const shipper = require("~/assets/Shipper_CPS 3.1905116.png")
const buys = require("~/assets/badge 2 (1).72cc484.png")

export const HistoryAccount = () => {
  const [activeIndex, setActiveIndex] = useState(0) // initialize state with index of first item

  const handleItemClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <HomePageAccount>
      <div className="HistoryOrder">
        <div className="HeadingHistoryOrder">
          <h1>Quản Lý đơn hàng</h1>
          <div className="OrderCount">
            <div className="OrderPending">
              <img src={shipper} alt="" />
              <p>0 đơn hàng</p>
            </div>
            <div className="OrderCompleted">
              <img src={buys} alt="" />
              <p>Đã mua 0</p>
            </div>
          </div>
        </div>
        <div className="OrderListContainer">
          <div className="OrderListOption">
            <div
              className={`OrderOptionItem ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => handleItemClick(0)}
            >
              Tất cả
            </div>
            <div
              className={`OrderOptionItem ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => handleItemClick(1)}
            >
              Đã xác nhận
            </div>
            <div
              className={`OrderOptionItem ${activeIndex === 2 ? "active" : ""}`}
              onClick={() => handleItemClick(2)}
            >
              Đang vận chuyển
            </div>
            <div
              className={`OrderOptionItem ${activeIndex === 3 ? "active" : ""}`}
              onClick={() => handleItemClick(3)}
            >
              Đã nhận hàng
            </div>
            <div
              className={`OrderOptionItem ${activeIndex === 4 ? "active" : ""}`}
              onClick={() => handleItemClick(4)}
            >
              Đã hủy
            </div>
          </div>
          <div className="OrderListTable">
            <table class="table  table-sm">
              <thead className="rounded-pill mb-5">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HomePageAccount>
  )
}
