import React, { useState, useEffect } from "react"
import Layout from "../components/layout-small"
import Intro from "../components/intro"
import Menu from "../components/menu"
import Partition from "../components/partition"
import { graphql } from 'gatsby'

export default ({ data }) => {

  console.log(data)

  return (
    <Layout layoutClass="secondary-layout partitions-page" title="Partition">
      <section class="main-section">
        <div class="section-container">
          <h1>Partitions du Bulle Network</h1>
          {data.truite.items.partitions.map((partition) => <Partition partition={partition} />)}
        </div>
      </section>
    </Layout>
  )
}


export const query = graphql`
  query {
    truite {
      items {
        partitions(sort:["bni"]){
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