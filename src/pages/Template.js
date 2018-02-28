import React from 'react'
import styled from 'styled-components'
import { Header } from 'components'

const Container = styled.div``

export default class Template extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        {this.props.children}
      </Container>
    )
  }
}
