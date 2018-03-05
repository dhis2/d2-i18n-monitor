import React from 'react'

export class Stats extends React.Component {
  view() {
    const { path, content } = this.props
    if (path.endsWith('.po') || path.endsWith('.pot')) {
      const list = []
      const msgs = content.match(/^msgid /gim)
      const msgCount = msgs ? msgs.length : 0

      if (path.endsWith('.pot')) {
        list.push({
          type: 'primary',
          label: 'Num. of messages',
          value: msgCount
        })
      } else if (path.endsWith('.po')) {
        const { enPOT } = this.props
        const enMsgs = enPOT.match(/^msgid /gim)
        const enMsgCount = enMsgs ? enMsgs.length : 0

        list.push({
          type: 'primary',
          label: 'Total',
          value: enMsgCount
        })
        list.push({
          type: 'secondary',
          label: 'Translated',
          value: msgCount
        })

        let health = msgCount === 0 ? 0 : Math.toFixed(msgCount / enMsgCount, 0)
        list.push({
          type:
            health === 0 ? 'danger' : health === 100 ? 'success' : 'warning',
          label: 'Health',
          value: health
        })
      }

      return (
        <ul className="list-group w-25">
          {list.map(({ type, label, value }, index) => (
            <li
              key={`stat-${index}`}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {label}
              <span className={`badge badge-pill badge-${type}`}>{value}</span>
            </li>
          ))}
        </ul>
      )
    }

    return null
  }
  render() {
    return <div className="mt-3 mb-3">{this.view()}</div>
  }
}
