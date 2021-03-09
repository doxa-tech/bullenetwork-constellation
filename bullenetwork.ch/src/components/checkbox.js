import React from "react"
import styles from "./checkbox.module.scss"

export default ({ label, setRef, onclick, name, value }) => {
  return (
    <label className={styles.checkboxContainer}>
      <div>
        <input ref={setRef} onClick={onclick} type="checkbox" name={name} value={value} />
        <span className={styles.checkmark}></span>
      </div>
      <span>{label}</span>
    </label>
  )
}