import React from 'react'
import {Menu,Button} from 'antd'
import styles from './EduOutline.scss'
const SubMenu = Menu.SubMenu

const EduOutline = React.createClass({
  render(){
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Button >新建</Button>
          <div className={styles.filter}>
          {
            
          }
          </div>
        </div>
        <div className={styles.body}>
        </div>
      </div>
    )
  }
})

export default EduOutline
