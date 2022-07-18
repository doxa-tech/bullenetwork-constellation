import React, { useState, useEffect } from "react"
import { formatDistanceToNow } from 'date-fns'
import { fr } from "date-fns/locale"
import * as styles from "./instagram.module.css"

const OSIA_ENDPOINT = "https://osia.o2vie-chatel.ch"
const INSTAGRAM_URL = "https://www.instagram.com/_o2vie_/"

const Instagram = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`${OSIA_ENDPOINT}/api/medias?count=6`)
      .then(response => response.json())
      .then(resultData => {
        setPosts(resultData)
      })
  }, [])

  return (
    <div id="features-wrapper" >
      <div className={styles.title}>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={`icon brands fa-instagram ${styles.icon}`}><span className="label">Instagram</span></a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">_o2vie_</a>
        <h3>Notre fil Instagram</h3>
      </div>
      <div className="container">
        <div className={`row aln-center ${styles.posts}`}>
          {posts.map((post) => (
            <Post key={post.id}>{post}</Post>
          ))}
        </div>
      </div>
    </div >
  )
}

const Post = ({ children }) => {
  const date = new Date(Date.parse(children.timestamp))

  const parseContent = (content) => {
    return content.replace(/(#[\w’']+)/g, '<span>$1</span> ');
  }

  return (
    <div className={`col-3 col-3-large col-4-medium col-6-small ${styles.post}`}>

      <section className="box feature">
        <a href={children.permalink} target="_blank" rel="noreferrer" className="image featured"><img src={`${OSIA_ENDPOINT}/images/${children.id}.jpg`} alt="instagram post" /></a>
        <div className={styles.contentWrap}>
          <p dangerouslySetInnerHTML={{ __html: parseContent(children.caption) }} className={styles.content}></p>
          <div className={styles.time}>
            <TimeIcon />
            <p className={styles.date}>{formatDistanceToNow(date, { locale: fr, addSuffix: true })}</p>
          </div>
        </div>
      </section>

    </div>
  )
}

const TimeIcon = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 163 163" version="1.1" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "1.5" }}>
      <g transform="matrix(1,0,0,1,-451.618,-415.21)">
        <circle cx="532.973" cy="496.566" r="71.98" style={{ fill: "none", strokeWidth: "15px" }} />
      </g>
      <g transform="matrix(1,0,0,1,-615.082,-360.705)">
        <path d="M718.058,461.594L696.437,442.061L696.437,403.776" style={{ fill: "none", strokeWidth: "15px" }} />
      </g>
    </svg >
  )
}

export default Instagram