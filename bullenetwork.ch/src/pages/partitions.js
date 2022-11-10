import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import Layout from "../components/layout-small"
import Partition from "../components/partition"
import Checkbox from "../components/checkbox"
import Sorter from "../components/medias/sorter"
import SearchIcon from "../components/medias/searchIcon"
import { Login } from "../components/login"
import Spinner from "../components/spinner"
import { navigate } from "gatsby"

const DefaultSorter = {
  attribute: "bni",
  order: "desc",
}

export const Partitions = () => {
  const { accessToken, handleError } = useContext(PartitionsContext);

  const [totalFiles, setTotalFiles] = useState(0);
  const [totalSelectedFiles, setTotalSelectedFiles] = useState(0);

  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState("");
  const [sorter, setSorter] = useState(DefaultSorter);
  const [rawdata, setRawdata] = useState([])

  const [archiveInfo, setArchiveInfo] = useState("");

  const checkboxRef = useRef();

  const partitionsQuery = {
    "query": `query {
      partitions(sort:["-bni"],limit:-1) {
        bni
        title
        comments
        files {
          id
          directus_files_id {
            id
            filename_disk
            filename_download
          }
        }
      }
    }`
  }

  useEffect(() => {
    if (!accessToken || accessToken === "") {
      return
    }

    fetch("https://vanil.bullenetwork.ch/graphql", {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + accessToken
      },
      body: JSON.stringify(partitionsQuery)
    }).then((req) => {
      return req.json();
    }).then((response) => {
      if (response.errors) {
        handleError(response)
      } else {
        setRawdata(response.data.partitions)
      }
    })
  }, [accessToken])

  // Update the entries each time the sorter or the query change. When that
  // happens we filter and sort accordingly.
  useEffect(() => {
    const comp = new Intl.Collator('fr')
    const reverse = sorter.order === "desc";

    const filtered = rawdata.filter(partition =>
      partition.title.toLowerCase().includes(query.toLowerCase()) ||
      partition.bni.toString().includes(query)
    )

    const sorted = filtered.sort(
      (el1, el2) => {
        const notN = typeof el1[sorter.attribute] != "number"
        let res;
        if (notN) {
          res = comp.compare(el1[sorter.attribute], el2[sorter.attribute])
        } else {
          res = el1[sorter.attribute] - el2[sorter.attribute] ? 1 : -1
        }

        return reverse ? res * -1 : res
      })

    setEntries(sorted)

  }, [query, sorter, rawdata])

  // update the total files when the list of entries change
  useEffect(() => {
    let total = 0
    entries.forEach(partition => {
      total += partition.files.length
    })

    setTotalFiles(total)
  }, [entries])

  // update the "total file checkbox" when the "totalFiles" or
  // "totalSelectedFiles" props change.
  useEffect(() => {
    if (totalSelectedFiles === 0) {
      checkboxRef.current.checked = false
      checkboxRef.current.indeterminate = false
    } else if (totalSelectedFiles === totalFiles) {
      checkboxRef.current.checked = true
      checkboxRef.current.indeterminate = false
    } else {
      checkboxRef.current.indeterminate = true
    }
  }, [totalFiles, totalSelectedFiles])

  // fileSelected will be called each time a check box is checked, providing the
  // delta: 2 means 2 checkbox are activated. -2 means 2 have been de-activated.
  // This function is not called for the "select all" checkbox.
  const fileSelected = (delta) => {
    setTotalSelectedFiles(totalSelectedFiles + delta)
  }

  const selectAllClick = (event) => {
    const checked = event.target.checked
    document.getElementById("partitions").querySelectorAll("input[type=checkbox]").forEach(el => {
      el.checked = checked
      el.indeterminate = false
    })

    let selectedFiles = 0
    if (checked) {
      selectedFiles = document.querySelectorAll("#partitions .files .file input[type=checkbox]").length
    }

    setTotalSelectedFiles(selectedFiles)
  }

  const sortHandler = (order, attribute) => {
    setSorter({
      attribute: attribute,
      order: order,
    })
  }

  const formSubmit = (e) => {
    e.preventDefault();

    setArchiveInfo(<div style={{ scale: "0.3", translate: "10px -10px" }}><Spinner /></div>);

    const form = document.getElementById("archive-form");

    const data = new URLSearchParams();
    for (const pair of new FormData(form)) {
      data.append(pair[0], pair[1]);
    }

    fetch(process.env.GCS_PROXY_PARTITION_ARCHIVE, {
      method: 'post',
      body: data,
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((resp) => {
            // 10 means the auth service got a Directus error
            if (resp.error.code === 10) {
              handleError(resp.error.data)
              setArchiveInfo("");
            } else {
              setArchiveInfo(resp.error.message);
            }
          })
          return
        }
        res.blob().then((bytes) => {
          const elm = document.createElement('a');
          elm.href = URL.createObjectURL(bytes);
          elm.setAttribute('download', "bullenetwork.zip");
          elm.click();
        })
        setArchiveInfo("");
      }).catch((e) => {
        setArchiveInfo(e);
      });
  }

  return (
    <section className="main-section">
      <div className="section-container">
        <div className="top-title">
          <h1>Partitions du Bulle Network</h1>
          {accessToken !== "" ?
            <Logout /> :
            <LoginIcon />
          }
        </div>

        <form method="post" id="archive-form" onSubmit={formSubmit} action={process.env.GCS_PROXY_PARTITION_ARCHIVE}>
          <input type="hidden" name="bucket" value="bullenetwork-directus-vanil" />
          <input type="hidden" name="access_token" value={accessToken} />

          <div className="top-els">
            <div className="archive">
              <input disabled={totalSelectedFiles === 0} className="download" type="submit" value={`Télécharger ${totalSelectedFiles}`} />
              <div className="info">{archiveInfo}</div>
            </div>
            <div className="search-container">
              <input type="text" onChange={event => setQuery(event.target.value)} placeholder="Recherche.." />
              <div className="icon"><SearchIcon /></div>
            </div>
          </div>

          <div className="top-els-2">
            <div className="select-all">
              <Checkbox setRef={checkboxRef} label="Tout sélectionner" onclick={selectAllClick} />
            </div>
            <div className="sort-container">
              <p>
                <span>Trier par:</span>
                <Sorter title="BNI" attribute="bni" sortHandler={sortHandler} currentSorter={sorter.attribute} />
                <span className="separator">|</span>
                <Sorter title="Titre" attribute="title" sortHandler={sortHandler} currentSorter={sorter.attribute} />
              </p>
            </div>
          </div>


          <div id="partitions">
            {entries.map((partition) => <Partition key={`${partition.bni}`} partition={partition} fileSelected={fileSelected} />)}
          </div>
        </form>
      </div>
    </section>
  )
}

