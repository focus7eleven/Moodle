import {actionNames} from '../utils/action-utils'
import {fromJS} from 'immutable'
import config from '../config.js'
import {notification} from 'antd'
notification.config({
  top: window.screen.availHeight-200,
  duration: 3,
});
//获取表格数据
export const GET_WORKSPACEDATA = actionNames('GET_WORKSPACEDATA')

export function getWorkspaceData(type,currentPage,pageShow,search,suffix='page'){
  let realType = type;
  if(type==="normalgroup"){
    realType='group/normal'
  }
  if(type==="madegroup"){
    realType='group/made'
  }
  if(type=='school'){
    suffix='pageByArea'
  }
  return {
    types:GET_WORKSPACEDATA,
    callAPI:()=>{
      return fetch(config.api.workspace.baseInfo.baseData.get(realType,currentPage,pageShow,search,suffix),{
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
            }).then(res => {notification.success({message:'添加成功'});return res.json()})
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
            }).then(res => {notification.success({message:'编辑成功'});res.json()})
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


export const addGrade = require('./grade').addGrade
export const editGrade = require('./grade').editGrade

export const addSubject = require('./subject').addSubject
export const editSubject = require('./subject').editSubject

export const addDict = require('./dict').addDict
export const editDict = require('./dict').editDict

export const editRoleDesc = require('./role').editRoleDesc
export const addRole = require('./role').addRole
export const editRole = require('./role').editRole


export const addTextbook = require('./textbook').addTextbook
export const editTextbook = require('./textbook').editTextbook
export const deleteTextbook = require('./textbook').deleteTextbook
export const searchTextbook = require('./textbook').searchTextbook
export const SEARCH_TEXTBOOK = require('./textbook').SEARCH_TEXTBOOK

export const addResource = require('./resource').addResource
export const editResource = require('./resource').editResource
export const getAllResources = require('./resource').getAllResources
export const updateAuth = require('./resource').updateAuth
export const GET_ALL_RESOURCES = require('./resource').GET_ALL_RESOURCES

export const addMadeGroup = require('./group').addMadeGroup

export const GET_ALL_AREAS = require('./staff').GET_ALL_AREAS
export const getAllAreas = require('./staff').getAllAreas
export const addStaff = require('./staff').addStaff
export const editStaff = require('./staff').editStaff
export const downloadExcel = require('./staff').downloadExcel
export const importExcel = require('./staff').importExcel

export const addDepartment = require('./department').addDepartment
export const editDepartment = require('./department').editDepartment

export const addArea = require('./area').addArea
export const editArea = require('./area').editArea

export const searchSchool = require('./school').searchSchool
export const SEARCH_SCHOOL = require('./school').SEARCH_SCHOOL
