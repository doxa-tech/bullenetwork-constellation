import React from "react"

export default ({
  website,
  churchName,
  churchAddress,
  churchColor,
  imageName,
  children,
}) => {
  return (
    <li>
      <div
        className="ch-item"
        style={{
          backgroundColor: churchColor,
          backgroundImage: `url(churches/${imageName})`,
        }}
      >
        <div className="ch-info" style={{ backgroundColor: churchColor }}>
          <h3>
            <a href={website}>{churchName}</a>
          </h3>
          <p>
            {churchAddress} <a href={website}>Voir le site</a>
          </p>
        </div>
      </div>
    </li>
  )
}
