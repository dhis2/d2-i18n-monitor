import React from 'react'
import styled from 'styled-components'

const RepoLink = styled.a`
  font-size: 18px;
`

const Description = styled.div`
  margin-bottom: 0;
  font-style: italic;
  font-size: 14px;
`

const Icon = ({ name }) => <span className={`fas fa-2x fa-${name}`} />

export default function Item({ name, description, html_url, topics }) {
  return (
    <tr>
      <td>
        <RepoLink href={html_url} rel="noopener noreferrer" target="_blank">
          {name}
        </RepoLink>
        {description && <Description>{description}</Description>}
      </td>
      <td className="text-right align-middle">
        {topics.includes('d2-i18n') && <Icon name="language" />}
      </td>
    </tr>
  )
}
