import React, { useEffect, useState } from "react"

// This component is used by the media and partition pages.

// defines a generic sort link.
const Sorter = ({ title, attribute, sortHandler, currentSorter }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [order, setOrder] = useState("desc");
  const [content, setContent] = useState(`${title} ↓`);
  const [classname, setClassname] = useState("");

  useEffect(() => {
    if (currentSorter == attribute) {
      setClassname("active")
      setIsActivated(true)
    } else {
      setClassname("")
      setIsActivated(false)
    }
  }, [currentSorter])

  const callSort = () => {
    let o = order;

    if (isActivated) {
      if (o == "asc") {
        setContent(`${title} ↓`);
        o = "desc";
      } else {
        setContent(`${title} ↑`);
        o = "asc";
      }
    }

    setOrder(o);
    sortHandler(o, attribute);
  }

  return (
    <span role="button" className={classname} onClick={callSort}>{content}</span>
  )
}

export default Sorter