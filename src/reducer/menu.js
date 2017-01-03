import {
  GET_SUBMENU,
  CHANGE_MENU
} from '../actions/menu'

import {fromJS} from 'immutable'

const initMenu = fromJS({
  loading:false,
  data:[{
    title:'基础信息',
    key:'base-info',
    children:[]
  },{
    title:'通知管理',
    key:'notice-mgr',
    children:[]
  },{
    title:'教育资讯',
    key:'edu-info',
    children:[]
  },{
    title:'任务管理',
    key:'task-mgr',
    children:[]
  },{
    title:'课程中心',
    key:'course-center',
    children:[]
  },{
    title:'作业中心',
    key:'homework',
    children:[]
  },{
    title:'微课中心',
    key:'microvideo-mgr',
    children:[]
  }]
})

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

export default (state=initMenu,action) => {
  switch (action.type) {
    case CHANGE_MENU:
      return state.set('loading',false)
    case GET_SUBMENU[0]:
      return state.set('loading',true)
    case GET_SUBMENU[1]:
      let index = state.get('data').findIndex( v => v.get('key')==action.key)
      return state.setIn(['data',index,'children'],action.data).set('loading',false)
    default:
      return state
  }
}
