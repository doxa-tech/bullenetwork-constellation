import React from "react"
import Layout from "../components/layout-small"
import { Partition, resetTotal } from "../components/partition"
import { graphql } from "gatsby"
import { Component } from "react"
import Checkbox from "../components/checkbox"

export default class extends Component {

  state = {
    selectedFiles: 0,
    submitDisabled: true,
    filteredPartitions: this.props.data.truite.items.partitions,
    bniSortClass: "active",
    titleSortClass: "",
    queryContent: "",
    bniSortContent: "BNI ↑",
    titleSortContent: "Titre ↓"
  };

  // fileSelected will be called each time a check box is checked, providing the
  // delta: 2 means 2 checkbox are activated. -2 means 2 have been de-activated.
  // This function is not called for the "select all" checkbox.
  fileSelected = (delta) => {
    const newTotal = this.state.selectedFiles + delta

    this.checkFileStatus(newTotal, this.totalFile())

    this.setState(state => ({
      selectedFiles: newTotal
    }))
  }

  checkFileStatus = (selected, total) => {
    if (selected === 0) {
      this.downloadSubmit.disabled = true
      this.selectAllCheckbox.checked = false
      this.selectAllCheckbox.indeterminate = false
    } else if (selected === total) {
      this.selectAllCheckbox.checked = true
      this.selectAllCheckbox.indeterminate = false
      this.downloadSubmit.disabled = false
    } else {
      this.selectAllCheckbox.indeterminate = true
      this.downloadSubmit.disabled = false
    }
  }

  totalFile = () => {
    let total = 0;
    this.props.data.truite.items.partitions.forEach(partition => {
      total += partition.files.length
    })

    return total
  }

  selectAllClick = (event) => {
    const checked = event.target.checked
    document.getElementById("partitions").querySelectorAll("input[type=checkbox]").forEach(el => {
      el.checked = checked
      el.indeterminate = false
    })

    let selectedFiles = 0
    if (checked) {
      selectedFiles = document.querySelectorAll("#partitions .files .file input[type=checkbox]").length
      this.downloadSubmit.disabled = false
    } else {
      this.downloadSubmit.disabled = true
    }

    this.setState(state => ({
      selectedFiles: selectedFiles
    }))
  }

  setSelectAllCheckbox = (element) => {
    this.selectAllCheckbox = element
  }

  setDownloadSubmit = (element) => {
    this.downloadSubmit = element
  }

  searchUpdate = (event) => {
    const query = event.target.value

    this.setState(state => ({
      queryContent: query
    }))

    const newState = this.props.data.truite.items.partitions.filter(partition =>
      partition.title.toLowerCase().includes(query.toLowerCase()) || partition.bni.toString().includes(query))

    let total = 0
    newState.forEach(partition => {
      total += partition.files.lenght
    })

    this.setState(state => ({
      filteredPartitions: newState
    }))

    this.checkFileStatus(this.state.selectedFiles, total)
  }

  sortBNI = (event) => {
    if (event.target.classList.contains("active")) {
      if (event.target.dataset.sort === "asc") {
        event.target.dataset.sort = "desc"
      } else {
        event.target.dataset.sort = "asc"
      }
    }

    let reverse = false
    let content = "BNI ↓"
    if (event.target.dataset.sort === "desc") {
      reverse = true
      content = "BNI ↑"
    }

    const query = this.state.queryContent

    this.setState(state => ({
      bniSortClass: "active",
      titleSortClass: "",
      bniSortContent: content
    }))

    this.setState(state => ({
      filteredPartitions: this.props.data.truite.items.partitions.filter(partition =>
        partition.title.toLowerCase().includes(query.toLowerCase()) || partition.bni.toString().includes(query)).sort(
          (el1, el2) => {
            if (reverse) {
              return el1.bni < el2.bni
            }

            return el1.bni > el2.bni
          })
    }))
  }

  sortTitle = (event) => {
    if (event.target.classList.contains("active")) {
      if (event.target.dataset.sort === "asc") {
        event.target.dataset.sort = "desc"
      } else {
        event.target.dataset.sort = "asc"
      }
    }

    let reverse = false
    let content = "Title ↓"
    if (event.target.dataset.sort === "desc") {
      reverse = true
      content = "Title ↑"
    }

    const query = this.state.queryContent

    this.setState(state => ({
      bniSortClass: "",
      titleSortClass: "active",
      titleSortContent: content
    }))

    const comp = new Intl.Collator('fr')

    this.setState(state => ({
      filteredPartitions: this.props.data.truite.items.partitions.filter(partition =>
        partition.title.toLowerCase().includes(query.toLowerCase()) || partition.bni.toString().includes(query)).sort(
          (el1, el2) => {
            if (reverse) {
              return comp.compare(el1.title, el2.title) * -1
            }

            return comp.compare(el1.title, el2.title)
          })
    }))
  }

  render() {
    return (
      <Layout layoutClass="secondary-layout partitions-page" title="Partition" >
        <section className="main-section">
          <div className="section-container">
            <h1>Partitions du Bulle Network</h1>

            <form method="post" action={process.env.GCS_PROXY_ARCHIVE}>
              <input type="hidden" name="bucket" value="bullenetwork-directus-truite" />

              <div className="top-els">
                <DownloadSubmit totalFiles={this.state.selectedFiles} setRef={this.setDownloadSubmit} />
                <div className="search-container">
                  <input type="text" onChange={this.searchUpdate} placeholder="Recherche.." />
                  <div className="icon"><SearchIcon /></div>
                </div>
              </div>

              <div className="top-els-2">
                <div className="select-all">
                  <Checkbox setRef={this.setSelectAllCheckbox} label="Tout sélectionner" onclick={this.selectAllClick} />
                </div>
                <div className="sort-container">
                  <p>
                    <span>Trier par:</span>
                    <span role="button" tabIndex={0} data-sort="desc" className={this.state.bniSortClass} onKeyDown={this.sortBNI} onClick={this.sortBNI}>{this.state.bniSortContent}</span>
                    <span className="separator">|</span>
                    <span role="button" tabIndex={-1} data-sort="asc" className={this.state.titleSortClass} onKeyDown={this.sortTitle} onClick={this.sortTitle}>{this.state.titleSortContent}</span>
                  </p>
                </div>
              </div>


              <div id="partitions">
                {this.state.filteredPartitions.map((partition) => <Partition key={`${partition.bni}`} partition={partition} fileSelected={this.fileSelected} />)}
              </div>
            </form>
          </div>
        </section>
      </Layout>
    )
  }
}

const DownloadSubmit = ({ totalFiles, setRef, disabled }) => {
  return (
    <input disabled={true} className="download" type="submit" ref={setRef} value={`Télécharger ${totalFiles}`} />
  )
}

export const partitionsQuery = graphql`
                  query {
                    truite {
                      items {
                        partitions(sort:["-bni"],limit:-1){
                          bni
                          title
                          comments
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
                  }
                `

const SearchIcon = () => {
  return (
    <svg viewBox="0 0 1414 1519" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "1.5" }}>
      <g transform="matrix(1,0,0,1,-1206.57,-1347.06)">
        <circle cx="1813.17" cy="1953.66" r="523.269" style={{ fill: "none", stroke: "rgb(35,31,32)", strokeWidth: "166.67px" }} />
      </g>
      <g transform="matrix(1,0,0,1,-1419.84,-939.259)">
        <path d="M2373.49,1943.19L2749.74,2373.95" style={{ fill: "none", stroke: "rgb(35,31,32)", strokeWidth: "166.67px" }} />
      </g>
    </svg>
  )
}