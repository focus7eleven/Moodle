import React from 'react'
import {Menu,Icon,Spin} from 'antd'
import styles from './Navigation.scss'
import {Motion,spring} from 'react-motion'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import logo from 'images/logo.png'
import {getMenu} from '../../actions/menu'
import {setPath} from '../../actions/workspace'

const Navigation = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
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
    const subMenu = e.target.getAttribute('data-subMenu');
    const second = e.target.getAttribute('data-second');
    const third = e.target.getAttribute('data-third');
    const url = e.target.getAttribute('data-url');
    this.props.setPath([subMenu,second,third]);
    this.setState({
      openSubMenu:false,
    })
    this.context.router.push(`/index/${this.state.currentMenu}/${url}`)
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
                      <div data-url={third.get('resourceUrl')} data-subMenu={subMenu.get('resourceName')} data-second={second.get('resourceName')} data-third={third.get('resourceName')} key={third.get('resourceName')} className={styles.thirdMenu} onClick={this.handleSelectMenu}>
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
    getMenu:bindActionCreators(getMenu,dispatch),
    setPath:bindActionCreators(setPath,dispatch),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navigation)
