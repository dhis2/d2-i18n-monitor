import React from 'react'
import { Route } from 'react-router'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { CircularProgress } from 'material-ui'
import { store, persistor } from './store'

import * as pages from './pages'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<CircularProgress size={80} thickness={1} />}
          persistor={persistor}
        >
          <Router
            basename={
              process.env.NODE_ENV === 'development' ? '' : '/d2-i18n-monitor'
            }
          >
            <div className="container mt-3 mb-5">
              <Route exact={true} path="/" component={pages.ProjectsPage} />
              {Object.keys(pages).map(k => {
                const page = pages[k]
                return (
                  <Route
                    key={k}
                    exact={true}
                    path={page.path}
                    component={page}
                  />
                )
              })}
            </div>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}
