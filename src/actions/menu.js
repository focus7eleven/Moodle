import {actionNames} from '../utils/action-utils'
import {fromJS} from 'immutable'

export const CHANGE_MENU = 'CHANGE_MENU'



export const GET_SUBMENU = actionNames('GET_SUBMENU')

const mockSubMenu = fromJS([{
  title:'基础数据',
  key:'',
  children:[{
    title:'学段',
    key:1,
  },{
    title:'学科',
    key:2,
  },{
    title:'年级',
    key:3,
  }]
},{
  title:'组织架构',
  key:'',
  children:[{
    title:'学校机构',
    key:1,
  },{
    title:'年级管理',
    key:2,
  }]
},{
  title:'人员管理',
  key:'',
  children:[{
    title:'教师',
    key:1,
  },{
    title:'家长',
    key:2,
  },{
    title:'学生',
    key:3,
  }]
},{
  title:'群组管理',
  key:'',
  children:[{
    title:'通用群组',
    key:1,
  },{
    title:'定制群组',
    key:2,
  }]
},{
  title:'教育大纲',
  key:'',
  children:[{
    title:'教育大纲',
    key:1,
  }]
},{
  title:'工具管理',
  key:'',
  children:[{
    title:'健康档案',
    key:1,
  },{
    title:'课程表',
    key:2,
  },{
    title:'菜谱',
    key:3,
  }]
}])

export function getSubmenu(parentMenu){
  return dispatch => {
    return dispatch({
        types:GET_SUBMENU,
        shouldCallAPI: (state) => {
          let index = state.getIn(['menu','data']).findIndex( v => v.get('key')==parentMenu)
          if(state.getIn(['menu','data',index,'children']).isEmpty()){
            return true
          }else{
            dispatch({
              type:CHANGE_MENU,
            })
            return false
          }
        },
        payload:{key:parentMenu},
        callAPI:() => {
          return new Promise( (resolve,reject) => {
            setTimeout(()=>{
              resolve(mockSubMenu)
            },2000)
          })
        },
    })
  }
}
