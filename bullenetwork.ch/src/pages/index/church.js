import React, { useState, useEffect } from "react"

export default ({
  website,
  churchName,
  churchAddress,
  churchColor,
  imageID,
  children,
}) => {
  const [logoPath, setLogoPath] = useState(0)
  useEffect(() => {
    fetch(`https://panda.bullenetwork.ch/directus/files/${imageID}`)
      .then(response => response.json())
      .then(resultData => {
        setLogoPath(resultData.data.data.full_url)
      })
  })

  return (
    <li>
      <div
        className="ch-item"
        style={{
          backgroundColor: churchColor,
          backgroundImage: `url(${logoPath}`,
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
