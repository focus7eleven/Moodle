import {LOGIN_SUCCESS} from '../actions/user'
import {fromJS} from 'immutable'

const initialState = fromJS({
  accessToken:'',
  expiresIn:-1,
  data:{}
})

export default (state = initialState,action)=>{
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.set('accessToken',action.payload.accessToken).set('expiresIn',action.payload.expiresIn)
    default:
      return state

  }
}
