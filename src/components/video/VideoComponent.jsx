import React from 'react'
import styles from './VideoComponent.scss'
import {Tag} from 'antd'

const VideoComponent = React.createClass({
  getDefaultProps(){
    tag
  },
  render(){
    return(
      <div className={styles.videoComponent}>
        <div className={styles.videoContainer}>
          <Tag color='#8494C8'>{this.props.tag}</Tag>
          <video>
          </video>
          <div className={styles.mask}>
          
          </div>
        </div>
        <div className={styles.descContainer}>

        </div>
      </div>
    )
  }
})
