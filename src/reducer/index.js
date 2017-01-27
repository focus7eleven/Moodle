import {combineReducers} from 'redux-immutablejs'
import menu from './menu'
import user from './user'
import workspace from './workspace'
import courseCenter from './courseCenter'

const reducer = combineReducers({
  menu,
  user,
  workspace,
  courseCenter
})

export default reducer
