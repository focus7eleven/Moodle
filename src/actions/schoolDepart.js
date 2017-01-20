import {actionNames} from '../utils/action-utils'
import {GET_WORKSPACEDATA} from './workspace'
import config from '../config.js'
import {notification} from 'antd'

export function addSchoolDepart(data){
  return dispatch => {
    return fetch(config.api.schoolDepart.addSchoolDepart,{
      method:'post',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken'),
      },
      body: data
    }).then(res => res.json()).then(res => {
      if(res.title == 'Success'){
        dispatch(getWorkspaceData('schoolDepart','','','')).then(res => {notification.success({message:'添加成功'});return res})
      }else{
        notification.error({message:'添加失败',description: res.result});
        return "error";
      }
    })
  }
}

export function editSchoolDepart(data){
  return dispatch => {
    return fetch(config.api.schoolDepart.editSchoolDepart,{
      method:'post',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken'),
      },
      body: data
    }).then(res => res.json()).then(res => {
      if(res.title == 'Success'){
        dispatch(getWorkspaceData('schoolDepart','','','')).then(res => {notification.success(data.get('action')=='edit'?{message:'编辑成功'}:{message:'删除成功'});return res});
      }else{
        notification.error({message:'失败',description:'编辑失败'})
        return "error";
      }
    })
  }
}
