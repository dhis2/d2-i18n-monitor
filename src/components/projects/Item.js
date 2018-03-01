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

export default function Item({ name, description, html_url }) {
  return (
    <tr>
      <td>
        <RepoLink href={html_url} rel="noopener noreferrer" target="_blank">
          {name}
        </RepoLink>
        {description && <Description>{description}</Description>}
      </td>
      <td />
    </tr>
  )
}
