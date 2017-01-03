import {
  CHANGE_MENU,
  GET_MENU,
} from '../actions/menu'

import {fromJS,List} from 'immutable'

const initMenu = fromJS({
  data:List()
})

export default (state=initMenu,action) => {
  switch (action.type) {
    case GET_MENU:
      return state.set('data',fromJS(action.payload.slice(0,7)))
    case CHANGE_MENU:
      return state.set('loading',false)
    default:
      return state
  }
}
