import React from 'react'
import {Table, Icon, Menu, Button, Dropdown} from 'antd'
import styles from './EduOutline.scss'

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

// const menu = (
//   <div className={styles.dropdownOverlay}>
//     <span>选项</span>
//     <span>选项</span>
//     <span>选项</span>
//     <span>选项</span>
//     <span>选项</span>
//     <span>选项</span>
//     <span>选项</span>
//     <span>选项</span>
//     <span>选项</span>
//     <span>选项</span>
//   </div>
// );

const menu = (
  <Menu>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3d menu item</Menu.Item>
    <Menu.Item key="4">3d menu item</Menu.Item>
    <Menu.Item key="5">3d menu item</Menu.Item>
    <Menu.Item key="6">3d menu item</Menu.Item>
    <Menu.Item key="7">3d menu item</Menu.Item>
    <Menu.Item key="8">3d menu item</Menu.Item>
    <Menu.Item key="9">3d menu item</Menu.Item>
    <Menu.Item key="19">3d menu item</Menu.Item>
    <Menu.Item key="29">3d menu item</Menu.Item>
    <Menu.Item key="39">3d menu item</Menu.Item>
    <Menu.Item key="49">3d menu item</Menu.Item>
  </Menu>
);

const EduOutline = React.createClass({
  handleFilterFadeIn(evt){
    const ref = evt.target.getAttribute('data-ref');
    this.refs.filter.style.zIndex = 1;
    this.refs[ref].style.zIndex = 2;
    this.refs[ref].style.borderBottom = "none";
    console.log(this.refs.header.offsetWidth);
  },
  handleFilterFadeOut(evt){
    const ref = evt.target.getAttribute('data-ref');
    this.refs.filter.style.zIndex = -2;
    this.refs[ref].style.borderBottom = "1px solid pink";
  },
  render(){
    return (
      <div className={styles.container}>
        <div className={styles.header} ref="header">
          <div data-ref="filterButton" ref="filterButton" onMouseEnter={this.handleFilterFadeIn} onMouseLeave={this.handleFilterFadeOut} className={styles.filterButton}>新建</div>
          <div data-ref="filterButton2" ref="filterButton2" onMouseEnter={this.handleFilterFadeIn} onMouseLeave={this.handleFilterFadeOut} className={styles.filterButton}>新建2</div>
          <div ref="filter" className={styles.filter}>
          </div>
        </div>
        <div className={styles.body}>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    )
  }
})

export default EduOutline
