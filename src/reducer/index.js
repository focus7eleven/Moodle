import {combineReducers} from 'redux-immutablejs'
import menu from './menu'
import user from './user'
import workspace from './workspace'

const reducer = combineReducers({
  menu,
  user,
  workspace
})

export default reducer
