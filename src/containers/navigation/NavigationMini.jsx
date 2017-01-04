import React from 'react'
import {Menu,Icon} from 'antd'
import {Motion,spring} from 'react-motion'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getMenu} from '../../actions/menu'
import styles from './NavigationMini.scss'
import logo from '../../../resource/basic/logo.png'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const NavigationMini = React.createClass({
  getDefaultProps(){
    return {
      menu:[]
    }
  },
  getInitialState(){
    return {
      openMenu:false,
    }
  },
  componentDidMount(){
    this.props.user.get('accessToken')||sessionStorage.getItem('accessToken')?this.props.getMenu(this.props.user.get('accessToken')):null
  },
  componentWillReceiveProps(nextProps){
    nextProps.user.get('accessToken') && this.props.menu.get('data').isEmpty()?this.props.getMenu(nextProps.user.get('accessToken')):null
  },
  renderNavigate(menu){
    return menu.map( (v,key) => {
      if(!v.get('childResources')){
        return (
          <Menu.Item key={v.get('resourceName')}>{v.get('resourceName')}</Menu.Item>
        )
      }else{
        return (
          <SubMenu key={v.get('resourceName')} title={<span>{v.get('resourceName')}</span>}>
            {
              this.renderNavigate(v.get('childResources'))
            }
          </SubMenu>
        )
      }
    })
  },
  render(){
    return (
      <div className={styles.navigationMini}>
        {this.state.openMenu?<div className={styles.mask} onClick={()=>{this.setState({openMenu:false})}}></div>:null}
        <div className={styles.navigationToggle} >
          <Icon type="bars" onClick={()=>{this.setState({openMenu:true})}}/><div className={styles.decoration}><div className={styles.logo}><img src={logo}/></div></div>
        </div>
        <Motion defaultStyle={{x: -240}} style={this.state.openMenu?{x:spring(0)}:{x:spring(-240)}}>
        {interpolatingStyle => (
          <div style={{left:interpolatingStyle.x+'px'}} className={styles.leftNavigation}>
            <Menu style={{ width: 240 ,height: '100%'}} mode="inline">
              {!this.props.menu.get('data').isEmpty()?this.renderNavigate(this.props.menu.get('data')):null}
            </Menu>
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

export default connect(mapStateToProps,mapDispatchToProps)(NavigationMini)
