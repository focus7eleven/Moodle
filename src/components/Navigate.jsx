import React from 'react'
import {Link } from 'react-router';
import { Menu,Icon } from 'antd';
// import styles from './Navigate.scss'

const NavigateContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  getDefaultProps(){
    return {
      entryList:[{
        '基础信息':'/base-info'
      },{
        '通知管理':'/notice-mgr'
      },{
        '教育资讯':'/edu-info'
      },{
        '任务管理':'/task-mgr'
      },{
        '教学计划及总结':'/teaching-plan'
      },{
        '课程中心':'/course-center'
      },{
        '作业中心':'/homework'
      },{
        '微课中心':'/microvideo-mgr'
      },{
        '题库及组卷':'/question-exampaper'
      },{
        '答题卡':'/answer-sheet'
      }]
    }
  },

  getInitialState() {
    return {
      current: this.context.router.location.pathname,
    };
  },
  handleClick(e) {
    this.setState({
      current: e.key,
    });
  },
  render(){
    const {entryList} = this.props
    return (
      <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick}>
      {
        entryList.map( entry => {
          let key = Object.keys(entry)[0]
          return (
            <Menu.Item key={entry[key]}>
              <Icon type="appstore" /><Link style={{display:'inline'}} to={entry[key]}>{key}</Link>
            </Menu.Item>
          )
        })
      }
      </Menu>
    )
  }
})

export default NavigateContainer
