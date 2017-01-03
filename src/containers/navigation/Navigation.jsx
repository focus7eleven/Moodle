import React from 'react'
import {Menu,Icon,Spin} from 'antd'
import styles from './Navigation.scss'
import {Motion,spring} from 'react-motion'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getMenu} from '../../actions/menu'

const Naviagtion = React.createClass({

  getDefaultProps(){
    return {
      menu:[{title:'基础信息',key:'base-info'},{title:'通知管理',key:'notice-mgr'},{title:'教育资讯',key:'edu-info'},{title:'任务管理',key:'task-mgr'},{title:'课程中心',key:'course-center'},{title:'作业中心',key:'homework'},{title:'微课中心',key:'microvideo-mgr'}]
    }
  },
  getInitialState(){
    return {
      openSubMenu:false,
      currentMenu:'',
    }
  },
  componentDidMount(){
    this.props.user.get('accessToken')?this.props.getMenu(this.props.user.get('accessToken')):null
  },
  componentWillReceiveProps(nextProps){
    nextProps.user.get('accessToken') && this.props.menu.get('data').isEmpty()?this.props.getMenu(nextProps.user.get('accessToken')):null
  },
  handleDropDownSubmenu(key){
    this.setState({
      currentMenu:key,
      openSubMenu:true,
    })
  },
  handleFoldSubmenu(){
    this.setState({
      openSubMenu:false,
    })
  },

  renderSubMenu(){

    const {currentMenu} = this.state
    const subMenu = currentMenu?this.props.menu.get('data').findEntry( v => v.get('resourceUrl')==currentMenu)[1]:null
    return (
      <div className={styles.dropDownContainer}>
        <div className={styles.panelContent}>
        {
          subMenu?subMenu.get('childResources').map( (second,key) => {
            return (
              <div key={key} className={styles.secondMenu}>
                <div className={styles.secondMenuTitle}><span>{second.get('resourceName')}</span><Icon style={{color:'rgb(80,80,80)'}} type="right" /></div>
                {
                  second.get('childResources').map( third => {
                    return (
                      <div key={third.get('resourceName')} className={styles.thirdMenu}>
                        {third.get('resourceName')}
                      </div>
                    )
                  })
                }
              </div>
            )
          }):null
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
          <Menu mode="horizontal" className={styles.menu} onMouseLeave={this.handleFoldSubmenu}>
            {
              this.props.menu.get('data').map( item => (
                <Menu.Item key={item.get('resourceUrl')} >
                  <div onMouseEnter={this.handleDropDownSubmenu.bind(this,item.get('resourceUrl'))}>
                    {item.get('resourceName')}
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

function mapStateToProps(state) {
  return {
    menu:state.get('menu'),
    user:state.get('user'),
  }
}

function mapDispatchToProps(dispatch){
  return {
    getMenu:bindActionCreators(getMenu,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Naviagtion)
