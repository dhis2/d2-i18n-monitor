import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui'
import styled from 'styled-components'
import API from 'api'
import Page from './Page'
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

class ProjectPage extends Page {
  state = {
    loading: true,
    repo: null
  }

  async componentDidMount() {
    try {
      const { owner, repo } = this.props.match.params
      const { data } = await API.repo(owner, repo)
      console.log('data')
      console.log(data)

      const { data: { content: enPot } } = await API.contents(
        owner,
        repo,
        'i18n/en.pot',
        'dhis2-i18n-extract'
      )

      this.setState({
        loading: false,
        repo: data,
        files: {
          'en.pot': base64Decode(enPot)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="mt-5 text-center">
          <CircularProgress size={100} thickness={2} />
        </div>
      )
    }

    const { repo, files } = this.state
    return (
      <Template>
        <div className="mt-5">
          <h2 className="mb-3">{repo.name}</h2>
          <p className="font-italic mt-3">{repo.description}</p>

          <div className="mt-2">
            <Topics list={repo.topics} />
            <Flags list={repo.topics.filter(i => i.startsWith('lang-'))} />
          </div>

          <div className="mt-3">
            <pre>{files['en.pot']}</pre>
          </div>
        </div>
      </Template>
    )
  }
}

ProjectPage = connect(({ config }) => ({ config }), null)(ProjectPage)
ProjectPage.path = '/project/:owner/:repo'

export { ProjectPage }
