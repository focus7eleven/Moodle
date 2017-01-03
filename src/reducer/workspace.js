import {
  CHANGE_CURRENT_PATH,
} from '../actions/workspace'

import {fromJS} from 'immutable'

const initialState = fromJS({
  currentPath: [],
})

export default (state = initialState,action)=>{
  switch (action.type) {
    case CHANGE_CURRENT_PATH:
      return state.set('currentPath',fromJS(action.payload))
    default:
      return state
  }
}
