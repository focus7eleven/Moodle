import React from 'react'
import {Icon,Input,Table,Button} from 'antd'
import styles from './BaseInfoContainer.scss'
import PermissionDic from '../../utils/permissionDic'
import { connect} from 'react-redux'
import { findMenuInTree,findPath} from '../../reducer/menu'
import {fromJS,List,Map} from 'immutable'
import { getWorkspaceData,setPath } from '../../actions/workspace'
import {bindActionCreators} from 'redux'
import _ from 'lodash'

const Search = Input.Search

const BaseInfoContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState(){
    return {
      searchStr:'',
    }
  },

  getDefaultProps(){
    return {}
  },

  componentWillReceiveProps(nextProps){
    if(nextProps.workspace.get('data').isEmpty() || (this.props.params.type != nextProps.params.type)){
      this.props.getWorkspaceData(this.context.router.params.type,'','','')
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
          className:styles.tableColumn,
        },{
          title: '学段名称',
          dataIndex: 'phase_name',
          key: 'phase_name',
          className:styles.tableColumn,
        },{
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          className:styles.tableColumn,
        },{
          title: '所属学科',
          dataIndex: 'subjectStr',
          key: 'subjectStr',
          className:styles.tableColumn,
        }])
        break;
      case 'grade':
        tableHeader = fromJS([{
          title: '名称',
          dataIndex: 'gradeName',
          key: 'gradeName',
          className:styles.tableColumn,
        },{
          title: '别称',
          dataIndex: 'gradeNickName',
          key: 'gradeNickName',
          className:styles.tableColumn,
        },{
          title: '学段',
          dataIndex: 'phaseName',
          key: 'phaseName',
          className:styles.tableColumn,
        }])
        break;
      case 'subject':
        tableHeader = fromJS([{
          title: '学科名称',
          dataIndex: 'subject_name',
          key: 'subject_name',
          className:styles.tableColumn,
        },{
          title: '学科短称',
          dataIndex: 'subject_short_name',
          key: 'subject_short_name',
          className:styles.tableColumn,
        },{
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          className:styles.tableColumn,
        }])
        break;
      default:
    }
    tableHeader = tableHeader.concat(authList.map( v => {
      return {
        title: PermissionDic[v.get('authUrl').split('/')[2]],
        dataIndex: v.get('authUrl').split('/')[2],
        key: v.get('authUrl').split('/')[2],
        className:styles.tableColumn,
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
  handleSearchTableData(value){
    this.props.getWorkspaceData(this.context.router.params.type,this.props.workspace.get('data').get('nowPage'),this.props.workspace.get('data').get('pageShow'),value)
  },

  render(){
    const tableData = this.getTableData()
    const {workspace} = this.props
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Search placeholder="input search text" value={this.state.searchStr} onChange={(e)=>{this.setState({searchStr:e.target.value})}} onSearch={this.handleSearchTableData} />
        </div>
        <div className={styles.body}>
          <div className={styles.wrapper}>
            <Table rowClassName={(record,index)=>index%2?styles.tableDarkRow:styles.tableLightRow} bordered columns={tableData.tableHeader} dataSource={tableData.tableBody}
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
            <div className={styles.tableMsg}>当前条目{workspace.get('data').get('start')}-{parseInt(workspace.get('data').get('start'))+parseInt(workspace.get('data').get('pageShow'))}/总条目{workspace.get('data').get('totalCount')}</div>
          </div>
        </div>
      </div>
    )
  }
})
function mapStateToProps(state){
  return{
    menu:state.get('menu'),
    workspace:state.get('workspace')
  }
}
function mapDispatchToProps(dispatch){
  return {
    getWorkspaceData:bindActionCreators(getWorkspaceData,dispatch),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(BaseInfoContainer)
