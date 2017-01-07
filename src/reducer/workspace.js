import {
  CHANGE_CURRENT_PATH,
  GET_WORKSPACEDATA,
  ADD_PHASE,
} from '../actions/workspace'
import {findPath} from '../reducer/menu'

import {fromJS} from 'immutable'

const initialState = fromJS({
  data:[],
  loading:true,
})

export default (state = initialState,action)=>{
  switch (action.type) {
    case GET_WORKSPACEDATA[0]:
      return state.set('loading',true)
    case GET_WORKSPACEDATA[1]:
      return state.set('data',fromJS(action.data)).set('loading',false)
    default:
      return state
  }
}
