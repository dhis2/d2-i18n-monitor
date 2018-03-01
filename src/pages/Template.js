import React from 'react'
import styled from 'styled-components'
import { Header } from 'components'

const Container = styled.div``

export default class Template extends React.Component {
  render() {
    return (
      <Container className="d-flex flex-column">
        <Header />
        {this.props.children}
      </Container>
    )
  }
}
