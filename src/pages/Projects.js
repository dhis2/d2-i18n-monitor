import React from 'react'
import { connect } from 'react-redux'
import { ProjectList } from 'components'
import Page from './Page'
import Template from './Template'

class ProjectsPage extends Page {
  render() {
    if (!this.props.config.accessToken) {
      return null
    }

    const todo = `
TODO

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
