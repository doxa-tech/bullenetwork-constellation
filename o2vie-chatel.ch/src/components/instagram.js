import React, { useState, useEffect } from "react"
import { format, formatDistance, formatDistanceToNow, formatRelative, subDays } from 'date-fns'
import { cs, fr } from "date-fns/locale"
import * as styles from "./instagram.module.css"

const OSIA_ENDPOINT = "https://osia.bullenetwork.ch"

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
      <div className="row aln-center">
        <a style={{ fontSize: "4em", marginBottom: "50px" }} href="https://www.instagram.com/_o2vie_/" target="_blank" rel="noreferrer" className="icon brands fa-instagram"><span className="label">Instagram</span></a>
      </div>
      <div className="row aln-center">
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
        <a href={children.permalink} target="_blank" className="image featured"><img src={`${OSIA_ENDPOINT}/images/${children.id}.jpg`} /></a>
        <div className={styles.contentWrap}>
          <p dangerouslySetInnerHTML={{ __html: parseContent(children.caption) }} className={styles.content}></p>
          <p className={styles.date}>{format(date, "c MMM", { locale: fr })}</p>
        </div>
      </section>

    </div>
  )
}

export default Instagram