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
    name: 'd2-i18n',
    description: 'd2-i18n library has been integrated',
  },
  {
    name: 'd2-i18n-backend',
    description:
      'd2-i18n library has been integrated into backend. Details of this implementation is to be thought out.',
  },
]

class ProjectsPage extends Page {
  render() {
    return (
      <Template>
        <div className="row">
          <div className="col mt-3">
            <div className="mb-3">
              Monitor DHIS2 repos. Language support. Localization efforts.
              Translation health of a language, how much has been translated.
              Check Travis or any build process which needs to include{' '}
              <strong>localize</strong> step before build is performed etc.
            </div>

            <div className="mb-3">
              <h5>Integration</h5>
              <ul>
                <li>
                  <a href="https://github.com/dhis2/d2-i18n">Frontend</a>
                </li>
              </ul>
            </div>

            <div className="mb-3">
              <h5>Detection</h5>
              Attach topic <Topic text="d2-i18n" /> to a repo to tell{' '}
              <strong>i18n Monitor</strong> that internalization support has
              been implemented.
            </div>

            <div className="mt-3 mb-3">
              {topics.map(t => (
                <ValidTopic
                  key={t.name}
                  text={t.name}
                  description={t.description}
                />
              ))}
            </div>
          </div>
        </div>
        <ProjectList />
      </Template>
    )
  }
}

ProjectsPage = connect(({ config }) => ({ config }), null)(ProjectsPage)
ProjectsPage.path = '/projects'

export { ProjectsPage }
