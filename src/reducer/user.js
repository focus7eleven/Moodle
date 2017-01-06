import {LOGIN_SUCCESS} from '../actions/user'
import {fromJS} from 'immutable'
import {notification} from 'antd'

const initialState = fromJS({
  isAuth:false,
  data:{}
})

export default (state = initialState,action)=>{
  switch (action.type) {
    case LOGIN_SUCCESS:
      notification.success({
        message: '成功',
				description: '您已成功登录。',
      })
      return state.set('isAuth',action.isAuth)
    default:
      return state

  }
}
