import * as React from "react"

import { useState, useEffect } from "react"
import { formatDistanceToNow } from 'date-fns'
import { fr } from "date-fns/locale/index.js"
import CSS from "./Instagram.module.scss"

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
      <div className={CSS.title}>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={`icon brands ${CSS.icon}`}><InstaIcon /><span className="label">Instagram</span></a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">_o2vie_</a>
        <h3>Notre fil Instagram</h3>
      </div>
      <div className="container">
        <div className={`row aln-center ${CSS.posts}`}>
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
    <div className={`col-3 col-3-large col-4-medium col-6-small ${CSS.post}`}>

      <section className="box feature">
        <a href={children.permalink} target="_blank" rel="noreferrer" className="image featured"><img src={`${OSIA_ENDPOINT}/images/${children.id}.jpg`} alt="instagram post" /></a>
        <div className={CSS.contentWrap}>
          <p dangerouslySetInnerHTML={{ __html: parseContent(children.caption) }} className={CSS.content}></p>
          <div className={CSS.time}>
            <TimeIcon />
            <p className={CSS.date}>{formatDistanceToNow(date, { locale: fr, addSuffix: true })}</p>
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

const InstaIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        d="M256,49.471c67.266,0,75.233.257,101.8,1.469,24.562,1.121,37.9,5.224,46.778,8.674a78.052,78.052,0,0,1,28.966,18.845,78.052,78.052,0,0,1,18.845,28.966c3.45,8.877,7.554,22.216,8.674,46.778,1.212,26.565,1.469,34.532,1.469,101.8s-0.257,75.233-1.469,101.8c-1.121,24.562-5.225,37.9-8.674,46.778a83.427,83.427,0,0,1-47.811,47.811c-8.877,3.45-22.216,7.554-46.778,8.674-26.56,1.212-34.527,1.469-101.8,1.469s-75.237-.257-101.8-1.469c-24.562-1.121-37.9-5.225-46.778-8.674a78.051,78.051,0,0,1-28.966-18.845,78.053,78.053,0,0,1-18.845-28.966c-3.45-8.877-7.554-22.216-8.674-46.778-1.212-26.564-1.469-34.532-1.469-101.8s0.257-75.233,1.469-101.8c1.121-24.562,5.224-37.9,8.674-46.778A78.052,78.052,0,0,1,78.458,78.458a78.053,78.053,0,0,1,28.966-18.845c8.877-3.45,22.216-7.554,46.778-8.674,26.565-1.212,34.532-1.469,101.8-1.469m0-45.391c-68.418,0-77,.29-103.866,1.516-26.815,1.224-45.127,5.482-61.151,11.71a123.488,123.488,0,0,0-44.62,29.057A123.488,123.488,0,0,0,17.3,90.982C11.077,107.007,6.819,125.319,5.6,152.134,4.369,179,4.079,187.582,4.079,256S4.369,333,5.6,359.866c1.224,26.815,5.482,45.127,11.71,61.151a123.489,123.489,0,0,0,29.057,44.62,123.486,123.486,0,0,0,44.62,29.057c16.025,6.228,34.337,10.486,61.151,11.71,26.87,1.226,35.449,1.516,103.866,1.516s77-.29,103.866-1.516c26.815-1.224,45.127-5.482,61.151-11.71a128.817,128.817,0,0,0,73.677-73.677c6.228-16.025,10.486-34.337,11.71-61.151,1.226-26.87,1.516-35.449,1.516-103.866s-0.29-77-1.516-103.866c-1.224-26.815-5.482-45.127-11.71-61.151a123.486,123.486,0,0,0-29.057-44.62A123.487,123.487,0,0,0,421.018,17.3C404.993,11.077,386.681,6.819,359.866,5.6,333,4.369,324.418,4.079,256,4.079h0Z"
      ></path>
      <path
        d="M256,126.635A129.365,129.365,0,1,0,385.365,256,129.365,129.365,0,0,0,256,126.635Zm0,213.338A83.973,83.973,0,1,1,339.974,256,83.974,83.974,0,0,1,256,339.973Z"
      ></path>
      <circle cx="390.476" cy="121.524" r="30.23"></circle>
    </svg>
  )
}

export default Instagram