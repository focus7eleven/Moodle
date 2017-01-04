import React from 'react'
import {Icon,Input,Table,Button} from 'antd'
import styles from './BaseInfoContainer.scss'
import PermissionDic from '../../utils/permissionDic'
import { connect} from 'react-redux'
import { findMenuInTree } from '../../reducer/menu'
import {fromJS,List,Map} from 'immutable'
import { getWorkspaceData } from '../../actions/workspace'
import {bindActionCreators} from 'redux'

const BaseInfoContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState(){
    return {
      searchStr:'',
      pageShow:10,
      start:0,
      nowPage:1,
    }
  },

  getDefaultProps(){
    return {}
  },
  componentWillReceiveProps(nextProps){
    if(this.props.workspace.get('data').isEmpty() || (this.props.params.type != nextProps.params.type)){
      this.props.getWorkspaceData(this.context.router.params.type,'','','')
    }
    if(!this.props.workspace.get('data').isEmpty()){
      this.setState({
        pageShow:this.props.workspace.get('data').get('pageShow'),
        start:this.props.workspace.get('data').get('start'),
        nowPage:this.props.workspace.get('data').get('nowPage'),
      })
    }
  },

  getTableData(){
    let {type} = this.props.router.params
    let tableHeader = List()
    let tableBody = List()
    let currentMenu = !this.props.menu.get('data').isEmpty()?findMenuInTree(this.props.menu.get('data'),'phase'):null
    let authList = currentMenu?currentMenu.get('authList'):List()
    switch (type) {
      case 'phase':
        tableHeader = fromJS([{
          title: '学段编号',
          dataIndex: 'phase_code',
          key: 'phase_code',
        },{
          title: '学段名称',
          dataIndex: 'phase_name',
          key: 'phase_name',
        },{
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        },{
          title: '所属学科',
          dataIndex: 'subjectStr',
          key: 'subjectStr',
        }])
        break;
      case 'grade':
        tableHeader = fromJS([{
          title: '名称',
          dataIndex: 'gradeName',
          key: 'gradeName',
        },{
          title: '别称',
          dataIndex: 'gradeNickName',
          key: 'gradeNickName',
        },{
          title: '学段',
          dataIndex: 'phaseName',
          key: 'phaseName',
          render:()=>{}
        }])
        break;
      case 'subject':
        tableHeader = fromJS([{
          title: '学科名称',
          dataIndex: 'subject_name',
          key: 'subject_name',
        },{
          title: '学科短称',
          dataIndex: 'subject_short_name',
          key: 'subject_short_name',
        },{
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        }])
        break;
      default:
    }
    tableHeader = tableHeader.concat(authList.map( v => {
      return {
        title: PermissionDic[v.get('authUrl').split('/')[2]],
        dataIndex: v.get('authUrl').split('/')[2],
        key: v.get('authUrl').split('/')[2],
        render:(text,record) => {
          return (
            <Button>{PermissionDic[v.get('authUrl').split('/')[2]]}</Button>
          )
        }
      }
    }))
    tableBody = !this.props.workspace.get('data').isEmpty()?this.props.workspace.get('data').get('result').map( (v,key) => {
      return {
        key:key,
        ...(v.toJS())
      }
    }):List()
    return {
      tableHeader:tableHeader.toJS(),
      tableBody:tableBody.toJS(),
    }
  },

  render(){
    const tableData = this.getTableData()
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Input className={styles.searchInput} size="large"/>
        </div>
        <div className={styles.body}>
          <Table bordered columns={tableData.tableHeader} dataSource={tableData.tableBody}
          pagination={!this.props.workspace.get('data').isEmpty()?{
            total:this.props.workspace.get('data').get('totalCount'),
            pageSize:this.props.workspace.get('data').get('pageShow'),
            current:this.props.workspace.get('data').get('nowPage'),
            onChange:(page)=>{
              this.props.getWorkspaceData(this.context.router.params.type,page,this.props.workspace.get('data').get('pageShow'),this.state.searchStr)
            },
            onShowSizeChange:(current,size)=>{
              this.props.getWorkspaceData(this.context.router.params.type,this.props.workspace.get('data').get('nowPage'),size,this.state.searchStr)
            }
          }:null} />
        </div>
      </div>
    )
  }
})
function mapStateToProps(state){
  return{
    menu:state.get('menu'),
    user:state.get('user'),
    workspace:state.get('workspace')
  }
}
function mapDispatchToProps(dispatch){
  return {
    getWorkspaceData:bindActionCreators(getWorkspaceData,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(BaseInfoContainer)
