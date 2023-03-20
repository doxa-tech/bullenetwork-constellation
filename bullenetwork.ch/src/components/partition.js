import React, { useRef, useState, useContext } from "react"
import Checkbox from "./checkbox";
import { SecureContext } from "./securedirectus";
import Spinner from "./spinner";

const Partition = ({ partition, fileSelected }) => {
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
      <div className="main" role="button" tabIndex={partition.bni} onKeyDown={sectionClick} onClick={sectionClick}>
        <div className="row">
          <div className="bni">{partition.bni}</div>
          <div className="title">{partition.title}</div>
          <Tags tags={partition.tags} />
          <div className="files">Partition ({partition.files ? partition.files.length : "0"})</div>
          <Arrow />
        </div>
        <Extra setRef={extraRef} onclick={extraClick} partition={partition} checkboxNotify={checkboxChildNotify} />
      </div>
    </div >
  )
}

export default Partition

const Arrow = () => {
  return (
    <svg className="arrow" width="100%" height="100%" viewBox="0 0 448 463" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(4.53694e-17,0.740939,-1.2877,7.88491e-17,1533.94,-2052.72)">
        <path d="M2770.44,1070.98C2770.44,1082.6 2786.8,1092.01 2806.99,1092.01L3056.14,1092.01C3056.14,1092.01 3056.14,1170.18 3056.14,1170.18C3056.14,1178.69 3065.04,1186.36 3078.7,1189.62C3092.36,1192.87 3108.08,1191.07 3118.53,1185.06L3383.78,1032.44C3398.06,1024.22 3398.06,1010.91 3383.78,1002.69L3118.53,850.07C3108.08,844.055 3092.36,842.256 3078.7,845.511C3065.04,848.767 3056.14,856.436 3056.14,864.942L3056.14,943.114C2979.08,943.114 2806.99,943.114 2806.99,943.114C2786.8,943.114 2770.44,952.531 2770.44,964.146L2770.44,1070.98Z" />
      </g>
    </svg>
  )
}

const Extra = ({ setRef, onclick, partition, checkboxNotify }) => {
  return (
    <div className="extra" role="none" ref={setRef} onKeyDown={onclick} onClick={onclick}>
      <Files files={partition.files} notify={checkboxNotify} />
      {partition.comments ? <Notes partition={partition} /> : ""}
    </div>
  )
}

