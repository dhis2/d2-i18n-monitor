import React from 'react'
import { gettextToI18next, i18nextToPo } from 'i18next-conv'
import styled from 'styled-components'
import EditableText from './EditableText'
import API from 'api'
import { Button, Snackbar } from 'material-ui'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f8f9;
  font-size: 14px;
  border-bottom: 0;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

  &:first-of-type {
    border-top: 1px solid rgba(0, 0, 0, 0.125);
  }

  &:last-child {
    border-bottom: 0;
  }
`

const Column = styled.div`
  width: 50%;
  padding: 8px;
`
const Text = Column.extend`
  padding: 8px 8px 8px 16px;
`

const Row = ({ dstLng, text, translation, isRTL, onChange }) => (
  <RowContainer>
    <Text>{text}</Text>
    <Column>
      <EditableText
        isRTL={isRTL}
        msgId={text}
        srcLng={'en'}
        dstLng={dstLng}
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
  'fa',
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
    showSnackBar: false,
    src: {},
    dst: {}
  }

  constructor(props) {
    super(props)
    this.onSave = this.onSave.bind(this)
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
        dstLng={this.langCode()}
        translation={dst[k] || ''}
        onChange={this.onChange}
      />
    ))
  }

  async onSave() {
    const { dst } = this.state
    const json = {}
    Object.keys(dst).forEach(k => {
      if (dst[k]) {
        json[k] = dst[k]
      }
    })

    const lang = this.langCode()
    const encodedPO = await i18nextToPo(lang, JSON.stringify(json))
    const contentsPO = new TextDecoder('utf-8').decode(encodedPO)

    const { path, owner, repo } = this.props
    const branch = `i18n/${lang}-translations`
    await API.createAndFetchBranch(owner, repo, branch)

    // NOTE: frequently hitting save will return 422, because GitHub systems
    // take a few seconds to sync. Hitting Save again will return ^1 SHA hash
    // for the committed file path
    const message = `translations(${lang})`
    await API.createOrUpdateFile(owner, repo, path, branch, contentsPO, message)

    this.setState({ showSnackBar: true })
  }

  render() {
    return (
      <Container>
        {this.view()}
        <div className="w-100 pt-4 pb-4 d-flex align-items-center justify-content-center">
          <Button variant="raised" color="primary" onClick={this.onSave}>
            Save
          </Button>
        </div>
        <Snackbar
          onClose={() => this.setState({ showSnackBar: false })}
          open={this.state.showSnackBar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          message={<span>saved successfully.</span>}
        />
      </Container>
    )
  }
}
