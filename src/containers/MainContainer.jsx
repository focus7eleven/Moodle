import React from 'react'
import styles from './MainContainer.scss'
import Navigate from '../components/Navigate'
import LeftBoard from '../components/LeftBoard'
import {Affix,Icon} from 'antd'

const MainContainer = React.createClass({
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
  render(){
    return (
      <div style={{height:'100%',width:'100%'}}>
        <div className={styles.container}>
          <div className={styles.navigate}><Navigate /></div>
          <div className={styles.content}>
            <div className={styles.leftBoard}><LeftBoard /></div>
            <div className={styles.workspace}>
            {
              this.props.children
            }
            </div>
          </div>
        </div>
        <div className={styles.miniContainer}>
          <div className={styles.content}>
            <div className={styles.leftBoardContainer} style={this.state.showLeftBoard?{transform:'translateX(0px)',transition:'transform 0.7s'}:{transform:'translateX(-200px)',transition:'transform 0.7s'}}>
                <div className={styles.toggleButton}>{this.state.showLeftBoard?<Icon type="menu-fold" onClick={this.handleShowLeftBoard}/>:<Icon type="menu-unfold" onClick={this.handleShowLeftBoard}/>}</div>
                <div className={styles.leftBoard}><LeftBoard /></div>
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
})

export default MainContainer
