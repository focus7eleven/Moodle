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
            <Menu mode="vertical" style={{width:200,zIndex:3}}>
              <SubMenu key="sub4" title={<span><icon type="setting" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
            <Menu style={{width:200,zIndex:2}}>
              <SubMenu key="sub4" title={<span><icon type="setting" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9">Option 19</Menu.Item>
                <Menu.Item key="10">Option 110</Menu.Item>
                <Menu.Item key="11">Option 111</Menu.Item>
                <Menu.Item key="12">Option 112</Menu.Item>
              </SubMenu>
            </Menu>
            <Menu style={{width:200,zIndex:1}}>
              <SubMenu key="sub4" title={<span><icon type="setting" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9">Option 19</Menu.Item>
                <Menu.Item key="10">Option 110</Menu.Item>
                <Menu.Item key="11">Option 111</Menu.Item>
                <Menu.Item key="12">Option 112</Menu.Item>
              </SubMenu>
            </Menu>

          </div>
        </div>
        <div className={styles.body}>
        </div>
      </div>
    )
  }
})

export default EduOutline
