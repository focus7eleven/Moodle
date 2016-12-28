import React from 'react'
import styles from './MainContainer.scss'
import Navigate from '../components/Navigate'
import LeftBoard from '../components/LeftBoard'
import {Affix,Icon} from 'antd'
import logo from '../../resource/3.jpg'

const MainContainer = React.createClass({
  getInitialState(){
    return {
      showMenuBar:false
    }
  },
  handleShowMenu(){
    this.setState({
      showMenuBar:!this.state.showMenuBar
    })
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
            <div className={styles.leftBoard}><LeftBoard /></div>
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
          {/* <Affix>
            <div className={styles.miniMenuBar}>
              <div className={styles.toggleButton}><Icon type='bars' style={{fontSize:'24px'}} onClick={this.handleShowMenu}/></div>
              <div className={styles.miniNavigate} style={this.state.showMenuBar?{transform:'translateX(950px)',transition:'transform 1s'}:{transform:'translateX(-950px)',transition:'transform 2s'}}>
                <Navigate type="mini"/>
              </div>
              <div className={styles.miniLeftBoard} style={this.state.showMenuBar?{transform:'translateY(1050px)',transition:'transform 1s'}:{transform:'translateX(-1050px)',transition:'transform 2s'}}>
                <LeftBoard />
              </div>
            </div>
          </Affix> */}
          {/* <div className={styles.workspace}>
            {
              this.props.children
            }
          </div> */}
        </div>
      </div>
    )
  }
})

export default MainContainer
