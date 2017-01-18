import React from 'react'
import {Icon,Input,Table,Button,Modal,Form,Spin,Select} from 'antd'
import PermissionDic from '../../../utils/permissionDic'
import {getWorkspaceData,addDepartment,editDepartment} from '../../../actions/workspace'
import {fromJS,Map,List} from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { findMenuInTree,findPath} from '../../../reducer/menu'
import styles from './DepartmentPage.scss'
import _ from 'lodash'
import config from '../../../config'

const FormItem = Form.Item
const Search = Input.Search
const Option = Select.Option
const confirm = Modal.confirm


const DepartmentPage = React.createClass({
  _currentMenu:Map({
    authList:List()
  }),
  _childArea:List(),
  getInitialState(){
    return {
      searchStr:'',
    }
  },

  getDefaultProps(){
    return {}
  },
  componentWillMount(){
    if(!this.props.menu.get('data').isEmpty()){
      this._currentMenu = findMenuInTree(this.props.menu.get('data'),'grade')
    }
  },
  // componentWillReceiveProps(nextProps){
  //   if(!nextProps.menu.get('data').isEmpty()){
  //     this._currentMenu = findMenuInTree(nextProps.menu.get('data'),'grade')
  //   }
  // },
  componentDidMount(){
    fetch(config.api.area.children.get,{
      method:'get',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken')
      }
    }).then(res => res.json()).then(res => {
      this._childArea = fromJS(res)
    })
  },

  getTableData(){
    let tableHeader = List()
    let tableBody = List()
    let authList = this._currentMenu.get('authList')
    tableHeader = fromJS([{
      title: '科室名称',
      dataIndex: 'departmentName',
      key: 'departmentName',
      className:styles.tableColumn,
    },{
      title: '职能',
      dataIndex: 'function',
      key: 'function',
      className:styles.tableColumn,
    },{
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      className:styles.tableColumn,
    },{
      title: '负责人',
      dataIndex: 'phaseName',
      key: 'phaseName',
      className:styles.tableColumn,
    },{
      title: '科室成员',
      dataIndex: 'leaderCount',
      key: 'leaderCount',
      className:styles.tableColumn,
    },{
      title: '所属教育局',
      dataIndex: 'areaName',
      key: 'areaName',
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
              <Button type="primary" style={{backgroundColor:'#30D18E',borderColor:'#30D18E'}} onClick={this.handleShowEditDepartmentModal.bind(this,record.key)}>编辑</Button>
              <Button type="primary" style={{backgroundColor:'#FD9B09',borderColor:'#FD9B09',marginLeft:'10px'}} onClick={this.handleShowDeleteModal.bind(this,record.key)}>删除</Button>
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
  handleShowDeleteModal(key){
    const that = this
    const currentRow = this.props.workspace.get('data').get('result').get(key)
    confirm({
      title: '你先删除这条记录吗？',
      content: '删除后不可恢复',
      onOk() {
        that.props.editDepartment({
          departmentId:currentRow.get('departmentId'),
          action:'delete'
        })
      },
      onCancel() {},
    });
  },
  handleCloseAddDepartmentModal(type){
    switch (type) {
      case 'create':
        this.setState({
          showAddDepartmentModal:false
        })
        break;
      case 'edit':
        this.setState({
          showEditDepartmentModal:false
        })
      default:

    }
  },
  handleShowEditDepartmentModal(key){
    const {setFieldsValue} = this.props.form
    this._currentRow = this.props.workspace.get('data').get('result').get(key)
    this.setState({
      showEditDepartmentModal:true
    },()=>{
      setFieldsValue({
        areaId:this._currentRow.get('areaId'),
        departmentName:this._currentRow.get('departmentName'),
        'function':this._currentRow.get('function'),
        phone:this._currentRow.get('phone'),
        remark:this._currentRow.get('remark'),

      })
    })

  },
  handleAddDepartment(){
    const {getFieldValue,getFieldError} = this.props.form
    let errors = [getFieldError('areaId'),getFieldError('departmentName')]
    if(!errors.reduce((pre,cur)=>pre||cur,false)){
      this.props.addDepartment({
        areaId:getFieldValue('areaId'),
        departmentName:getFieldValue('departmentName'),
        _function:getFieldValue('function'),
        phone:getFieldValue('phone'),
        remark:getFieldValue('remark')
      })
    }
  },
  handleEditDepartment(){
    const {getFieldValue,getFieldError} = this.props.form
    let errors = [getFieldError('gradeName'),getFieldError('gradeNickName'),getFieldError('phaseName')]
    if(!errors.reduce((pre,cur)=>pre||cur,false)){
      this.props.editDepartment({
        areaId:getFieldValue('areaId'),
        departmentName:getFieldValue('departmentName'),
        _function:getFieldValue('function'),
        phone:getFieldValue('phone'),
        remark:getFieldValue('remark'),

        action:'edit',
        departmentId:this._currentRow.get('departmentId')
      })
    }
  },
  renderAddDepartmentModal(type){
    const {getFieldDecorator,getFieldValue} = this.props.form
    return (
      <Modal title='添加机关' visible={true} onCancel={this.handleCloseAddDepartmentModal.bind(this,type)}
      footer={[
        <Button key='cancel' type='ghost' onClick={this.handleCloseAddDepartmentModal.bind(this,type)}>取消</Button>,
        <Button key='ok' type='primary'
        disabled={!getFieldValue('departmentName')}
        onClick={type=='edit'?this.handleEditDepartment:this.handleAddDepartment}>确认</Button>
      ]}
      >
        <div>
          <Form>
            <FormItem
            label='所属教育局'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            key='areaId'>
            {getFieldDecorator('areaId', {
              initialValue:this._childArea.get(0).get('areaId'),
              rules: [{ required: true, message: '选择学段' }],
            })(
              <Select placeholder='选择教育局' style={{ width: 244 }} onChange={this.handleSelectPhase}>
                {
                  this._childArea.map(v => (
                    <Option key={v.get('areaId')} value={v.get('areaId')} title={v.get('areaName')}>{v.get('areaName')}</Option>
                  ))
                }
              </Select>
            )}
            </FormItem>
            <FormItem
            label='科室名称'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            key='departmentName'>
            {getFieldDecorator('departmentName', {
              rules: [{ required: true, message: '输入科室名称' },{max:20,message:'输入不超过20个字'}],
            })(
              <Input placeholder="输入不超过20个字"/>
            )}
            </FormItem>
            <FormItem
            label='职能介绍'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            key='function'>
            {getFieldDecorator('function', {
              rules: [{max:200,message:'输入不超过200个字'}],
            })(
              <Input placeholder="输入不超过200个字"/>
            )}
            </FormItem>
            <FormItem
            label='电话'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            key='phone'>
            {getFieldDecorator('phone', {
              rules: [{ max:20, message: '输入不超过20个字' }],
            })(
              <Input placeholder='输入不超过20个字'/>
            )}
            </FormItem>
            <FormItem
            label='备注'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            key='remark'>
            {getFieldDecorator('remark', {
              rules: [{ max:50, message: '输入不超过50个字' }],
            })(
              <Input placeholder='输入不超过50个字'/>
            )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  },

  //搜索框输入的change事件
  handleSearchTableData(value){
    this.props.getWorkspaceData('cityDepartment',this.props.workspace.get('data').get('nowPage'),this.props.workspace.get('data').get('pageShow'),value)
  },

  render(){
    const tableData = this.getTableData()

    const {workspace} = this.props
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {this._currentMenu.get('authList').some(v => v.get('authUrl')=='/grade/add')?<Button type="primary" style={{backgroundColor:'#FD9B09',borderColor:'#FD9B09'}} onClick={()=>{this.setState({showAddDepartmentModal:true})}}>新建</Button>:<div> </div>}<Search style={{width: '260px'}} placeholder="请输入机关名称" value={this.state.searchStr} onChange={(e)=>{this.setState({searchStr:e.target.value})}} onSearch={this.handleSearchTableData} />
        </div>
        <div className={styles.body}>
          <div className={styles.wrapper}>
            <Table rowClassName={(record,index)=>index%2?styles.tableDarkRow:styles.tableLightRow} bordered columns={tableData.tableHeader} dataSource={tableData.tableBody}
            pagination={!this.props.workspace.get('data').isEmpty()?{
              total:this.props.workspace.get('data').get('totalCount'),
              pageSize:this.props.workspace.get('data').get('pageShow'),
              current:this.props.workspace.get('data').get('nowPage'),
              onChange:(page)=>{
                this.props.getWorkspaceData('cityDepartment',page,this.props.workspace.get('data').get('pageShow'),this.state.searchStr)
              },
              showQuickJumper:true,
              onShowSizeChange:(current,size)=>{
                this.props.getWorkspaceData('cityDepartment',this.props.workspace.get('data').get('nowPage'),size,this.state.searchStr)
              }
            }:null} />
            <div className={styles.tableMsg}>当前条目{workspace.get('data').get('start')}-{parseInt(workspace.get('data').get('start'))+parseInt(workspace.get('data').get('pageShow'))}/总条目{workspace.get('data').get('totalCount')}</div>
          </div>
        </div>
        {this.state.showAddDepartmentModal?this.renderAddDepartmentModal('create'):null}
        {this.state.showEditDepartmentModal?this.renderAddDepartmentModal('edit'):null}
      </div>
    )
  }
})

function mapStateToProps(state){
  return{
    menu:state.get('menu'),
    workspace:state.get('workspace'),
  }
}
function mapDispatchToProps(dispatch){
  return {
    getWorkspaceData:bindActionCreators(getWorkspaceData,dispatch),
    addDepartment:bindActionCreators(addDepartment,dispatch),
    editDepartment:bindActionCreators(editDepartment,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(DepartmentPage))
