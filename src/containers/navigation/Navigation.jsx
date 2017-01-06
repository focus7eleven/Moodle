import React from 'react'
import {Menu,Icon,Spin} from 'antd'
import styles from './Navigation.scss'
import {Motion,spring} from 'react-motion'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import logo from 'images/logo.png'
import {getMenu} from '../../actions/menu'
import classNames from 'classnames'

const Navigation = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState(){
    return {
      openSubMenu:false,
      // openSubMenu:true,
      currentMenu:'',
      menuHeight: 250,
      minThirdMenuCount: 5,
    }
  },

  componentDidMount(){
    this.props.user.get('accessToken')?this.props.getMenu(this.props.user.get('accessToken')):null
  },

  componentWillReceiveProps(nextProps){
    let min = 5;
    nextProps.menu.get('data').map(item=>{
      item.get('childResources').map(item=>{
        min =  item.get('childResources').size > min ? item.get('childResources').size : min;
      })
    })
    const newMenuHeight = min > 5 ? 250 + (min - 5) * 40 : 250;
    this.setState({minThirdMenuCount:min,menuHeight:newMenuHeight});
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

  handleSelectMenu(e){
    const url = e.target.getAttribute('data-url');
    this.setState({
      openSubMenu:false,
    })
    this.context.router.push(`/index/${this.state.currentMenu}/${url}`)
  },

  renderSubMenu(){
    const {currentMenu} = this.state
    const subMenu = currentMenu?this.props.menu.get('data').findEntry( v => v.get('resourceUrl')==currentMenu)[1]:null
    const isVertical = subMenu?subMenu.get('childResources').size>3:true;
    return (
      subMenu?
      <div className={styles.dropDownContainer}>
        <div style={{height:this.state.menuHeight-30+"px"}} className={classNames(isVertical?styles.panelContent:styles.panelContentHori)}>
        {
          subMenu.get('childResources').map( (second,key) => {
            return (
              <div key={key} className={classNames(isVertical?styles.secondMenu:styles.secondMenuHori)}>
                <div className={classNames(isVertical?styles.secondMenuTitle:styles.secondMenuTitleHori)}><span>{second.get('resourceName')}</span><Icon style={{color:'rgb(80,80,80)'}} type="right" /></div>
                <div className={classNames(isVertical?null:styles.thirdMenuHoriWrapper)}>
                  {
                    second.get('childResources').map( third => {
                      return (
                        <div data-url={third.get('resourceUrl')} key={third.get('resourceName')} className={classNames(isVertical?styles.thirdMenu:styles.thirdMenuHori)} onClick={this.handleSelectMenu}>
                          {third.get('resourceName')}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
        </div>
        <div className={styles.foldIcon}><Icon onClick={this.handleFoldSubmenu} type="up" /></div>
      </div>
      :null
    )
  },

  render(){
    return (
      <div className={styles.wrapper}>
        <div className={styles.navigation}>
          <div className={styles.logo}><img src={logo}/></div>
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
        <Motion defaultStyle={{x: 0}} style={this.state.openSubMenu?{x:spring(this.state.menuHeight)}:{x:spring(0)}}>
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
    getMenu:bindActionCreators(getMenu,dispatch),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navigation)
