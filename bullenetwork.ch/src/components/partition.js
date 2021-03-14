import React, { Component } from "react"
import Checkbox from "./checkbox";

export class Partition extends Component {

  state = {
    isActive: false,
    checkboxState: ""
  };

  handleClick = () => {
    this.setState(state => ({ isActive: !state.isActive }));
  };

  checkboxClick = (event) => {
    event.stopPropagation();

    let delta = 0

    const checked = event.target.checked
    const checkboxes = this.extraRef.querySelectorAll('input[type="checkbox"]')
    checkboxes.forEach(checkbox => {
      if (checkbox.checked !== checked) {
        delta += 1
        checkbox.checked = checked
      }
    })

    if (!checked) {
      delta = delta * -1
    }

    this.props.fileSelected(delta)
  };

  checkboxChildNotify = (event) => {
    let delta = 1
    if (!event.target.checked) {
      delta = delta * -1
    }
    this.props.fileSelected(delta)

    const totlaChecked = this.extraRef.querySelectorAll('input[type="checkbox"]:checked').length
    const totalCheckboxes = this.extraRef.querySelectorAll('input[type="checkbox"]').length

    if (totlaChecked === totalCheckboxes) {
      this.maincheckbox.checked = true
      this.maincheckbox.indeterminate = false;
    } else if (totlaChecked === 0) {
      this.maincheckbox.checked = false
      this.maincheckbox.indeterminate = false;
    } else {
      this.maincheckbox.indeterminate = true;
    }
  }

  extraClick = (event) => {
    event.stopPropagation();
  };

  setExtraRef = (extra) => {
    this.extraRef = extra;
  }

  setMainCheckboxRef = (checkbox) => {
    this.maincheckbox = checkbox
  }

  render() {

    return (
      <div className={this.state.isActive ? 'active partition' : "partition"}>
        <div className="main-checkbox">
          <Checkbox setRef={this.setMainCheckboxRef} onclick={this.checkboxClick} />
        </div>
        <div className="main" role="button" tabIndex={this.props.partition.bni} onKeyDown={this.handleClick} onClick={this.handleClick}>
          <div className="row">
            <div className="bni">{this.props.partition.bni}</div>
            <div className="title">{this.props.partition.title}</div>
            <div className="files">Partition ({this.props.partition.files ? this.props.partition.files.length : "0"})</div>
            <Arrow />
          </div>
          <Extra setRef={this.setExtraRef} onclick={this.extraClick} partition={this.props.partition} checkboxNotify={this.checkboxChildNotify} />
        </div>
      </div >
    )
  }
}

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

class File extends Component {

  filename = this.props.file.directus_files_id.filename_download

  handleClick = () => {
    this.setState(state => ({
      button: <button>chargement...</button>
    }))

    fetch(process.env.GCS_PROXY, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `bucket=bullenetwork-directus-truite&object=${this.props.file.directus_files_id.filename_disk}`
    }).then(res => res.text())
      .then(ww => {
        this.setState(state => ({
          button: <a href={ww} rel="noopener noreferrer" target="_blank">{this.filename}</a>
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
      <div className="file">
        <Checkbox onclick={this.props.notify} name={this.props.file.directus_files_id.filename_disk} value={this.filename} />
        {this.state.button}
      </div>
    )
  }
}

const BasicButton = ({ handle, filename }) => {
  return (
    <button onClick={handle}>{filename}</button>
  )
}