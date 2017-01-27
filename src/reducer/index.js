import {combineReducers} from 'redux-immutablejs'
import menu from './menu'
import user from './user'
import workspace from './workspace'
import courseCenter from './courseCenter'
import detail from './detail'

const reducer = combineReducers({
  menu,
  user,
  workspace,
  courseCenter,
  detail
})

export default reducer
