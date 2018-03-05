import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Description = styled.div`
  margin-bottom: 0;
  font-style: italic;
  font-size: 14px;
`

const IconContainer = styled.span`
  margin-left: 15px;

  &::before {
    color: #000;
  }
`

const Title = styled.div``

const Icon = ({ name }) => <IconContainer className={`fa fa-${name}`} />

export default function Item({
  full_name,
  name,
  description,
  html_url,
  topics
}) {
  return (
    <tr>
      <td>
        {topics.includes('d2-i18n') ? (
          <Link to={`/project/${full_name}`}>{name}</Link>
        ) : (
          <Title>{name}</Title>
        )}
        {description && <Description>{description}</Description>}
      </td>
      <td className="text-right align-middle">
        {topics.includes('d2-i18n') && <Icon name="language" />}
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          <Icon name="external-link" />
        </a>
      </td>
    </tr>
  )
}
