import React from 'react'
import Template from './Template'

export class Projects extends React.Component {
  static path = '/'

  render() {
    const todo = `
TODO

1. Create JSON config to see the list of repo's
2. Define Github API Token to query Github for all the repo information.
3. Track en.pot file and detect language support.
4. Track health of a language how well supported a language is against en.pot
5. Track .travis.yml if locales are part of .travis.yml
`
    return (
      <Template>
        <pre>{todo}</pre>
      </Template>
    )
  }
}
