import React from 'react'
import {Menu,Icon} from 'antd'
import styles from './Navigation.scss'
import {Motion,spring} from 'react-motion'

const mockSubMenu = [{
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
}]

const Naviagtion = React.createClass({

  getDefaultProps(){
    return {
      menu:[{title:'基础信息',key:'base-info'},{title:'通知管理',key:'notice-mgr'},{title:'教育资讯',key:'edu-info'},{title:'任务管理',key:''},{title:'课程中心',key:'task-mgr'},{title:'作业中心',key:'homework'},{title:'微课中心',key:'microvideo-mgr'}]
    }
  },
  getInitialState(){
    return {
      subMenu:[],
      openSubMenu:false,
    }
  },
  handleDropDownSubmenu(){
    this.setState({
      subMenu:mockSubMenu,
      openSubMenu:true,
    })
  },
  handleFoldSubmenu(){
    this.setState({
      openSubMenu:false,
    })
  },

  renderSubMenu(){
    return (
      <div className={styles.dropDownContainer}>
        <div className={styles.pandelContent}>
          {
            this.state.subMenu.map( (second,key) => {
              return (
                <div key={key} className={styles.secondMenu}>
                  <div className={styles.secondMenuTitle}><span>{second.title}</span><Icon type="right" /></div>
                  {
                    second.children.map( third => {
                      return (
                        <div key={third.title} className={styles.thirdMenu}>
                          {third.title}
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
        <div className={styles.foldIcon}><Icon onClick={this.handleFoldSubmenu} type="up" /></div>
      </div>
    )
  },

  render(){
    return (
      <div className={styles.wrapper}>
        <div className={styles.naviagtion}>
          <div className={styles.logo}><img src='https://unsplash.it/110/40'/></div>
          <Menu mode="horizontal" className={styles.menu}>
            {
              this.props.menu.map( item => (
                <Menu.Item key={item.key} >
                  <div onMouseEnter={this.handleDropDownSubmenu.bind(this,item.key)}>
                    {item.title}
                  </div>
                </Menu.Item>
              ))
            }
          </Menu>
          <div className={styles.avatar}><img src='https://unsplash.it/25/25' /><span className={styles.nameDesc}>曹老师（任课老师）</span></div>
        </div>
        <Motion defaultStyle={{x: 0}} style={this.state.openSubMenu?{x:spring(250)}:{x:spring(0)}}>
          {interpolatingStyle => (
            <div className={styles.dropDownPanel} style={{height:interpolatingStyle.x+'px'}} onMouseLeave={this.handleFoldSubmenu}>
              {this.renderSubMenu()}
            </div>
          )}
        </Motion>
      </div>
    )
  }
})

export default Naviagtion
