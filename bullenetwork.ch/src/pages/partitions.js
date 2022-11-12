import React, { useContext, useEffect, useRef, useState } from "react"
import Partition from "../components/partition"
import Checkbox from "../components/checkbox"
import Sorter from "../components/medias/sorter"
import SearchIcon from "../components/medias/searchIcon"
import Spinner from "../components/spinner"
import { LoginIcon, LogoutIcon, SecureContext, SecureDirectus } from "../components/securedirectus"

const DefaultSorter = {
  attribute: "bni",
  order: "desc",
}

export const Partitions = () => {
  const { accessToken, handleError } = useContext(SecureContext);

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

    fetch(process.env.GCS_ARCHIVE_ENDPOINT, {
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
            <LogoutIcon /> :
            <LoginIcon />
          }
        </div>

        <form method="post" id="archive-form" onSubmit={formSubmit} action={process.env.GCS_ARCHIVE_ENDPOINT}>
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

const SecurePartition = () => {
  return (
    <SecureDirectus email="louange-viewer@bullenetwork.ch" className="partitions-page">
      <Partitions />
    </SecureDirectus>
  )
}

export default SecurePartition