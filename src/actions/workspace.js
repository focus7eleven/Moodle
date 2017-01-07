import {actionNames} from '../utils/action-utils'
import {fromJS} from 'immutable'
import config from '../config.js'
import {notification} from 'antd'

export const CHANGE_CURRENT_PATH = 'CHANGE_CURRENT_PATH'

export function setPath(path){
  return dispatch => {
    dispatch({
      type: CHANGE_CURRENT_PATH,
      payload:path
    })
  }
}

export const GET_WORKSPACEDATA = actionNames('GET_WORKSPACEDATA')

export function getWorkspaceData(type,currentPage,search,pageShow){
  return {
    types:GET_WORKSPACEDATA,
    callAPI:()=>{
      return fetch(config.api.workspace.baseInfo.baseData.get(type,currentPage,search,pageShow),{
        method:'GET',
        headers:{
          'from':'nodejs',
          'token':sessionStorage.getItem('accessToken'),
        }
      }).then(res => res.json())
    }
  }
}

export function addPhase(data){
  return dispatch => {
    let formData = new FormData()
    formData.append('phase_code',data.phaseCode)
    formData.append('phase_name',data.phaseName)
    formData.append('remark',data.remark)
    return fetch(config.api.phase.post,{
      method:'post',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken')
      },
      body:formData,
    }).then(res => res.json()).then(res => {
      if(res.title == 'Success'){
        dispatch({
          types:GET_WORKSPACEDATA,
          callAPI:()=>{
            return fetch(config.api.workspace.baseInfo.baseData.get('phase','','',''),{
              method:'GET',
              headers:{
                'from':'nodejs',
                'token':sessionStorage.getItem('accessToken'),
              }
            }).then(res => res.json())
          }
        })
      }else{
        notification.error({message:'添加失败',description:'网络错误'})
      }
    })
  }
}

export function editPhase(data){
  return dispatch => {
    let formData = new FormData()
    formData.append('phase_code',data.phaseCode)
    formData.append('phase_name',data.phaseName)
    formData.append('remark',data.remark)
    formData.append('action','edit')
    return fetch(config.api.phase.update,{
      method:'post',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken')
      },
      body:formData,
    }).then(res => res.json()).then(res => {
      if(res.title == 'Success'){
        dispatch({
          types:GET_WORKSPACEDATA,
          callAPI:()=>{
            return fetch(config.api.workspace.baseInfo.baseData.get('phase','','',''),{
              method:'GET',
              headers:{
                'from':'nodejs',
                'token':sessionStorage.getItem('accessToken'),
              }
            }).then(res => res.json())
          }
        })
      }else{
        notification.error({message:'修改失败',description:'网络错误'})
      }
    })
  }
}

export function deletePhase(data){
  return dispatch => {
    let formData = new FormData()
    formData.append('phase_code',data.phaseCode)
    formData.append('phase_name',data.phaseName)
    formData.append('remark',data.remark)
    formData.append('action','delete')
    return fetch(config.api.phase.update,{
      method:'post',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken')
      },
      body:formData,
    }).then(res => res.json()).then(res => {
      if(res.title == 'Success'){
        dispatch({
          types:GET_WORKSPACEDATA,
          callAPI:()=>{
            return fetch(config.api.workspace.baseInfo.baseData.get('phase','','',''),{
              method:'GET',
              headers:{
                'from':'nodejs',
                'token':sessionStorage.getItem('accessToken'),
              }
            }).then(res => res.json()).then(res => {notification.success({message:'删除成功'});return res})
          }
        })
      }else{
        notification.error({message:'删除失败',description:'网络错误'})
      }
    })
  }
}
