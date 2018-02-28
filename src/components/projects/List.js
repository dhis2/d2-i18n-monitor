import React from 'react'
import { connect } from 'react-redux'
import Item from './Item'
import Details from './Details'

class ProjectList extends React.Component {
  render() {
    const { projects } = this.props
    return (
      <table className="table mt-5 border-top-0">
        <colgroup>
          <col width="40%"/>
          <col width="60%"/>
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Repository</th>
            <th scope="col">Health</th>
          </tr>
        </thead>
        <tbody>{projects.map(p => <Item key={p.git.id} {...p} />)}</tbody>
      </table>
    )
  }
}

ProjectList = connect(({ projects }) => ({ projects }), null)(ProjectList)
export { ProjectList }
