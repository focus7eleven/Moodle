import {actionNames} from '../utils/action-utils'
import {fromJS} from 'immutable'
import config from '../config.js'

export const CHANGE_MENU = 'CHANGE_MENU'

export const GET_MENU = 'GET_MENU'
export function getMenu(token){
  return dispatch => {
    return fetch(config.api.menu.get,{
      method:'GET',
      headers:{
        'from' : 'nodejs',
        'token' : token
      }
    }).then(res => res.json()).then(res => {
      dispatch({
        type:GET_MENU,
        payload:res
      })
    })
  }
}
