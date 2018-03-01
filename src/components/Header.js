import React from 'react'
import styled from 'styled-components'
import { Menu } from 'components'

const Description = styled.div`
  margin: 30px 0;
  font-size: 18px;
  text-align: left;
`

const Topic = ({ text }) => (
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
  }
]

export function Header() {
  return (
    <div className="text-center">
      <Menu />

      <Description>
        <p>
          Monitor DHIS2 repos. Language support. Localization efforts.
          Translation health of a language, how much has been translated. Check
          Travis or any build process which needs to include{' '}
          <strong>localize</strong> step before build is performed etc.
        </p>
        <p>
          Use GitHub Topic to inform this service if a certain functionality has
          been implemented. Example. attach topic <Topic text="d2-i18next" /> to
          a repository. It will signal that i18next support has been implemented
          in the repo.
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
      </Description>
    </div>
  )
}
