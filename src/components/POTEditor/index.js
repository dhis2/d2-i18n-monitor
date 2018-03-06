import React from 'react'
import { gettextToI18next } from 'i18next-conv'
import styled from 'styled-components'
import EditableText from './EditableText'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f8f9;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.125);
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

  &:last-child {
    border-bottom: 0;
  }
`

const Column = styled.div`
  width: 50%;
  padding: 4px 8px;
`
const Text = Column.extend`
  padding: 8px 8px 8px 16px;
`

const Row = ({ text, translation, isRTL, onChange }) => (
  <RowContainer>
    <Text>{text}</Text>
    <Column>
      <EditableText
        isRTL={isRTL}
        msgId={text}
        value={translation}
        onChange={onChange}
      />
    </Column>
  </RowContainer>
)

const RTL_LANGS = [
  'ar',
  'arc',
  'dv',
  'far',
  'ha',
  'he',
  'khw',
  'ks',
  'ku',
  'ps',
  'ur',
  'yi'
]

export class POEditor extends React.Component {
  state = {
    src: {},
    dst: {}
  }

  componentDidMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.load(newProps)
  }

  langCode() {
    const { path } = this.props
    let code = path.substr(path.lastIndexOf('/') + 1)
    return code.substr(0, code.lastIndexOf('.'))
  }

  async load() {
    const { content, potContent } = this.props
    const src = JSON.parse(await gettextToI18next('en', potContent))
    const dst = JSON.parse(await gettextToI18next(this.langCode(), content))

    this.setState({ src, dst })
  }

  onChange = (msgId, translation) =>
    this.setState({
      dst: {
        ...this.state.dst,
        [msgId]: translation
      }
    })

  view() {
    const { src, dst } = this.state
    return Object.keys(src).map(k => (
      <Row
        isRTL={RTL_LANGS.includes(this.langCode())}
        key={`msgId-${k}`}
        text={k}
        translation={dst[k] || ''}
        onChange={this.onChange}
      />
    ))
  }

  render() {
    return <Container>{this.view()}</Container>
  }
}
