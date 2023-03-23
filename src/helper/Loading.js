import React from "react"
import { Modal } from "react-bootstrap"
const loading = require("~/assets/gg.gif")
export const Loading = ({ show = false }) => {
  const handleClose = () => {}
  return (
    <div className="ModalFullscreen">
      <div className="d-flex align-items-center justify-content-center ">
        <div className="Loading">
          <img src={loading} alt="" />
        </div>
      </div>
    </div>
  )
}
