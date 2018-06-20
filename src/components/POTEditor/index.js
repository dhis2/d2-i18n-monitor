import React from 'react'
import { gettextToI18next, i18nextToPo } from 'i18next-conv'
import styled from 'styled-components'
import EditableText from './EditableText'
import API from 'api'
import { TextField, Button, Snackbar } from 'material-ui'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f8f9;
  font-size: 14px;
  border-bottom: 0;
`

const Toolbar = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
`
const ToolbarText = styled.div`
  margin-right: 10px;
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

const commitMsgStyle = {
  marginBottom: 30,
  width: '50%'
}

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

const SHOW_ALL = 'All'
const SHOW_EMPTY = 'Empty'
const SHOW_FILLED = 'Filled'

export class POEditor extends React.Component {
  state = {
    showSnackBar: false,
    commitMsg: this.defaultCommitMsg(this.props),
    show: SHOW_ALL,
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
    if (this.props.path !== newProps.path) {
      this.setState({
        dst: {}
      })
    }

    this.load(newProps)
  }

  defaultCommitMsg(props) {
    return `translations(${this.langCode(props)})`
  }

  langCode({ path }) {
    let code = path.substr(path.lastIndexOf('/') + 1)
    return code.substr(0, code.lastIndexOf('.'))
  }

  async load({ content, potContent, path }) {
    const src = JSON.parse(await gettextToI18next('en', potContent))
    const dst = JSON.parse(
      await gettextToI18next(this.langCode({ path }), content)
    )

    this.setState({ src, dst, commitMsg: this.defaultCommitMsg({ path }) })
  }

  onChange = (msgId, translation) =>
    this.setState({
      dst: {
        ...this.state.dst,
        [msgId]: translation
      }
    })

  view() {
    const { src, dst, show } = this.state
    return Object.keys(src).map(k => {
      if (
        (show === SHOW_EMPTY && dst[k]) ||
        (show === SHOW_FILLED && !dst[k])
      ) {
        return null
      }

      return (
        <Row
          isRTL={RTL_LANGS.includes(this.langCode(this.props))}
          key={`msgId-${k}`}
          text={k}
          dstLng={this.langCode(this.props)}
          translation={dst[k] || ''}
          onChange={this.onChange}
        />
      )
    })
  }

  async onSave() {
    const { dst } = this.state
    const json = {}
    Object.keys(dst).forEach(k => {
      if (dst[k]) {
        json[k] = dst[k]
      }
    })

    const lang = this.langCode(this.props)
    const encodedPO = await i18nextToPo(lang, JSON.stringify(json))
    const contentsPO = new TextDecoder('utf-8').decode(encodedPO) + '\n'

    const { path, owner, repo } = this.props
    const branch = `i18n/${lang}-translations`
    await API.createAndFetchBranch(owner, repo, branch)

    // NOTE: frequently hitting save will return 422, because GitHub systems
    // take a few seconds to sync. Hitting Save again will return ^1 SHA hash
    // for the committed file path
    const { commitMsg } = this.state
    await API.createOrUpdateFile(
      owner,
      repo,
      path,
      branch,
      contentsPO,
      commitMsg
    )

    this.setState({
      showSnackBar: true,
      commitMsg: this.defaultCommitMsg(this.props)
    })
  }

  setCommitMsg = evt => this.setState({ commitMsg: evt.target.value })

  showValues = [SHOW_ALL, SHOW_EMPTY, SHOW_FILLED]
  onShowChange = evt =>
    this.setState({
      show: this.showValues[evt.target.selectedIndex]
    })

  render() {
    return (
      <Container>
        <Toolbar>
          <ToolbarText>Show</ToolbarText>
          <select onChange={this.onShowChange}>
            {this.showValues.map(v => (
              <option key={`option-${v}`} value={v}>
                {v}
              </option>
            ))}
          </select>
        </Toolbar>
        {this.view()}
        <div className="w-100 pt-5 pb-4 d-flex flex-column align-items-center justify-content-center">
          <TextField
            name="commitMsg"
            label="Commit Message"
            style={commitMsgStyle}
            onChange={this.setCommitMsg}
            value={this.state.commitMsg}
          />

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
