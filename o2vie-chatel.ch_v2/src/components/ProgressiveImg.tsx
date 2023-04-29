import React from "react"
import { useState, useEffect } from "react";
import CSS from "./ProgressiveImg.module.scss"

const ProgressiveImg = ({ placeholderSrc, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const loadingClass = placeholderSrc && imgSrc === placeholderSrc ? CSS.piLoading : CSS.piLoaded;

  // extends the className, if any provided
  props.className = `${loadingClass} ${props.className} `

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
        loading="lazy"
      />
    </>
  );
};
export default ProgressiveImg;