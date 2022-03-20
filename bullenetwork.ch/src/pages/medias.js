import React, { useEffect, useRef, useState } from "react"
import Layout from "../components/layout-small"
import Media from "../components/media"
import { graphql } from "gatsby"
import Checkbox from "../components/checkbox"
import Sorter from "../components/medias/sorter"
import SearchIcon from "../components/medias/searchIcon"

const DefaultSorter = {
  attribute: "date",
  order: "desc",
}

const Medias = ({ data }) => {

  const [totalFiles, setTotalFiles] = useState(0);
  const [totalSelectedFiles, setTotalSelectedFiles] = useState(0);

  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState("");
  const [sorter, setSorter] = useState(DefaultSorter);

  const checkboxRef = useRef();

  // Update the entries each time the sorter or the query change. When that
  // happens we filter and sort accordingly.
  useEffect(() => {
    const comp = new Intl.Collator('fr')
    const reverse = sorter.order === "desc";

    const filtered = data.directus.Medias.filter(media =>
      media.title.toLowerCase().includes(query.toLowerCase()) ||
      media.date.toString().includes(query)
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

  }, [query, sorter])

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

  return (
    <Layout layoutClass="secondary-layout partitions-page" title="Partition" >
      <section className="main-section medias">
        <div className="section-container">
          <h1>Médias du Bulle Network</h1>

          <form method="post" action={process.env.GCS_PROXY_MEDIAS_ARCHIVE}>
            <input type="hidden" name="bucket" value="bullenetwork-directus-truite" />

            <div className="top-els">
              <input disabled={totalSelectedFiles == 0} className="download" type="submit" value={`Télécharger ${totalSelectedFiles}`} />
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
                  <Sorter title="Date" attribute="date" sortHandler={sortHandler} currentSorter={sorter.attribute} />
                  <span className="separator">|</span>
                  <Sorter title="Titre" attribute="title" sortHandler={sortHandler} currentSorter={sorter.attribute} />
                  <span className="separator">|</span>
                  <Sorter title="Auteur" attribute="author" sortHandler={sortHandler} currentSorter={sorter.attribute} />
                  <span className="separator">|</span>
                  <Sorter title="Lieu" attribute="location" sortHandler={sortHandler} currentSorter={sorter.attribute} />
                </p>
              </div>
            </div>


            <div id="partitions">
              {entries.map((media) => <Media key={`${media.id}`} media={media} fileSelected={fileSelected} />)}
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export default Medias

export const query = graphql`
  query {
    directus {
      Medias(sort:["-date"],limit:-1){
        author
        location
        status
        comments
        id
        title
        date
        files {
          id
          directus_files_id {
            filename_disk
            filename_download
          }
        }
      }
    }
  }
`