import {
  CHANGE_CURRENT_PATH,
  GET_WORKSPACEDATA
} from '../actions/workspace'

import {fromJS} from 'immutable'

const initialState = fromJS({
  currentPath: [],
  data:[],
})

export default (state = initialState,action)=>{
  switch (action.type) {
    case CHANGE_CURRENT_PATH:
      return state.set('currentPath',fromJS(action.payload))
    case GET_WORKSPACEDATA:
      return state.set('data',fromJS(action.payload))
    default:
      return state
  }
}
