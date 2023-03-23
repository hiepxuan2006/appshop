import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import Header from "../Header/Header"
import { HomeLayout } from "~/layout"

export const InformationPage = () => {
  const [show, setShow] = useState(true)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <div className="InformationPage">
      <HomeLayout>
        <h1>chao cac ban</h1>
      </HomeLayout>
    </div>
  )
}
