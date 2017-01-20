import {actionNames} from '../utils/action-utils'
import {GET_WORKSPACEDATA,getWorkspaceData} from './workspace'
import config from '../config.js'
import {notification} from 'antd'

export function addClass(data){
  return dispatch => {
    return fetch(config.api.class.addClass,{
      method:'post',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken'),
      },
      body: data
    }).then(res => res.json()).then(res => {
      if(res.title == 'Success'){
        dispatch(getWorkspaceData('class','','','')).then(res => {notification.success({message:'添加成功'});return res})
      }else{
        notification.error({message:'添加失败',description: res.result});
        return "error";
      }
    })
  }
}

export function editClass(data){
  return dispatch => {
    return fetch(config.api.class.editClass,{
      method:'post',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken'),
      },
      body: data
    }).then(res => res.json()).then(res => {
      if(res.title == 'Success'){
        dispatch(getWorkspaceData('class','','','')).then(res => {notification.success(data.get('action')=='edit'?{message:'编辑成功'}:{message:'删除成功'});return res});
      }else{
        notification.error({message:'失败',description:'编辑失败'})
        return "error";
      }
    })
  }
}

export const GET_PHASE_LIST = actionNames('GET_PHASE_LIST')

export function getPhaseList(){
  return {
    types:GET_PHASE_LIST,
    callAPI:()=>{
      return fetch(config.api.phase.phaseList.get,{
        method:'GET',
        headers:{
          'from':'nodejs',
          'token':sessionStorage.getItem('accessToken'),
        }
      }).then(res => res.json())
    }
  }
}

export const GET_GRADE_LIST = actionNames('GET_GRADE_LIST')

export function getGradeList(phaseId){
  return {
    types:GET_GRADE_LIST,
    callAPI:()=>{
      return fetch(config.api.grade.getGradeList(phaseId),{
        method:'GET',
        headers:{
          'from':'nodejs',
          'token':sessionStorage.getItem('accessToken'),
        }
      }).then(res => res.json())
    }
  }
}
