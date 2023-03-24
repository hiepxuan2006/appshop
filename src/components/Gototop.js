import { faJetFighterUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"

export const Gototop = () => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    function toggleVisibility() {
      if (window.pageYOffset > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  return (
    <>
      {visible ? (
        <div onClick={scrollToTop} className="GoToTop">
          <FontAwesomeIcon icon={faJetFighterUp} />
        </div>
      ) : (
        ""
      )}
    </>
  )
}
