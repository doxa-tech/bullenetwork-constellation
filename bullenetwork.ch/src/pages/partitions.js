import React from "react"
import Layout from "../components/layout-small"
import { Partition, TotalFiles } from "../components/partition"
import { StaticQuery, graphql } from "gatsby"
import { Component } from "react"
import Checkbox from "../components/checkbox"

export default class extends Component {

  state = {
    selectedFiles: 0,
    submitDisabled: true,
    filteredPartitions: this.props.data.truite.items.partitions
  };

  // fileSelected will be called each time a check box is checked, providing the
  // delta: 2 means 2 checkbox are activated. -2 means 2 have been de-activated.
  // This function is not called for the "select all" checkbox.
  fileSelected = (delta) => {
    const newTotal = this.state.selectedFiles + delta
    if (newTotal === 0) {
      this.downloadSubmit.disabled = true
      this.selectAllCheckbox.checked = false
      this.selectAllCheckbox.indeterminate = false
    } else if (newTotal === TotalFiles) {
      this.selectAllCheckbox.checked = true
      this.selectAllCheckbox.indeterminate = false
      this.downloadSubmit.disabled = false
    } else {
      this.selectAllCheckbox.indeterminate = true
      this.downloadSubmit.disabled = false
    }

    this.setState(state => ({
      selectedFiles: newTotal
    }))
  }

  selectAllClick = (event) => {
    const checked = event.target.checked
    document.getElementById("partitions-container").querySelectorAll("input[type=checkbox]").forEach(el => {
      el.checked = checked
      el.indeterminate = false
    })

    let selectedFiles = 0
    if (checked) {
      selectedFiles = document.querySelectorAll("#partitions-container .files .file input[type=checkbox]").length
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
      filteredPartitions: this.props.data.truite.items.partitions.filter(partition =>
        partition.title.toLowerCase().includes(query.toLowerCase()) || partition.bni.toString().includes(query))
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

              <div class="top-els">
                <DownloadSubmit totalFiles={this.state.selectedFiles} setRef={this.setDownloadSubmit} />
                <div class="search-container">
                  <input type="text" onChange={this.searchUpdate} placeholder="Recherche.." />
                  <div class="icon"><SearchIcon /></div>
                </div>
              </div>

              <div className="select-all">
                <Checkbox setRef={this.setSelectAllCheckbox} label="Tout sélectionner" onclick={this.selectAllClick} />
              </div>
              <div id="partitions-container">
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
                        partitions(sort:["-bni"]){
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