import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

export * from './reducers/config/actions'

export default createStore(reducers, applyMiddleware(thunk))