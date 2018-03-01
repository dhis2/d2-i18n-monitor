import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui'
import Item from './Item'
import { api } from 'services'

const FRONTEND_APPS_POSTFIX = '-app'

function filterRepos(list, orgs, skipRepos) {
  skipRepos = skipRepos.split('\n').filter(v => v.length > 0)
  orgs = orgs.split('\n').filter(v => v.length > 0)

  return list.filter(repo => {
    if (
      !repo.name.endsWith(FRONTEND_APPS_POSTFIX) ||
      skipRepos.includes(repo.full_name)
    ) {
      return false
    }

    return orgs.length > 0 ? orgs.includes(repo.owner.login) : true
  })
}

class ProjectList extends React.Component {
  state = {
    loading: false,
    repos: []
  }

  componentDidMount() {
    this.fetchRepos()
  }

  async fetchRepos() {
    this.setState({ loading: true })
    try {
      const { data } = await api()
        .getUser()
        .listRepos()

      const { organizations, skipRepos } = this.props.config
      console.log(data)
      this.setState({
        loading: false,
        repos: filterRepos(data, organizations, skipRepos)
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { loading, repos } = this.state
    if (loading) {
      return (
        <div className="mt-5 text-center">
          <CircularProgress size={100} thickness={1} />
        </div>
      )
    }

    const list = repos.sort((a, b) => a.name.localeCompare(b.name))
    return (
      <table className="table mt-3 border-top-0">
        <colgroup>
          <col width="60%" />
          <col width="40%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Repository</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>{list.map(r => <Item key={r.full_name} {...r} />)}</tbody>
      </table>
    )
  }
}

ProjectList = connect(({ config, projects }) => ({ config, projects }), null)(
  ProjectList
)
export { ProjectList }
