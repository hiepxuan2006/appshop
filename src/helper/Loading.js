const loading = require("~/assets/gg.gif")
export const Loading = ({ show = false }) => {
  return (
    <>
      {show ? (
        <div className="ModalFullscreen">
          <div className="d-flex align-items-center justify-content-center ">
            <div className="Loading">
              <img src={loading} alt="" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}
