import {
  GET_TABLEDATA,
  GET_DETAILDATA,
} from '../actions/course_center/main'
import {fromJS} from 'immutable'
import _ from 'lodash'

const initialState = fromJS({
  data: [],
  courseDetail: [],
  loading: true,
  loadingDetail: true,
})

export default (state = initialState,action)=>{
  switch (action.type) {
    case GET_TABLEDATA[0]:
      return state.set('loading',true)
    case GET_TABLEDATA[1]:
      return state.set('data',fromJS(action.data)).set('loading',false)
    case GET_DETAILDATA[0]:
      return state.set('loadingDetail',true)
    case GET_DETAILDATA[1]:
      return state.set('courseDetail',fromJS(action.data)).set('loadingDetail',false)
    default:
      return state
  }
}
