import React from "react"

import { left, right, rightWrapper } from "./intro.module.scss"

const IntroLeft = ({ children }) => (
  <div className={left}>
    {children}
  </div>
)

const IntroRight = ({ children }) => (
  <div className={rightWrapper}>
    <div className={right}>
      {children}
    </div>
  </div>
)

export { IntroLeft, IntroRight }
