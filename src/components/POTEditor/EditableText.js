import React from 'react'
import styled from 'styled-components'
import Suggestions from './Suggestions'

const Container = styled.div`
  position: relative;
`

const Input = styled.textarea`
  direction: ${p => (p.isRTL ? 'rtl' : 'ltr')};
  border: 0;
  width: 100%;
  outline: none;
  background-color: ${p => (p.editing ? '#e7e7e7' : '#efefef')};
  padding: 4px 8px;
`

export default class EditableText extends React.Component {
  state = {
    editing: false,
  }

  onFocus = () => this.setState({ editing: true })
  onBlur = () => {
    // Offset time for onClick evt. on selecting suggestion
    setTimeout(() => {
      this.setState({ editing: false })
    }, 250)
  }

  render() {
    const { editing } = this.state
    const { msgId, value, isRTL, srcLng, dstLng } = this.props

    return (
      <Container>
        <Input
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          isRTL={isRTL}
          value={value}
          editing={editing}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={evt => this.props.onChange(msgId, evt.target.value)}
        />
        {editing && (
          <Suggestions
            isRTL={isRTL}
            enabled={editing}
            text={msgId}
            srcLng={srcLng}
            dstLng={dstLng}
            onChange={this.props.onChange}
          />
        )}
      </Container>
    )
  }
}
