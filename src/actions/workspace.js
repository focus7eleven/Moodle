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
