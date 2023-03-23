import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { HomePageAccountLeft } from "./HomePageAccountLeft"
const logo = require("~/assets/login.png")
export const HomePageAccount = ({ children }) => {
  return (
    <div className="HomePageAccount">
      <div className="clearAccount"></div>
      <Container>
        <Row>
          <Col md={3} className="ColLeft">
            <HomePageAccountLeft />
          </Col>
          <div className="HelloAccount">
            <div className="ImageHello">
              <img src={logo} alt="" />
            </div>
            <div className="SayHello">
              <p>Xin chào</p>
              <p fw-bold>Hiêp Xuân</p>
            </div>
          </div>
          <Col md={9}>
            <div className="HomePage-ColRight">{children}</div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
