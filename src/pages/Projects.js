import React from 'react'
import { connect } from 'react-redux'
import { ProjectList } from 'components'
import Template from './Template'

class ProjectsPage extends React.Component {
  componentDidMount() {
    this.redirectIfNoAccessToken(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfNoAccessToken(nextProps)
  }

  redirectIfNoAccessToken({ config: { accessToken } }) {
    if (!accessToken) {
      this.props.history.push('/config')
    }
  }

  render() {
    if (!this.props.config.accessToken) {
      return null
    }

    const todo = `
TODO

- Detect language support
- Track en.pot file and detect language support.
- Track health of a language how well supported a language is against en.pot
- Track .travis.yml if locales are part of .travis.yml
`
    return (
      <Template>
        <ProjectList />
        <pre>{todo}</pre>
      </Template>
    )
  }
}

ProjectsPage = connect(({ config }) => ({ config }), null)(ProjectsPage)
ProjectsPage.path = '/projects'

export { ProjectsPage }
