import {actionNames} from '../../utils/action-utils'
import {fromJS} from 'immutable'
import config from '../../config.js'
import {notification} from 'antd'
notification.config({
  top: window.screen.availHeight-200,
  duration: 3,
});

//获取表格数据
export const GET_TABLEDATA = actionNames('GET_TABLEDATA')
export function getTableData(type,search,currentPage){
  let realType = type;
  if(type === 'publicCourse'){
    realType = 'publicPage'
  }
  return {
    types:GET_TABLEDATA,
    callAPI:()=>{
      return fetch(config.api.courseCenter.getTableData(realType,search,currentPage),{
        method:'GET',
        headers:{
          'from':'nodejs',
          'token':sessionStorage.getItem('accessToken'),
        }
      }).then(res => res.json())
    }
  }
}
