import {GET_WORKSPACEDATA} from './workspace'
import config from '../config.js'
import {notification} from 'antd'

export function addSubject(data){
  return dispatch => {
    let formData = new FormData()
    formData.append('subject_name',data.subjectName)
    formData.append('subject_short_name',data.subjectShortName)
    formData.append('remark',data.remark)
    return fetch(config.api.subject.post,{
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
            return fetch(config.api.workspace.baseInfo.baseData.get('subject','','',''),{
              method:'GET',
              headers:{
                'from':'nodejs',
                'token':sessionStorage.getItem('accessToken'),
              }
            }).then(res => res.json()).then(res => {notification.success({message:'添加成功'});return res})
          }
        })
      }
    })
  }
}

export function editSubject(data){
  return dispatch => {
    let formData = new FormData()
    formData.append('gradeName',data.gradeName)
    formData.append('phaseCode',data.phaseCode)
    formData.append('gradeNickName',data.gradeNickName)
    formData.append('action',data.action)
    formData.append('gradeId',data.gradeId)
    return fetch(config.api.grade.update,{
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
            return fetch(config.api.workspace.baseInfo.baseData.get('grade','','',''),{
              method:'GET',
              headers:{
                'from':'nodejs',
                'token':sessionStorage.getItem('accessToken'),
              }
            }).then(res => res.json()).then(res => {notification.success(data.action=='edit'?{message:'修改成功'}:{message:'删除成功'});return res})
          }
        })
      }
    })
  }
}
