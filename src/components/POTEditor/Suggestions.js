import React from 'react'
import styled from 'styled-components'
import { getSuggestion } from 'api'

const Container = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  width: 100%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
`

const List = styled.div`
  margin: 0;
  padding: 0;
  direction: ${p => (p.isRTL ? 'rtl' : 'ltr')};
  text-align: ${p => (p.isRTL ? 'right' : 'left')};
`
const Item = styled.div`
  user-select: none;
  padding: ${p => (p.isRTL ? '4px 15px 4px 5px' : '4px 5px 4px 15px')};

  &:hover {
    color: #000;
    background-color: #ccc;
  }
`

export default class Suggestions extends React.Component {
  state = {
    list: []
  }

  componentDidMount() {
    this.fetch(this.props)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.text !== newProps.text) {
      this.setState({ list: [] })
    }

    this.fetch(newProps)
  }

  async fetch({ enabled, srcLng, dstLng, text }) {
    if (enabled) {
      const list = await getSuggestion(srcLng, dstLng, text)
      this.setState({ list: list.map(i => i.target) })
    }
  }

  onSelect = suggestion => this.props.onChange(this.props.text, suggestion)

  render() {
    const { enabled, isRTL } = this.props
    const { list } = this.state
    if (!enabled || list.length === 0) {
      return null
    }

    return (
      <Container>
        <List isRTL={isRTL}>
          {list.map((suggestion, index) => (
            <Item
              key={`suggestion-${index}`}
              isRTL={isRTL}
              onClick={() => this.onSelect(suggestion)}
            >
              {suggestion}
            </Item>
          ))}
        </List>
      </Container>
    )
  }
}
