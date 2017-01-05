import React from 'react'
import {Icon} from 'antd'
import styles from './ChangeUserDropdown.scss'

const ChangeUserDropDown = React.createClass({
  render(){
    return (
      <div className={styles.changeUser} onClick={(e)=>{e.stopPropagation()}}>
        <div className={styles.avatar}><img src = 'https://unsplash.it/25/25'/></div>
        <div className={styles.name}>曹老师</div>
        <div className={styles.division}></div>
        <div className={styles.menuList}>
          <div className={styles.item}><Icon type="user" />个人资料</div>
          <div className={styles.item}><Icon type="lock" />修改密码</div>
          <div className={styles.item}><Icon type="retweet" />更换角色</div>
          <div className={styles.item}><Icon type="logout" />退出</div>
        </div>
      </div>
    )
  }
})

export default ChangeUserDropDown
