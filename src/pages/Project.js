import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui'
import styled from 'styled-components'
import API from 'api'
import Page from './Page'
import { Files } from './Files'
import Template from './Template'
import { base64Decode } from 'helpers'

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
  ur: pkFlag,
}

const Flag = styled.img`
  margin-right: 10px;
`

function Flags({ list }) {
  return list.map(item => {
    return <Flag key={`flag-${item}`} src={flagImgs[item.split('-')[1]]} />
  })
}

const paths = ['.travis.yml', 'i18n/en.pot']

class ProjectPage extends Page {
  state = {
    loading: true,
    repo: null,
    selectedFile: 'i18n/en.pot',
  }

  async componentDidMount() {
    try {
      const { owner, repo } = this.props.match.params
      const { data: repoJSON } = await API.repo(owner, repo)

      const results = await Promise.all(
        paths.map(path =>
          API.contents(owner, repo, path, 'dhis2-i18n-extract'),
        ),
      )

      const files = {}
      results.forEach(
        ({ data: { path, content } }) => (files[path] = base64Decode(content)),
      )

      this.setState({
        files,
        loading: false,
        repo: repoJSON,
      })
    } catch (e) {
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

    const { repo, files, selectedFile } = this.state
    const langs = repo.topics.filter(i => i.startsWith('lang-'))
    return (
      <Template>
        <div className="mt-5">
          <h2 className="mb-3">{repo.name}</h2>
          <p className="font-italic mt-3">{repo.description}</p>

          <div className="mt-2">
            <Topics list={repo.topics} />
            <Flags list={langs} />
          </div>

          <div className="mt-3">
            <Files
              list={files}
              selected={selectedFile}
              onClick={this.onClick}
            />
            <pre>
              <code className="css">{files['en.pot']}</code>
            </pre>
          </div>
        </div>
      </Template>
    )
  }
}

ProjectPage = connect(({ config }) => ({ config }), null)(ProjectPage)
ProjectPage.path = '/project/:owner/:repo'

export { ProjectPage }
