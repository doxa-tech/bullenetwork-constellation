import React, { useEffect, useRef, useState } from "react"
import Checkbox from "./checkbox"
import * as styles from "./multiselect.module.scss"

const Multiselect = ({ tags, setTags }) => {
  const [open, setOpen] = useState(false)

  const [displayedTag, setDisplayedTags] = useState(<span className={styles.noTagsText}>Filtres...</span>)

  const onClick = () => {
    setOpen(!open)
  }

  const getClickedCallback = (tagIndex) => {
    return () => {
      tags[tagIndex].clicked = !tags[tagIndex].clicked
      setTags([...tags])
    }
  }

  useEffect(() => {
    const clicked = tags.filter((tag) => tag.clicked === true)
    if (clicked.length === 0) {
      setDisplayedTags(<span className={styles.noTagsText}>Filtres...</span>)
    } else {
      setDisplayedTags(clicked.map((tag, index) => (<span key={index.toString()} className={styles.tagName}>{tag.title}</span>)))
    }
  }, [tags])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={`${styles.selectBtn} ${open ? styles.open : ""}`} onClick={onClick}>
          {displayedTag}
          <div className={`${styles.arrowDwn} ${open ? styles.open : ""}`}>
            <ArrowDown />
          </div>
        </div>

        {open && <ul className={styles.listItems}>
          {tags.map((tag, index) => (
            <Item key={index.toString()} tagName={tag.title} isClicked={tag.clicked} clickedCallback={getClickedCallback(index)} />
          ))}
          <li className={styles.close} onClick={onClick}>fermer</li>
        </ul>}
      </div>
    </div>
  )
}

const Item = ({ tagName, isClicked, clickedCallback }) => {
  const checkboxRef = useRef()

  useEffect(() => {
    checkboxRef.current.checked = isClicked
  }, [isClicked])

  return (
    // preventDefault ensures we don't have the click event on the checkbox
    <li className={styles.item} onClick={(e) => { clickedCallback(); e.preventDefault() }}>
      <Checkbox setRef={checkboxRef} />
      <span className={styles.text}>{tagName}</span>
    </li>
  )
}

const ArrowDown = () => (
  <svg width="100%" height="100%" viewBox="0 0 2161 1507" version="1.1" className={styles.arrowDown}>
    <g transform="matrix(-0.799019,-9.78516e-17,6.24231e-17,-0.509724,2071.4,786.51)">
      <path d="M0,1367.26L1240.16,-1237.56L2480.32,1367.26" className={styles.path} />
    </g>
  </svg>
)

export default Multiselect