import React from 'react'
import styles from './MainContainer.scss'
import Navigate from '../components/Navigate'
import LeftBoard from '../components/LeftBoard'
import {Affix,Icon} from 'antd'
import logo from '../../resource/3.jpg'
import {withRouter} from 'react-router'

const MainContainer = withRouter(React.createClass({
  getInitialState(){
    return {
      showMenuBar:false,
      showLeftBoard:false,
    }
  },
  handleShowMenu(){
    this.setState({
      showMenuBar:!this.state.showMenuBar
    })
  },
  handleShowLeftBoard(){
    this.setState({
      showLeftBoard:!this.state.showLeftBoard
    })
  },
  componentWillReceiveProps(nextProps){
    console.log("---->:",nextProps)
    if(nextProps.location.pathname == '/index/base-info'){
      this._menuList = [{'基础信息':['学段','年级','学科']},{'组织结构':['学校机构','年级管理']},{'人员管理':['老师','学生','家长']},{'群组管理':['通用群','定制群']},{'教学大纲':['教学大纲']},{'工具管理':['健康档案','课程表','菜谱']}]
    }else if(nextProps.location.pathname == '/index/notice-mgr'){
      this._menuList = [{'通知':['新建的通知','收到的通知','发送的通知']}]
    }
  },
  render(){
    return (
      <div style={{height:'100%',width:'100%'}}>
        <div className={styles.container}>
          <div className={styles.navigate}>
            <img src={logo} />
            <Navigate />
          </div>
          <div className={styles.content}>
            <div className={styles.leftBoard}><LeftBoard menuList={this._menuList}/></div>
            <div className={styles.workspace}>
            {
              this.props.children
            }
            </div>
          </div>
        </div>
        <div className={styles.miniContainer}>
          <div className={styles.miniNavigate}>
            <img src={logo} />
            <Navigate type="mini"/>
          </div>
          <div className={styles.content}>
            <div className={styles.leftBoardContainer} style={this.state.showLeftBoard?{transform:'translateX(0px)',transition:'transform 0.7s'}:{transform:'translateX(-200px)',transition:'transform 0.7s'}}>
                <div className={styles.toggleButton}>{this.state.showLeftBoard?<Icon type="menu-fold" onClick={this.handleShowLeftBoard} style={{fontSize:'24px'}}/>:<Icon type="menu-unfold" onClick={this.handleShowLeftBoard} style={{fontSize:'24px'}}/>}</div>
                <div className={styles.leftBoard}><LeftBoard menuList={this._menuList}/></div>
            </div>
            <div className={styles.workspace}>
              {
                this.props.children
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}))

export default MainContainer
