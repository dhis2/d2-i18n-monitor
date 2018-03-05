import React from 'react'
import styled from 'styled-components'
import { Highlight, Stats } from 'components'

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 40px 0 10px 0;
`

const Tab = styled.div`
  user-select: none;
  cursor: pointer;
  color: ${p => (p.selected ? '#fff' : '#000')};
  background-color: ${p => (p.selected ? '#0070ff' : '#f7f8f9')};
  margin-right: 15px;
  padding: 4px 15px 4px 15px;
  font-size: 12px;
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
`

class Tabs extends React.Component {
  render() {
    const { list, selected } = this.props
    return (
      <TabsContainer>
        {list.map(path => (
          <Tab
            key={path}
            selected={selected === path}
            onClick={() => this.props.onClick(path)}
          >
            {path.includes('/') ? path.substr(path.lastIndexOf('/') + 1) : path}
          </Tab>
        ))}
      </TabsContainer>
    )
  }
}

export class Files extends React.Component {
  render() {
    const { selected, list } = this.props
    const sorted = Object.keys(list).sort((a, b) =>
      a
        .slice(a.lastIndexOf('.') + 1)
        .localeCompare(b.slice(b.lastIndexOf('.') + 1))
    )

    const ext = selected.substr(selected.lastIndexOf('.') + 1)
    const ext2Lang = {
      yml: 'yaml',
      json: 'json',
      pot: 'lsl',
      po: 'lsl'
    }

    return (
      <div>
        <Tabs selected={selected} list={sorted} onClick={this.props.onClick} />
        <Stats
          path={selected}
          content={list[selected]}
          enPOT={selected.endsWith('.po') ? list['i18n/en.pot'] : ''}
        />
        <Highlight lang={ext2Lang[ext]}>{list[selected]}</Highlight>
      </div>
    )
  }
}
