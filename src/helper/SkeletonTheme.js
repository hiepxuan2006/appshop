import React from "react"
import Skeleton from "react-loading-skeleton"

export const SkeletonTheme = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <p>
        <Skeleton count={3} />
      </p>
    </SkeletonTheme>
  )
}
