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
  }else if(type=='publishedCourse'){
    realType = 'publishedPage'
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
    },
    shouldCallAPI:()=>{
      return type!='newCourse' && isNaN(type)
    }
  }
}

//获取课程的详细信息
export const GET_DETAILDATA = actionNames('GET_DETAILDATA')
export function getDetailData(lessonId){
  return {
    types:GET_DETAILDATA,
    callAPI:()=>{
      return fetch(config.api.courseCenter.detail(lessonId),{
        method:'GET',
        headers:{
          'from':'nodejs',
          'token':sessionStorage.getItem('accessToken'),
        }
      }).then(res => res.json())
    }
  }
}
