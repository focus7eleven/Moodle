import {actionNames} from '../utils/action-utils'
import {fromJS} from 'immutable'
import config from '../config.js'

export const CHANGE_CURRENT_PATH = 'CHANGE_CURRENT_PATH'

export function setPath(path){
  return dispatch => {
    dispatch({
      type: CHANGE_CURRENT_PATH,
      payload: path
    })
  }
}

export const GET_WORKSPACEDATA = 'GET_WORKSPACEDATA'

export function getWorkspaceData(type,currentPage,search,pageShow){
  return dispatch => {
    return fetch(config.api.workspace.baseInfo.baseData.get(type,currentPage,search,pageShow),{
      method:'GET',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken'),
      }
    }).then(res => res.json()).then(res => {
      dispatch({
        type:GET_WORKSPACEDATA,
        payload:res
      })
    })
  }
}
