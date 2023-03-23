import React from "react"
import { HomePageAccount } from "./HomePageAccount"
const logo = require("~/assets/login.png")
const end = require("~/assets/end.png")
export const RankAccount = () => {
  return (
    <HomePageAccount>
      <div className="RankAccount">
        <div className="RankAccountHead">
          <div className="RankAccountImage">
            <img src={logo} alt="" />
          </div>
          <div className="RankAccountSayHello">
            <p>Xin chào</p>
            <p className="fw-bold">Hiêp Xuân</p>
          </div>
        </div>
        <div className="RankLevelStatus">
          <div className="imageStart">
            <img src={logo} alt="" />
          </div>
          <div className=""></div>
          <input
            type="range"
            class="form-range FormRanking"
            min="0"
            max="5"
            step="0.5"
            value={1}
            id="customRange3"
          />
          <p>Bạn cần mua thêm 3.000.000 ₫ để lên hạng S-New </p>
          <div className="imageEnd">
            <img src={end} alt="" />
          </div>
        </div>
      </div>
    </HomePageAccount>
  )
}
