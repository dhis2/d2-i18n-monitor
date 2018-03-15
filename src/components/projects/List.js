import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui'
import API from 'api'
import Item from './Item'

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

@connect(({ config, projects }) => ({ config, projects }), null)
export class ProjectList extends React.Component {
  state = {
    loading: false,
    repos: [],
  }

  componentDidMount() {
    this.fetchRepos()
  }

  async fetchRepos() {
    this.setState({ loading: true })
    try {
      const repos = await API.repos()
      const { orgs, skipRepos } = this.props.config
      this.setState({
        repos: filterRepos(repos, orgs, skipRepos),
        loading: false,
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
          <CircularProgress size={100} thickness={2} />
        </div>
      )
    }

    const list = repos.sort((a, b) => a.name.localeCompare(b.name))
    return (
      <table className="table table-hover mt-3 border-top-0">
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
