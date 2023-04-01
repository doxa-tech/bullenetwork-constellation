import React from "react"
import { useState, useEffect } from "react";
import * as styles from "./ProgressiveImg.module.scss"

const ProgressiveImg = ({ placeholderSrc, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const loadingClass = placeholderSrc && imgSrc === placeholderSrc ? styles.piLoading : styles.piLoaded;

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return (
    <>
      <img
        {...{ src: imgSrc, ...props }}
        alt={props.alt || ""}
        className={`image ${loadingClass}`}
        loading="lazy"
      />
    </>
  );
};
export default ProgressiveImg;