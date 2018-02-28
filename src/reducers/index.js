import { combineReducers } from 'redux'

import config from './config'

export * from 'reducers/config/actions'

export default combineReducers({
  config,
})