export const PartitionsContext = createContext(null);

const SecurePartition = () => {
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth_info = JSON.parse(window.localStorage.getItem(`bn_auth_partitions`));
    if (auth_info) {
      setAccessToken(auth_info[0].access_token);
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, [])

  useEffect(() => {
    if (accessToken === "") {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [accessToken])

  const handleError = (response) => {

    if (response.errors.length === 0) {
      setError("Empty error, please login.");
      setShowLogin(true);
      return
    }

    if (response.errors[0].extensions.code === "TOKEN_EXPIRED") {
      const auth_info = JSON.parse(window.localStorage.getItem(`bn_auth_partitions`));

      if (!auth_info) {
        setError("Please login.")
        setShowLogin(true);
        return
      }

      const data = { refresh_token: auth_info[0].refresh_token, mode: "json" }

      fetch("https://vanil.bullenetwork.ch/auth/refresh", {
        method: 'POST', headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((req) => req.json())
        .then((resp) => {
          if (resp.errors) {
            throw "Failed to refresh:" + resp.errors[0].message;
          } else if (resp.data) {
            localStorage.setItem(`bn_auth_partitions`, JSON.stringify([resp.data]));
            setAccessToken(resp.data.access_token);
            console.log("set new access token:", resp.data.access_token);
          } else {
            throw "bad response:" + JSON.stringify(resp);
          }
        }).catch((e) => {
          setError(e);
          setShowLogin(true);
          return null
        })
    } else {
      setError("Erreur de login: " + response.errors[0].message);
      setShowLogin(true);
    }
  }

  const logout = () => {
    localStorage.removeItem(`bn_auth_partitions`);
    setAccessToken("");
    console.log("set access token to empty");
    navigate("/");
  }

  const login = () => {
    setShowLogin(true);
  }

  return (
    <Layout layoutClass="secondary-layout partitions-page" title="Partition" >
      {showLogin &&
        <Login setAccessToken={setAccessToken} setShowLogin={setShowLogin} error={error} />
      }
      <PartitionsContext.Provider value={{ accessToken, handleError, logout, login }}>
        <Partitions />
      </PartitionsContext.Provider >
    </Layout>
  )
}

export default SecurePartition

const Logout = () => {
  const { logout } = useContext(PartitionsContext);

  return (
    <svg onClick={logout} title="logout" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 384.971 384.971">
      <title>Se déconnecter</title>
      <g>
        <g id="Sign_Out">
          <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
			C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
			C192.485,366.299,187.095,360.91,180.455,360.91z"/>
          <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
			c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
			c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
        </g>
      </g>
    </svg>
  )
}

const LoginIcon = () => {
  const { login } = useContext(PartitionsContext);

  return (
    <svg className="login" onClick={login} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 330 330">
      <title>Se connecter</title>
      <g>
        <path d="M305,149.998H121.215l44.392-44.392c5.858-5.858,5.858-15.355,0-21.213c-5.857-5.858-15.355-5.858-21.213,0l-69.998,69.998
		c-5.858,5.857-5.858,15.355,0,21.213l69.998,70.002c2.929,2.929,6.767,4.394,10.606,4.394c3.838-0.001,7.678-1.465,10.606-4.393
		c5.857-5.858,5.858-15.355,0-21.213l-44.394-44.396H305c8.284,0,15-6.716,15-15C320,156.714,313.284,149.998,305,149.998z"/>
        <path d="M155,300H40V30h115c8.284,0,15-6.716,15-15s-6.716-15-15-15H25c-8.284,0-15,6.716-15,15v300c0,8.284,6.716,15,15,15h130
		c8.284,0,15-6.716,15-15S163.284,300,155,300z"/>
      </g>
    </svg>
  )
}