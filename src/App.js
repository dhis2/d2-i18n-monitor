import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import * as pages from './pages'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container mt-5 mb-5">
          {Object.keys(pages).map(k => {
            const page = pages[k]

            return (
              <Route key={k} exact={true} path={page.path} component={page} />
            )
          })}
        </div>
      </Router>
    )
  }
}

export default App
