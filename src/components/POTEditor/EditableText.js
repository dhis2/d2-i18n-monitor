import React from 'react'
import styled from 'styled-components'

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
    editing: false
  }

  onFocus = () => this.setState({ editing: true })
  onBlur = () => this.setState({ editing: false })

  render() {
    const { msgId, value, isRTL } = this.props
    return (
      <Input
        isRTL={isRTL}
        value={value}
        editing={this.state.editing}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={evt => this.props.onChange(msgId, evt.target.value)}
      />
    )
  }
}
