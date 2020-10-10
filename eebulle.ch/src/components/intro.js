import React from "react"

import style from "./intro.module.scss"

const IntroLeft = ({ children }) => (
  <div className={style.left}>
    {children}
  </div>
)

const IntroRight = ({ children }) => (
  <div className={style.rightWrapper}>
    <div className={style.right}>
      {children}
    </div>
  </div>
)

export { IntroLeft, IntroRight }
