import {actionNames} from '../utils/action-utils'
import {fromJS} from 'immutable'
import config from '../config.js'
import {notification} from 'antd'
//获取表格数据
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

//添加一个新的学段，添加成功后再获取一遍数据
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

//编辑一个新的学段，添加成功后再获取一遍数据
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
//删除一个新的学段，添加成功后再获取一遍数据
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
//添加学段对应的学科
export function addPhaseSubject(data){
  return dispatch => {
    let formData = new FormData()
    formData.append('phaseCode',data.phaseCode)
    formData.append('subjectIds',JSON.stringify(data.subjectIds))
    return fetch(config.api.phase.subjectList.update,{
      method:'post',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken')
      },
      body:formData
    }).then(res => res.json()).then(res => {
      if(res.title=='Success'){
        dispatch({
          types:GET_WORKSPACEDATA,
          callAPI:()=>{
            return fetch(config.api.workspace.baseInfo.baseData.get('phase','','',''),{
              method:'GET',
              headers:{
                'from':'nodejs',
                'token':sessionStorage.getItem('accessToken'),
              }
            }).then(res => res.json()).then(res => {notification.success({message:'添加成功'});return res})
          }
        })
      }else{
        notification.error({message:'添加失败',description:'网络错误'})
      }
    })
  }
}
