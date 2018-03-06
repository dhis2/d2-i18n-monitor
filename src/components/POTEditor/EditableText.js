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

// TODO
// https://amagama-live.translatehouse.org/api/v1/en/fa/unit/
// for empty Editable text automatically fetch the list of translation and show them under the input field as list
// then use has the possibility of choosing a translation by using Ctrl + [1, 5] keys. Translations are ranked by
// quality. So the quality is the indicator for presenting suggestions. If no suggestions are there then no need to
// present any additional dialog
// may be ability to click and select on of the translations and put them right into the translation box

export default class EditableText extends React.Component {
  state = {
    editing: false
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
