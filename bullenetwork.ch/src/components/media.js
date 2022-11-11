import React, { useRef, useState, useContext } from "react"
import Checkbox from "./checkbox";
import { SecureContext } from "./securedirectus";
import Spinner from "./spinner";

const Media = ({ media, fileSelected }) => {
  const [isActive, setIsActive] = useState(false)
  const extraRef = useRef()
  const maincheckboxRef = useRef()

  const checkboxClick = (event) => {
    event.stopPropagation();

    let delta = 0

    const checked = event.target.checked
    const checkboxes = extraRef.current.querySelectorAll('input[type="checkbox"]')
    checkboxes.forEach(checkbox => {
      if (checkbox.checked !== checked) {
        delta += 1
        checkbox.checked = checked
      }
    })

    if (!checked) {
      delta = delta * -1
    }

    fileSelected(delta)
  };

  const checkboxChildNotify = (event) => {
    let delta = 1
    if (!event.target.checked) {
      delta = delta * -1
    }
    fileSelected(delta)

    const totlaChecked = extraRef.current.querySelectorAll('input[type="checkbox"]:checked').length
    const totalCheckboxes = extraRef.current.querySelectorAll('input[type="checkbox"]').length

    if (totlaChecked === totalCheckboxes) {
      maincheckboxRef.current.checked = true
      maincheckboxRef.current.indeterminate = false;
    } else if (totlaChecked === 0) {
      maincheckboxRef.current.checked = false
      maincheckboxRef.current.indeterminate = false;
    } else {
      maincheckboxRef.current.indeterminate = true;
    }
  }

  const extraClick = (event) => {
    event.stopPropagation();
  };

  const sectionClick = (e) => {
    setIsActive(!isActive)
  }

  return (
    <div className={isActive ? 'active partition' : "partition"}>
      <div className="main-checkbox">
        <Checkbox setRef={maincheckboxRef} onclick={checkboxClick} />
      </div>
      <div className="main" role="button" tabIndex={media.id} onKeyDown={sectionClick} onClick={sectionClick}>
        <div className="row">
          <div className="date">{new Intl.DateTimeFormat('fr-CH', { dateStyle: 'full' }).format(new Date(media.date))}</div>
          <div className="title">{media.title} <span className="location">{media.location}</span> <span className="author">{media.author}</span></div>
          <div className="files">Média ({media.files ? media.files.length : "0"})</div>
          <Arrow />
        </div>
        <Extra setRef={extraRef} onclick={extraClick} media={media} checkboxNotify={checkboxChildNotify} />
      </div>
    </div >
  )
}

export default Media

const Arrow = () => {
  return (
    <svg className="arrow" width="100%" height="100%" viewBox="0 0 448 463" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(4.53694e-17,0.740939,-1.2877,7.88491e-17,1533.94,-2052.72)">
        <path d="M2770.44,1070.98C2770.44,1082.6 2786.8,1092.01 2806.99,1092.01L3056.14,1092.01C3056.14,1092.01 3056.14,1170.18 3056.14,1170.18C3056.14,1178.69 3065.04,1186.36 3078.7,1189.62C3092.36,1192.87 3108.08,1191.07 3118.53,1185.06L3383.78,1032.44C3398.06,1024.22 3398.06,1010.91 3383.78,1002.69L3118.53,850.07C3108.08,844.055 3092.36,842.256 3078.7,845.511C3065.04,848.767 3056.14,856.436 3056.14,864.942L3056.14,943.114C2979.08,943.114 2806.99,943.114 2806.99,943.114C2786.8,943.114 2770.44,952.531 2770.44,964.146L2770.44,1070.98Z" />
      </g>
    </svg>
  )
}

const Extra = ({ setRef, onclick, media, checkboxNotify }) => {
  return (
    <div className="extra" role="none" ref={setRef} onKeyDown={onclick} onClick={onclick}>
      <Files files={media.files} notify={checkboxNotify} />
      {media.comments ? <Notes media={media} /> : ""}
    </div>
  )
}

const Notes = ({ media }) => {
  return (
    <div className="notes">
      <div dangerouslySetInnerHTML={{ __html: media.comments }} />
    </div>
  )
}

const Files = ({ files, notify }) => {
  return (
    <div className="files">
      {files.map((file) => <File key={`${file.directus_files_id.filename_disk}`} file={file} notify={notify} />)}
    </div>
  )
}

const File = ({ file, notify }) => {
  const { accessToken, handleError } = useContext(SecureContext);

  const filename = file.directus_files_id.filename_download

  const handleClick = () => {
    setLink(<>Chargement <div style={{ scale: "0.3", translate: "10px -10px" }}><Spinner /></div></>);

    // this makes the trick to not being blocked as a popup in safari
    // https://stackoverflow.com/a/39387533
    var windowReference = window.open();
    windowReference.document.body.innerHTML = `<div style="text-align:center;padding-top:10%;font-size:14px;">chargement...</div>`;

    const fileID = file.directus_files_id.id;
    const body = `id=${fileID}&access_token=${accessToken}`;

    fetch(process.env.GCS_AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body
    }).then(res => {
      if (!res.ok) {
        windowReference.close();

        res.json().then((resp) => {
          // 10 means the auth service got a Directus error
          if (resp.error.code === 10) {
            handleError(resp.error.data)
            setLink("");
          } else {
            setLink(resp.error.message);
          }
        }).catch((e) => {
          setLink(`error: ${res.statusText} - ${e}`)
        })
        return
      }
      res.text().then((t) => {
        if (!res.ok) {
          windowReference.close();
          setLink(`error: ${t}`);
        } else {
          windowReference.location = t;
          setLink(<a href={t} rel="noopener noreferrer" target="_blank">{filename}</a>)

          setTimeout(function () {
            setLink("");
            // the url expires after 10 minutes, we wait 10 minutes - 10 seconds
          }, (10 * 60 - 10) * 1000);
        }
      })
    }).catch((e) => {
      setLink(`error: ${e}`)
      windowReference.close();
    })
  }

  const [link, setLink] = useState("");
  return (
    <div className="file">
      <Checkbox onclick={notify} name={file.directus_files_id.id} value={filename} />
      {link === "" ? <button onClick={handleClick}>{filename}</button> : link}
    </div>
  )
}