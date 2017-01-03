import React from 'react'
import {Icon,Input,Breadcrumb,Table} from 'antd'
import styles from './BaseInfoContainer.scss'


const BaseInfoContainer = React.createClass({
  getInitialState(){
    return {}
  },

  getDefaultProps(){
    return {
      tableData:{
        columns: [{
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
          }
        ],
        data: [{
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
          }
        ],

      }
    }
  },

  render(){
    const {tableData} = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>基础信息</Breadcrumb.Item>
            <Breadcrumb.Item href="">基础数据</Breadcrumb.Item>
            <Breadcrumb.Item>学科</Breadcrumb.Item>
          </Breadcrumb>
          <Input className={styles.searchInput} size="large"/>
        </div>
        <div className={styles.body}>
          <Table bordered columns={tableData.columns} dataSource={tableData.data} />
        </div>
      </div>
    )
  }
})

export default BaseInfoContainer
