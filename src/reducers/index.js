import { combineReducers } from 'redux'

import config from './config'
import projects from './projects'

export * from 'reducers/config/actions'

export default combineReducers({
  config,
  projects,
})