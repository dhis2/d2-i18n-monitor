import React from 'react'
import { Route } from 'react-router'
import { Provider} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Load } from 'components'
import store from './store'

import * as pages from './pages'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Load>
          <Router>
            <div className="container mt-3 mb-5">
              <Route exact={true} path="/" component={pages.Projects} />
              {Object.keys(pages).map(k => {
                const page = pages[k]
                return (
                  <Route key={k} exact={true} path={page.path} component={page} />
                )
              })}
            </div>
          </Router>
        </Load>
      </Provider>
    )
  }
}