const Notes = ({ partition }) => {
  return (
    <div className="notes">
      <div dangerouslySetInnerHTML={{ __html: partition.comments }} />
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

    fetch(process.env.GATSBY_GCS_AUTH_ENDPOINT, {
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

const Tags = ({ tags }) => {
  const tagNameToSVG = {
    "dynamic": <DynamicSong />,
  }

  return (
    <div className="tags">
      {tags !== null && tags.map((t) => (
        tagNameToSVG[t]
      ))}
    </div>
  )
}

const DynamicSong = () => (
  <svg className="dynamic" viewBox="0 0 2481 2481">
    <title>Chant dynamique</title>
    <g transform="matrix(1,0,0,1,-3730.44,0)">
      <g transform="matrix(1,0,0,1,3730.44,0)">
        <circle cx="1240.16" cy="1240.16" r="1240.16" />
        <g transform="matrix(1,0,0,1,85.144,66.5814)">
          <g transform="matrix(3.7304,0,0,3.7304,-65.5343,195.658)">
            <path d="M460.07,89.129C461.625,89.906 463.426,90.039 465.078,89.488C466.73,88.942 468.097,87.758 468.875,86.203L502.781,18.578C504.406,15.336 503.097,11.395 499.859,9.77C496.617,8.145 492.675,9.453 491.05,12.695L457.144,80.32C456.363,81.875 456.234,83.676 456.781,85.328C457.332,86.98 458.511,88.348 460.07,89.129L460.07,89.129Z" />
          </g>
          <g transform="matrix(3.7304,0,0,3.7304,-65.5343,195.658)">
            <path d="M475.04,107.58C475.938,109.072 477.392,110.15 479.079,110.568C480.771,110.99 482.556,110.725 484.048,109.826L555.919,66.638L555.919,66.642C558.985,64.755 559.962,60.755 558.106,57.669C556.255,54.583 552.263,53.568 549.157,55.392L477.286,98.576C474.181,100.443 473.177,104.474 475.04,107.58L475.04,107.58Z" />
          </g>
          <g transform="matrix(3.7304,0,0,3.7304,-65.5343,195.658)">
            <path d="M565.48,120.85L565.41,120.85L491.801,121.616C488.176,121.635 485.25,124.588 485.269,128.213C485.289,131.838 488.242,134.76 491.867,134.741L491.937,134.741L565.542,133.975L565.539,133.975C569.164,133.959 572.085,131.006 572.07,127.381C572.05,123.756 569.097,120.834 565.472,120.85L565.48,120.85Z" />
          </g>
          <g transform="matrix(3.7304,0,0,3.7304,-65.5343,195.658)">
            <path d="M508.49,184.03C502.138,182.807 495.56,184.077 490.115,187.573C489.392,178.108 483.705,169.737 475.17,165.573C466.639,161.413 456.537,162.085 448.631,167.339L417.518,188.027L434.252,161.644C438.752,154.675 439.389,145.894 435.943,138.347C432.498,130.804 425.443,125.535 417.228,124.37L429.962,106.323C435.107,99.069 436.08,89.655 432.529,81.503C428.974,73.35 421.412,67.655 412.595,66.487C403.782,65.319 394.997,68.854 389.447,75.799C385.751,67.049 377.693,60.916 368.279,59.686C358.861,58.452 349.498,62.307 343.677,69.811L266.747,168.999C265.676,168.351 264.559,167.784 263.407,167.3C259.966,165.804 256.18,165.292 252.466,165.823C248.755,166.355 245.263,167.909 242.384,170.312C235.892,175.421 235.083,183.992 233.966,195.855L233.775,197.859L231.478,211.445C227.681,215.116 222.169,220.249 218.615,223.453C218.251,223.777 217.892,224.101 217.54,224.425C216.13,203.269 210.658,172.484 202.681,155.468C197.025,143.406 182.185,129.765 168.076,128.765L168.073,128.765C164.334,128.437 160.576,129.156 157.225,130.843C153.869,132.527 151.053,135.117 149.088,138.312C144.92,144.668 146.244,152.269 148.588,162.476C149.014,164.335 149.385,166.214 149.693,168.097L153.783,193.335C155.4,203.562 154.971,214.011 152.521,224.073L147.221,245.987C143.541,261.846 154.518,332.046 161.385,372.477C162.049,376.391 161.025,380.407 158.564,383.524L131.857,432.962L130.939,433.56L130.936,433.56C129.396,434.564 128.35,436.169 128.049,437.982C127.744,439.794 128.221,441.654 129.35,443.099L211.666,548.399L211.666,548.403C212.759,549.797 214.369,550.692 216.13,550.883C216.365,550.911 216.603,550.922 216.837,550.922C218.365,550.922 219.845,550.387 221.025,549.415L293.611,489.302C295.986,487.333 298.205,485.208 300.056,483.384C304.349,479.153 309.513,475.915 315.193,473.903C337.201,466.071 370.615,441.286 404.572,407.606L480.631,339.477L480.631,339.473C486.526,334.403 490.53,327.481 491.983,319.84C493.44,312.2 492.264,304.289 488.647,297.402L488.335,296.805L505.327,283.243L505.327,283.246C511.796,278.075 515.19,269.969 514.335,261.73C513.479,253.496 508.491,246.257 501.097,242.527L518.827,229.433C524.159,225.496 527.741,219.637 528.811,213.097C529.881,206.558 528.358,199.859 524.561,194.429C520.768,189 515.002,185.265 508.491,184.023L508.49,184.03ZM354.05,77.85C358.316,72.381 366.007,70.979 371.925,74.592C377.847,78.209 380.116,85.69 377.198,91.983L292.495,213.123C291.488,214.545 291.089,216.315 291.386,218.033C291.683,219.756 292.656,221.287 294.085,222.287C295.511,223.291 297.281,223.682 299.003,223.377C300.722,223.072 302.245,222.092 303.242,220.658L399.398,84.328C403.437,79.012 410.988,77.902 416.386,81.832C421.784,85.762 423.046,93.289 419.225,98.766L324.823,232.526C323.773,233.944 323.339,235.729 323.62,237.471C323.898,239.218 324.87,240.772 326.312,241.792C327.757,242.811 329.55,243.206 331.284,242.886C333.023,242.565 334.558,241.561 335.542,240.096L405.046,141.612L405.05,141.612C408.73,136.819 415.566,135.847 420.437,139.425C425.222,142.944 426.433,149.589 423.191,154.57L390.636,205.898L314.726,256.371C307.316,261.293 297.195,266.465 284.648,271.73C283.046,272.402 281.535,273.05 280.07,273.699C285.394,253.222 289.914,222.379 287.742,203.64C286.789,195.401 282.66,185.456 276.527,177.804L354.05,77.85ZM169.24,391.18C173.736,385.207 175.576,377.649 174.33,370.278C163.424,306.09 157.803,258.468 159.994,249.018L165.287,227.166L165.287,227.162C168.142,215.424 168.642,203.232 166.756,191.299L162.474,165.076C162.166,163.201 161.799,161.338 161.373,159.486C159.908,153.096 158.799,147.443 160.068,145.509C161.467,142.97 164.263,141.525 167.146,141.857C174.939,142.412 186.435,151.732 190.798,161.041C199.744,180.123 205.782,222.197 204.673,238.201C200.494,244.053 197.134,250.447 194.681,257.209C193.322,260.615 194.939,264.482 198.318,265.908C199.947,266.549 201.763,266.51 203.365,265.803C204.966,265.096 206.216,263.779 206.841,262.147C212.115,248.385 216.919,242.616 227.134,233.444C225.111,240.237 222.173,246.721 218.404,252.725L206.416,271.807C197.884,285.674 185.998,355.733 179.67,396.257L179.666,396.257C179.053,400.175 176.806,403.643 173.49,405.811L154.814,417.987L169.24,391.18ZM511.04,218.88L368.49,324.16C367.068,325.187 366.119,326.738 365.849,328.472C365.58,330.203 366.013,331.969 367.053,333.379C368.096,334.789 369.658,335.722 371.392,335.976C373.127,336.226 374.888,335.773 376.287,334.719L485.277,254.219C490.191,251.793 496.136,253.308 499.293,257.785C502.711,262.625 501.766,269.289 497.141,272.988L380.411,366.176C377.579,368.438 377.114,372.567 379.375,375.399C381.637,378.231 385.766,378.696 388.598,376.434L477.821,305.207C479.548,309.355 479.919,313.945 478.884,318.316C477.844,322.691 475.454,326.624 472.048,329.554L395.337,398.284C356.888,436.421 326.454,455.964 310.798,461.538C303.317,464.19 296.513,468.452 290.864,474.022C289.125,475.733 287.239,477.541 285.246,479.194L217.855,535.003L144.093,440.648L180.652,416.804L180.656,416.804C187.09,412.605 191.441,405.874 192.633,398.281C202.68,333.941 212.477,286.991 217.559,278.731L229.512,259.7L229.516,259.7C235.954,249.477 240.301,238.075 242.305,226.161L246.762,199.806C246.79,199.653 246.809,199.493 246.825,199.337L247.04,197.079C247.758,189.454 248.438,182.247 250.508,180.618L250.504,180.622C252.637,178.661 255.743,178.185 258.364,179.411C265.583,182.415 273.524,194.919 274.704,205.141C277.13,226.118 269.645,267.649 263.563,282.563L263.567,282.563C257.59,286.86 252.243,291.973 247.68,297.747C245.375,300.544 245.774,304.681 248.57,306.986C251.367,309.29 255.5,308.892 257.809,306.095C268.028,293.697 274.676,290.142 289.731,283.829C303.043,278.243 313.903,272.681 321.997,267.294L455.907,178.263L455.903,178.267C459.157,176.072 463.207,175.411 466.989,176.454C471.629,177.712 475.266,181.314 476.575,185.939C477.883,190.564 476.665,195.536 473.372,199.037L344.492,293.998C343.042,295.009 342.062,296.564 341.773,298.306C341.488,300.052 341.913,301.838 342.96,303.263C344.007,304.685 345.581,305.631 347.331,305.877C349.081,306.123 350.859,305.654 352.257,304.576L496.827,198.846C502.358,195.053 509.909,196.401 513.784,201.869C517.663,207.338 516.433,214.908 511.026,218.869L511.04,218.88Z" />
          </g>
        </g>
      </g>
    </g>
  </svg>
)