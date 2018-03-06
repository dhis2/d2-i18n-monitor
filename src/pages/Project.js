import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui'
import styled from 'styled-components'
import API from 'api'
import Page from './Page'
import { Files } from './Files'
import Template from './Template'

import bdFlag from 'assets/images/flags/bd.png'
import esFlag from 'assets/images/flags/es.png'
import nbFlag from 'assets/images/flags/no.png'
import nlFlag from 'assets/images/flags/nl.png'
import pkFlag from 'assets/images/flags/pk.png'
import ptFlag from 'assets/images/flags/pt.png'
import saFlag from 'assets/images/flags/sa.png'
import usFlag from 'assets/images/flags/us.png'

import { Topic } from './Projects'
const TopicContainer = styled.span`
  margin-right: 10px;
`

function Topics({ list }) {
  return list.map(item => {
    if (item.startsWith('lang-')) {
      return null
    }

    return (
      <TopicContainer key={`topic-${item}`}>
        <Topic text={item} />
      </TopicContainer>
    )
  })
}

const flagImgs = {
  bd: bdFlag,
  en: usFlag,
  es: esFlag,
  nl: nlFlag,
  no: nbFlag,
  pt: ptFlag,
  sa: saFlag,
  ur: pkFlag
}

const Flag = styled.img`
  margin-right: 10px;
`

function Flags({ list }) {
  return list.map(item => {
    return <Flag key={`flag-${item}`} src={flagImgs[item.split('-')[1]]} />
  })
}

const paths = ['.travis.yml', 'package.json', 'i18n/en.pot']

// only PO files will be editable, otherwise the Edit mode icon should be greyed out
const MODE_READ = 'file/READ'
const MODE_WRITE = 'file/WRITE'

class ProjectPage extends Page {
  state = {
    loading: true,
    repo: null,
    // selectedFile: 'i18n/en.pot',
    selectedFile: 'i18n/ur.po',
    // mode: MODE_READ
    mode: MODE_WRITE
  }

  toggleEditMode = () =>
    this.setState({
      mode: this.state.mode === MODE_READ ? MODE_WRITE : MODE_READ
    })

  async componentDidMount() {
    try {
      const { owner, repo } = this.props.match.params
      const { data: repoJSON } = await API.repo(owner, repo)

      const langFiles = []
      repoJSON.topics.forEach(t => {
        if (t.startsWith('lang-') && t !== 'lang-en') {
          langFiles.push('i18n/' + t.substr(t.indexOf('-') + 1) + '.po')
        }
      })

      const filePaths = paths.slice(0).concat(langFiles)
      const results = await Promise.all(
        filePaths.map(path => API.contents(owner, repo, path))
      )

      const files = {}
      results.forEach(({ path, found, content }) => {
        if (!found) {
          if (!path.endsWith('.po')) {
            return
          }

          // enables, non-existing language files to be created in Future functionality
          content = ''
        }

        files[path] = content
      })

      this.setState({
        files,
        loading: false,
        repo: repoJSON
      })
    } catch (e) {
      console.log('exception')
      console.log(e)
    }
  }

  onClick = selectedFile => this.setState({ selectedFile })

  render() {
    if (this.state.loading) {
      return (
        <div className="mt-5 text-center">
          <CircularProgress size={100} thickness={2} />
        </div>
      )
    }

    const { repo, files } = this.state
    const { owner, repo: repoName } = this.props.match.params
    const languages = repo.topics.filter(i => i.startsWith('lang-'))
    return (
      <Template>
        <div className="mt-5">
          <h2 className="mb-3">{repo.name}</h2>
          <p className="font-italic mt-3">{repo.description}</p>

          <div className="mt-2">
            <Topics list={repo.topics} />
            <Flags list={languages} />
          </div>

          <div className="mt-3">
            <Files
              list={files}
              owner={owner}
              repo={repoName}
              onClick={this.onClick}
              onToggleMode={this.toggleEditMode}
              selected={this.state.selectedFile}
              editMode={this.state.mode === MODE_WRITE}
            />
          </div>
        </div>
      </Template>
    )
  }
}

ProjectPage = connect(({ config }) => ({ config }), null)(ProjectPage)
ProjectPage.path = '/project/:owner/:repo'

export { ProjectPage }
