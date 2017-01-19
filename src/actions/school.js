import {GET_WORKSPACEDATA} from './workspace'
import config from '../config.js'
import {notification} from 'antd'
import {actionNames} from '../utils/action-utils'

export const SEARCH_SCHOOL = actionNames('SEARCH_SCHOOL')
export function searchSchool(data){
  const {searchStr,currentPage,areaOption} = data
  return {
    types:SEARCH_SCHOOL,
    callAPI:()=>{
      return fetch(config.api.school.search(searchStr,currentPage,areaOption),{
        method:'GET',
        headers:{
          'from':'nodejs',
          'token':sessionStorage.getItem('accessToken')
        }
      }).then(res => res.json()).then(res => ({mainData:res,otherMsg:{areaOption}}))
    }
  }
}
