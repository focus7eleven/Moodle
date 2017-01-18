import {actionNames} from '../utils/action-utils'
import {GET_WORKSPACEDATA} from './workspace'
import config from '../config.js'
import {notification} from 'antd'

export function addOfficer(data){
  return dispatch => {
    let formData = new FormData()
    formData.append('areaId',data.areaId)
    formData.append('name',data.name)
    formData.append('title',data.title)
    formData.append('id',data.id)
    formData.append('sex',data.sex)
    formData.append('phone',data.phone)
    formData.append('birth',data.birth)
    formData.append('homeAddr',data.homeAddr)
    formData.append('email',data.email)
    formData.append('userImg',data.userImg)
    return fetch(config.api.officer.addOfficer,{
      method:'post',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken'),
      },
      body:formData
    }).then(res => res.json()).then(res => {
      if(res.title == 'Success'){
        dispatch({
          types:GET_WORKSPACEDATA,
          callAPI:()=>{
            return fetch(config.api.workspace.baseInfo.baseData.get('officer','','',''),{
              method:'GET',
              headers:{
                'from':'nodejs',
                'token':sessionStorage.getItem('accessToken'),
              }
            }).then(res => res.json()).then(res => {notification.success({message:'添加成功'});return res})
          }
        })
      }else{
        notification.error({message:'添加失败',description: res.result});
        return "error";
      }
    })
  }
}

export function editOfficer(data){
  return dispatch => {
    let formData = new FormData()
    formData.append('groupName',data.groupName)
    formData.append('groupDesc',data.groupDesc)
    formData.append('action',data.action)
    return fetch(config.api.group.edit,{
      method:'post',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken'),
      },
      body:formData
    }).then(res => res.json()).then(res => {
      if(res.title == 'Success'){
        dispatch({
          types:GET_WORKSPACEDATA,
          callAPI:()=>{
            return fetch(config.api.workspace.baseInfo.baseData.get('officer','','',''),{
              method:'GET',
              headers:{
                'from':'nodejs',
                'token':sessionStorage.getItem('accessToken'),
              }
            }).then(res => res.json()).then(res => {notification.success(data.action=='edit'?{message:'编辑成功'}:{message:'删除成功'});return res})
          }
        })
      }else{
        notification.error({message:'失败',description:'编辑失败'})
      }
    })
  }
}

export const GET_ALL_AREAS = actionNames('GET_ALL_AREAS')

export function getAllAreas(){
  return {
    types:GET_ALL_AREAS,
    callAPI:()=>{
      return fetch(config.api.officer.getAllAreas,{
        method:'GET',
        headers:{
          'from':'nodejs',
          'token':sessionStorage.getItem('accessToken'),
        }
      }).then(res => res.json())
    }
  }
}
