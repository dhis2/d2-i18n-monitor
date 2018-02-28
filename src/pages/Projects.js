import React from 'react'
import Template from './Template'

import { ProjectList } from 'components'

export class Projects extends React.Component {
  static path = '/projects'

  render() {
    const todo = `
TODO

1. Define Github API Token to query Github for all the repo information.
2. Track en.pot file and detect language support.
3. Track health of a language how well supported a language is against en.pot
4. Track .travis.yml if locales are part of .travis.yml
`
    return (
      <Template>
        <ProjectList />
        <pre>{todo}</pre>
      </Template>
    )
  }
}
