import React, { Component, useState, useEffect } from "react"

class Partition extends Component {

  state = {
    isActive: false,
  };

  handleClick = () => {
    this.setState(state => ({ isActive: !state.isActive }));
  };

  extraClick = (event) => {
    event.stopPropagation();
  };

  render() {

    return (
      <div className={this.state.isActive ? 'active partition' : "partition"} onClick={this.handleClick}>
        <div class="row">
          <div class="bni">{this.props.partition.bni}</div>
          <div class="title">{this.props.partition.title}</div>
          <div class="files">Partition ({this.props.partition.files ? this.props.partition.files.length : "0"})</div>
          <Arrow />
        </div>
        <div class="extra" onClick={this.extraClick}>
          {this.props.partition.files ? <Files files={this.props.partition.files} /> : ""}
          {this.props.partition.comments ? <Notes partition={this.props.partition} /> : ""}
        </div>
      </div>
    )
  }
}

const Arrow = () => {
  return (
    <svg class="arrow" width="100%" height="100%" viewBox="0 0 448 463" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(4.53694e-17,0.740939,-1.2877,7.88491e-17,1533.94,-2052.72)">
        <path d="M2770.44,1070.98C2770.44,1082.6 2786.8,1092.01 2806.99,1092.01L3056.14,1092.01C3056.14,1092.01 3056.14,1170.18 3056.14,1170.18C3056.14,1178.69 3065.04,1186.36 3078.7,1189.62C3092.36,1192.87 3108.08,1191.07 3118.53,1185.06L3383.78,1032.44C3398.06,1024.22 3398.06,1010.91 3383.78,1002.69L3118.53,850.07C3108.08,844.055 3092.36,842.256 3078.7,845.511C3065.04,848.767 3056.14,856.436 3056.14,864.942L3056.14,943.114C2979.08,943.114 2806.99,943.114 2806.99,943.114C2786.8,943.114 2770.44,952.531 2770.44,964.146L2770.44,1070.98Z" />
      </g>
    </svg>
  )
}

export default Partition

const Notes = ({ partition }) => {
  return (
    <div class="notes">
      <div dangerouslySetInnerHTML={{ __html: partition.comments }} />
    </div>
  )
}

const Files = ({ files }) => {
  return (
    <div class="files">
      {files.map((file) => <div class="file"><File file={file} /></div>)}
    </div>
  )
}

class File extends Component {

  filename = this.props.file.directus_files_id.filename_download

  handleClick = () => {
    this.setState(state => ({
      button: <button>chargement...</button>
    }))

    console.log(process.env)

    fetch(process.env.GCS_PROXY, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `bucket=bullenetwork-directus-truite&object=${this.props.file.directus_files_id.filename_disk}`
    }).then(res => res.text())
      .then(ww => {
        this.setState(state => ({
          button: <a href={ww} target="_blank">{this.filename}</a>
        }))

        const self = this;
        setTimeout(function () {
          self.setState(state => ({
            button: <BasicButton handle={self.handleClick} filename={self.filename} />
          }))
          // the url expires after 10 minutes, we wait 10 minutes - 10 seconds
        }, (10 * 60 - 10) * 1000);
      })
      .catch(e => {
        this.setState(state => ({
          button: `failed to load url: ${e}`
        }))
      })
  }

  state = {
    button: <BasicButton handle={this.handleClick} filename={this.filename} />
  };

  render() {
    return (
      this.state.button
    )
  }
}

const BasicButton = ({ handle, filename }) => {
  return (
    <button onClick={handle}>{filename}</button>
  )
}