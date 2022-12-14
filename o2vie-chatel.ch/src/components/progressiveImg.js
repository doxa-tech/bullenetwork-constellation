import React from "react"
import { useState, useEffect } from "react";
import "./progressiveImg.css"

const ProgressiveImg = ({ placeholderSrc, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const loadingClass = placeholderSrc && imgSrc === placeholderSrc ? "pi-loading" : "pi-loaded";

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