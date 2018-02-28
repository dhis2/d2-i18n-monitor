import React from 'react'
import styled from 'styled-components'

const Description = styled.div`
  margin: 30px;
  font-size: 18px;
`

export function Header() {
  return (
    <div class="text-center">
      <h2>i18n Monitor</h2>
      <Description>
        Monitor DHIS2 repos. Language support. Localization efforts. Translation
        health of a language, how much has been translated.has been translated.
        Check Travis or any build process which needs to include{' '}
        <strong>localize</strong> step before build is performed etc.
      </Description>
      <hr />
    </div>
  )
}
