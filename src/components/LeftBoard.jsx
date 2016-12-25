import React from 'react'
import { Menu} from 'antd';
const SubMenu = Menu.SubMenu;

const LeftBoard = React.createClass({
  getDefaultProps(){
    return {
      menuList:[{'基础数据':['学段','年级','学科']}],
      onSelect:()=>{},
    }
  },
  handleSelect({ item, key, selectedKeys }){
    this.props.onSelect(key)
  },
  render(){
    const {menuList} = this.props
    return (
      <Menu style={{height: '100%'}} onSelect={this.handleSelect} mode="inline" defaultOpenKeys={[Object.keys(menuList[0])[0]]}>
        {
          menuList.map( subMenu => {
            let key = Object.keys(subMenu)[0]
            return (
              <SubMenu key={key} title={key}>
                {
                  subMenu[key].map( (menu,key) => (
                    <Menu.Item key={key}>{menu}</Menu.Item>
                  ))
                }
              </SubMenu>
            )
          })
        }
      </Menu>
    )
  }
})
export default LeftBoard
