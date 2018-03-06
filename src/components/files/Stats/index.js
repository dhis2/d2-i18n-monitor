import React from 'react'
import styled from 'styled-components'

const Emoji = styled.span`
  font-size: 24px;
  line-height: 24px;
`

const Checkmark = Emoji.extend`
  &::after {
    font-size: 24px;
    content: '\u2713';
  }
`

const Skull = Emoji.extend`
  &::after {
    font-size: 24px;
    content: '\u2620';
  }
`

const MsgLabel = styled.div`
  font-size: 14px;
`
const MsgValue = styled.div`
  font-size: 14px;
`

export class Stats extends React.Component {
  view() {
    const messages = []
    const { path, content } = this.props

    if (path.endsWith('.po') || path.endsWith('.pot')) {
      const msgs = content.match(/^msgid "[^"]+/gim)
      const msgCount = msgs ? msgs.length : 0

      if (path.endsWith('.pot')) {
        messages.push({
          type: 'primary',
          label: 'Num. of messages',
          value: <MsgValue>{msgCount}</MsgValue>
        })
      } else if (path.endsWith('.po')) {
        const { enPOT } = this.props
        const enMsgs = enPOT.match(/^msgid "[^"]+/gim)
        const enMsgCount = enMsgs ? enMsgs.length : 0

        messages.push({
          type: 'primary',
          label: 'Total',
          value: <MsgValue>{enMsgCount}</MsgValue>
        })
        messages.push({
          type: msgCount < enMsgCount ? 'warning' : 'secondary',
          label: 'Translated',
          value: msgCount === 0 ? <Skull /> : <MsgValue>{msgCount}</MsgValue>
        })

        let health = msgCount === 0 ? 0 : Math.toFixed(msgCount / enMsgCount, 0)
        messages.push({
          type:
            health === 0 ? 'danger' : health === 100 ? 'success' : 'warning',
          label: 'Health',
          value: health === 0 ? <Skull /> : <MsgValue>{health}</MsgValue>
        })
      }
    } else if (path.endsWith('package.json')) {
      const { scripts } = JSON.parse(content)

      let buildExists = false
      let extractPOTExists = false
      let localizeExists = false
      let prettifyExists = false
      if (scripts) {
        extractPOTExists = !!scripts['extract-pot']
        localizeExists = !!scripts['localize']
        prettifyExists = !!scripts['prettify']
        buildExists = !!scripts['build']
      }

      messages.push({
        type: extractPOTExists ? 'success' : 'danger',
        label: 'extract-pot',
        value: extractPOTExists ? <Checkmark /> : <Skull />
      })
      messages.push({
        type: localizeExists ? 'success' : 'danger',
        label: 'localize',
        value: localizeExists ? <Checkmark /> : <Skull />
      })
      messages.push({
        type: prettifyExists ? 'success' : 'danger',
        label: 'prettify',
        value: prettifyExists ? <Checkmark /> : <Skull />
      })
      messages.push({
        type: buildExists ? 'success' : 'danger',
        label: 'build',
        value: buildExists ? <Checkmark /> : <Skull />
      })
    } else if (path.endsWith('.travis.yml')) {
      const lintExists = content.includes('- yarn lint')
      const buildExists = content.includes('- yarn build')

      messages.push({
        type: lintExists ? 'success' : 'danger',
        label: 'yarn lint',
        value: lintExists ? <Checkmark /> : <Skull />
      })
      messages.push({
        type: buildExists ? 'success' : 'danger',
        label: 'yarn build',
        value: buildExists ? <Checkmark /> : <Skull />
      })
    }

    if (messages.length === 0) {
      return null
    }

    return (
      <ul className="list-group w-25">
        {messages.map(({ type, label, value }, index) => (
          <li
            key={`stat-${index}`}
            className="list-group-item d-flex justify-content-between align-items-center rounded-0 pt-1 pb-1 pl-3 pr-3"
          >
            <MsgLabel>{label}</MsgLabel>
            <span className={`ml-auto text-${type}`}>{value}</span>
          </li>
        ))}
      </ul>
    )
  }
  render() {
    return <div className="mt-3 mb-3">{this.view()}</div>
  }
}
