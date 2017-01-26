import React from 'react'
import {Icon,Input,Table,Button,Modal,Form} from 'antd'
import PermissionDic from '../../utils/permissionDic'
import {getTableData} from '../../actions/course_center/main'
import {fromJS,Map,List} from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {findMenuInTree} from '../../reducer/menu'
import styles from './PublicCoursePage.scss'
import TableComponent from '../../components/table/TableComponent'
import CourseFilterComponent from '../../components/course_filter/CourseFilterComponent'
import _ from 'lodash'

const FormItem = Form.Item
const confirm = Modal.confirm

const PublicCoursePage = React.createClass({
  _currentMenu:Map({
    authList:List()
  }),

  getInitialState(){
    return {
    }
  },

  componentWillMount(){
    if(!this.props.menu.get('data').isEmpty()){
      this._currentMenu = findMenuInTree(this.props.menu.get('data'),'publicPage')
    }
  },

  getTableData(){
    let tableHeader = List()
    let tableBody = List()
    let authList = this._currentMenu.get('authList')
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
    tableHeader = tableHeader.concat(authList.filter(v => (v.get('authUrl').split('/')[2] != 'view')&&(v.get('authUrl').split('/')[2] != 'add')).map( v => {
      return {
        title: PermissionDic[v.get('authUrl').split('/')[2]],
        dataIndex: v.get('authUrl').split('/')[2],
        key: v.get('authUrl').split('/')[2],
        className:styles.editColumn,
        render:(text,record) => {
          return (
            <div>
              <Button className={styles.editButton}type="primary" onClick={this.handleShowEditSubjectModal.bind(this,record.key)}>编辑</Button>
              <Button className={styles.deleteButton} type="primary" onClick={this.handleShowDeleteModal.bind(this,record.key)}>删除</Button>
            </div>
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
    // const tableData = this.getTableData()
    const {courseCenter} = this.props
    return (
      <div className={styles.container}>
        <div className={styles.header}>
        </div>
        <div className={styles.body}>
          course
          {/* <TableComponent tableData={tableData} pageType="subject" searchStr={this.state.searchStr}></TableComponent> */}
        </div>
      </div>
    )
  }
})

function mapStateToProps(state){
  return{
    menu:state.get('menu'),
    courseCenter:state.get('courseCenter')
  }
}
function mapDispatchToProps(dispatch){
  return {
    getTableData:bindActionCreators(getTableData,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(PublicCoursePage))
