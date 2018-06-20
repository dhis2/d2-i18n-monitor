import React from 'react'
import styled from 'styled-components'
import API from 'api'
import { Highlight, Stats, POEditor } from 'components'

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

const Tab = styled.div`
  user-select: none;
  cursor: pointer;
  color: ${p => (p.selected ? '#fff' : '#000')};
  background-color: ${p => (p.selected ? '#0070ff' : '#f7f8f9')};
  margin-right: 15px;
  padding: 4px 15px 4px 15px;
  font-size: 14px;
  font-weight: ${p => (p.selected ? 'bold' : 'normal')};
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

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 40px 0 10px 0;
`

const EditMode = styled.div.attrs({
  className: 'fa fa-pencil-square-o'
})`
  cursor: pointer;
  margin-right: 15px;
  padding: 0 10px;
  font-size: 18px;
  height: 26px;
  line-height: 26px;
  color: ${p => (p.enabled ? '#fff' : '#000')};
  background-color: ${p => (p.enabled ? 'rgba(0,0,0,.7)' : '#f7f8f9')};
`

export class Files extends React.Component {
  state = {
    content: null
  }

  async componentDidUpdate(prevProps) {
    const { selected, editMode } = this.props
    if (prevProps.editMode && selected === prevProps.selected) {
      return
    }

    if (editMode && selected.endsWith('.po')) {
      const { owner, repo, list } = this.props

      const file = selected.substr(selected.lastIndexOf('/') + 1)
      const lang = file.substr(0, file.indexOf('.'))
      const branch = `i18n/${lang}-translations`
      console.log('branch', branch)

      try {
        const { found, content } = await API.contents(
          owner,
          repo,
          selected,
          branch
        )
        this.setState({
          content: found ? content : list[selected]
        })
      } catch (e) {
        console.log('componentDidUpdate', e)
      }
    }
  }

  contentView() {
    const { list, selected, editMode } = this.props

    if (editMode && selected.endsWith('.po')) {
      const { content } = this.state
      if (content === null) {
        return null
      }

      const { owner, repo } = this.props
      return (
        <POEditor
          owner={owner}
          repo={repo}
          path={selected}
          content={content}
          potContent={list['i18n/en.pot']}
        />
      )
    }

    const ext = selected.substr(selected.lastIndexOf('.') + 1)
    const ext2Lang = {
      yml: 'yaml',
      json: 'json',
      pot: 'lsl',
      po: 'lsl'
    }
    return <Highlight lang={ext2Lang[ext]}>{list[selected]}</Highlight>
  }

  render() {
    const { selected, list } = this.props
    const sorted = Object.keys(list).sort((a, b) =>
      a
        .slice(a.lastIndexOf('.') + 1)
        .localeCompare(b.slice(b.lastIndexOf('.') + 1))
    )

    const { editMode } = this.props
    const content = list[selected]
    return (
      <div>
        <Header>
          <EditMode enabled={editMode} onClick={this.props.onToggleMode} />
          <Tabs
            selected={selected}
            list={sorted}
            onClick={this.props.onClick}
          />
        </Header>
        <Stats
          path={selected}
          content={content}
          enPOT={selected.endsWith('.po') ? list['i18n/en.pot'] : ''}
        />
        {this.contentView()}
      </div>
    )
  }
}
