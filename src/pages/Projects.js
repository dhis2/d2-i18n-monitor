import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ProjectList } from 'components'
import Page from './Page'
import Template from './Template'

export const Topic = ({ text }) => (
  <span className="badge badge-pill badge-primary">{text}</span>
)

const TopicDescription = styled.span`
  margin-left: 10px;
`

const ValidTopic = ({ text, description }) => (
  <div>
    <Topic text={text} />
    <TopicDescription>{description}</TopicDescription>
  </div>
)

const topics = [
  {
    name: 'd2-i18next',
    description: 'd2-i18next library has been integrated'
  },
  {
    name: 'd2-i18next-backend',
    description:
      'd2-i18next library has been integrated into backend. Details of this implementation is to be thought out.'
  }
]

class ProjectsPage extends Page {
  render() {
    const todo = `
TODO

- Track en.pot file and detect language support.
- Track health of a language how well supported a language is against en.pot
- Track .travis.yml if locales are part of .travis.yml
`
    return (
      <Template>
        <div>
          <p>
            Monitor DHIS2 repos. Language support. Localization efforts.
            Translation health of a language, how much has been translated.
            Check Travis or any build process which needs to include{' '}
            <strong>localize</strong> step before build is performed etc.
          </p>

          <p>
            Use GitHub Topic to inform this service if a certain functionality
            has been implemented. Example. attach topic{' '}
            <Topic text="d2-i18next" /> to a repository. It will signal that
            i18next support has been implemented in the repo.
          </p>

          <div className="mt-3">
            {topics.map(t => (
              <ValidTopic
                key={t.name}
                text={t.name}
                description={t.description}
              />
            ))}
          </div>
        </div>
        <ProjectList />
        <pre>{todo}</pre>
      </Template>
    )
  }
}

ProjectsPage = connect(({ config }) => ({ config }), null)(ProjectsPage)
ProjectsPage.path = '/projects'

export { ProjectsPage }
