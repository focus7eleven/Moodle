import React from 'react'
import {Icon,Input,Breadcrumb,Table} from 'antd'
import styles from './BaseInfoContainer.scss'
import PermissionDic from '../../utils/permissionDic'
import { withRouter } from 'react-router'
import { connect} from 'react-redux'
import { findMenuInTree } from '../../reducer/menu'
import {fromJS,List,Map} from 'immutable'


const BaseInfoContainer = React.createClass({
  getInitialState(){
    return {}
  },

  getDefaultProps(){
    return {}
  },

  getTableData(){
    let {type} = this.props.router.params
    let tableHeader = List()
    let currentMenu = !this.props.menu.get('data').isEmpty()?findMenuInTree(this.props.menu.get('data'),'phase'):null
    let authList = currentMenu?currentMenu.get('authList'):List()
    console.log("--->:哈哈",currentMenu?currentMenu.toJS():null)
    switch (type) {
      case 'phase':
        tableHeader = fromJS([{
          title: '学段编号',
          dataIndex: 'num',
          key: 'num',
        },{
          title: '学段名称',
          dataIndex: 'name',
          key: 'name',
        },{
          title: '备注',
          dataIndex: 'comment',
          key: 'comment',
        },{
          title: '所属学科',
          dataIndex: 'subjects',
          key: 'subjects',
        }]).concat(authList.map( v => {
          return {
            title: PermissionDic[v.get('authUrl').split('/')[2]],
            dataIndex: v.get('authUrl').split('/')[2],
            key: v.get('authUrl').split('/')[2],
          }
        }))
        break;
      default:

    }
    console.log("-->:",tableHeader.toJS())
    return {}
  },

  render(){
    const tableData = this.getTableData()

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
function mapStateToProps(state){
  return{
    menu:state.get('menu'),
    user:state.get('user'),
  }
}
export default connect(mapStateToProps)(withRouter(BaseInfoContainer))
