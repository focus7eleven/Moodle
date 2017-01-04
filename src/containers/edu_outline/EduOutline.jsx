import React from 'react'
import {Menu,Button} from 'antd'

const EduOutline = React.createClass({
  render(){
    return (
      <div className={styles.containers}>
        <div className={styles.header}>
          <Button ></Button>
          <div className={styles.filter}>
            <Menu mode="vertical" style={{width:200}}>
              <SubMenu key="sub4" title={<span><icon type="setting" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
            <Menu>
              <SubMenu key="sub4" title={<span><icon type="setting" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
            <Menu>
              <SubMenu key="sub4" title={<span><icon type="setting" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
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
