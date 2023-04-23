import React from "react"

const img = require("~/assets/Shipper.png")
export const LoadingProcess = () => {
  return (
    <div className="loading-page">
      <div className="loading-bar"></div>
      <div className="logo-loading">
        <img src={img} alt="" />
      </div>
    </div>
  )
}
