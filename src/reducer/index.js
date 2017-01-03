import {combineReducers} from 'redux-immutablejs'
import menu from './menu'
import user from './user'

const reducer = combineReducers({
  menu,
  user
})

export default reducer
