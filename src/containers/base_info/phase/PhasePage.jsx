import React from 'react'
import {Icon,Input,Table,Button,Modal,Form,Spin,Select} from 'antd'
import PermissionDic from '../../../utils/permissionDic'
import { connect} from 'react-redux'
import { findMenuInTree,findPath} from '../../../reducer/menu'
import {fromJS,List,Map} from 'immutable'
import { getWorkspaceData,addPhase,editPhase,deletePhase } from '../../../actions/workspace'
import {bindActionCreators} from 'redux'
import _ from 'lodash'
import config from '../../../config'
import styles from './PhasePage.scss'


const Search = Input.Search
const FormItem = Form.Item
const Option = Select.Option

const PhasePage = React.createClass({
  _currentMenu:Map({
    authList:List()
  }),
  _phaseList:[],
  _subjectList:[],
  _phaseSubjectList:[],
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
  componentWillMount(){
    this._currentMenu = findMenuInTree(this.props.menu.get('data'),'phase')
  },
  componentDidMount(){
    fetch(config.api.subject.subjectList.get,{
      method:'get',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken'),
      }
    }).then(res => {return res.json()}).then(res => {
      this._subjectList = res
    })
  },
  getTableData(){
    let {type} = this.props.router.params
    let tableHeader = List()
    let tableBody = List()
    let authList = this._currentMenu.get('authList')
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
    tableHeader = tableHeader.concat(authList.filter(v => (v.get('authUrl').split('/')[2] != 'view')&&(v.get('authUrl').split('/')[2] != 'add')).map( v => {
      return {
        title: PermissionDic[v.get('authUrl').split('/')[2]],
        dataIndex: v.get('authUrl').split('/')[2],
        key: v.get('authUrl').split('/')[2],
        className:styles.tableColumn,
        render:(text,record) => {
          switch (v.get('authUrl').split('/')[2]) {
            case 'edit':
              return (
                <Button type="primary" style={{backgroundColor:'#30D18E',borderColor:'#30D18E'}} onClick={this.handleShowEditPhaseModal.bind(this,record.key)}>{PermissionDic[v.get('authUrl').split('/')[2]]}</Button>
              )
            case 'list':
              return (
                <Button type="primary" style={{backgroundColor:'#30D18E',borderColor:'#30D18E'}} onClick={this.handleShowAddSubjectModal.bind(this,record.key)}>{PermissionDic[v.get('authUrl').split('/')[2]]}</Button>
              )
            default:

          }

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
    this.props.getWorkspaceData('phase',this.props.workspace.get('data').get('nowPage'),this.props.workspace.get('data').get('pageShow'),value)
  },
  handleShowEditPhaseModal(key){
    const {setFieldsValue} = this.props.form
    const currentRow = this.props.workspace.get('data').get('result').get(key)
    this._phaseList.length==0?fetch(config.api.phase.phaseList.get,{
      method:'get',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken')
      }
    }).then(res => res.json()).then(res => {
      this._phaseList = res
      this.setState({
        showEditPhaseModal:true,
      })
    }):this.setState({
      showEditPhaseModal:true,
    })
    setFieldsValue({
      'phaseId':currentRow.get('phase_code'),
      'phaseName':currentRow.get('phase_name'),
      'remark':currentRow.get('remark'),
    })
  },
  handleShowAddPhaseModal(){
    this._phaseList.length==0?fetch(config.api.phase.phaseList.get,{
      method:'get',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken')
      }
    }).then(res => res.json()).then(res => {
      this._phaseList = res
      this.setState({
        showAddPhaseModal:true
      })
    }):this.setState({
      showAddPhaseModal:true
    })
  },
  handleAddPhase(){
    const {getFieldValue,getFieldError} = this.props.form
    if(getFieldValue('phaseId') && getFieldValue('phaseName') && !(getFieldError('phaseId') || getFieldError('phaseName'))){
      this.props.addPhase({
        phaseCode:getFieldValue('phaseId'),
        phaseName:getFieldValue('phaseName'),
        remark:getFieldValue('remark')
      })
      this.setState({
        showAddPhaseModal:false
      })
    }
  },
  handleAddPhaseModalCancel(type){
    switch (type) {
      case 'edit':
        this.setState({
          showEditPhaseModal:false
        })
        break;
      case 'create':
        this.setState({
          showAddPhaseModal:false
        })
      default:

    }
  },
  handleEditPhase(){
    const {getFieldValue,getFieldError} = this.props.form
    if(getFieldValue('phaseId') && getFieldValue('phaseName') && !(getFieldError('phaseId') || getFieldError('phaseName'))){
      this.props.editPhase({
        phaseCode:getFieldValue('phaseId'),
        phaseName:getFieldValue('phaseName'),
        remark:getFieldValue('remark')
      })
      this.setState({
        showAddPhaseModal:false
      })
    }
  },
  handleDeletePhase(){
    const {getFieldValue} = this.props.form
    this.props.deletePhase({
      phaseCode:getFieldValue('phaseId'),
      phaseName:getFieldValue('phaseName'),
      remark:getFieldValue('remark')
    })
    this.setState({
      showAddPhaseModal:false
    })
  },
  handleShowAddSubjectModal(key){
    const {setFieldsValue} = this.props.form
    const currentRow = this.props.workspace.get('data').get('result').get(key)
    this._phaseSubjectList.length==0?fetch(config.api.phase.subjectList.get(currentRow.get('phase_code')),{
      method:'get',
      headers:{
        'from':'NODEJS',
        'token':sessionStorage.getItem('accessToken'),
      }
    }).then(res => res.json()).then(res => {
      this._phaseSubjectList = res
      this.setState({
        showAddSubjectModal:true
      })
    }):this.setState({
      showAddSubjectModal:true
    })
    setFieldsValue({
      'phase_code':currentRow.get('phase_code')
    })
  },
  handleSelectSubject(){
    
  },
  renderAddPhaseModal(type){
    const { getFieldDecorator } = this.props.form;
    const phaseList = this._phaseList
    const authList = this._currentMenu.get('authList').map(v => v.get('authUrl'))
    return (
      <Modal title="添加学段" visible={true}
          onOk={this.handleAddPhase} onCancel={this.handleAddPhaseModalCancel.bind(this,type)}
          footer={[
            <div key='footer'>
              {type=='edit'?<Button key='delete' type='primary' style={{backgroundColor:'#FD9B09',borderColor:'#FD9B09'}} onClick={this.handleDeletePhase}>删除</Button>:null}
              <Button key='cancel' type='ghost' onClick={this.handleAddPhaseModalCancel.bind(this,type)}>取消</Button>
              <Button key='ok' type='primary' onClick={type=='edit'?this.handleEditPhase:this.handleAddPhase}>确认</Button>
            </div>
          ]}
        >
        <div className={styles.addPhaseModal}>
          <Form>
            {
              type=='edit'?null:<FormItem
                label='学段编号'
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                key='phaseId'
              >
              {
                getFieldDecorator('phaseId', {
                  rules: [{ required: true, message: '请填写学段编号' },{
                    validator(rule, value, callback, source, options) {
                      var errors = [];
                      // test if email address already exists in a database
                      // and add a validation error to the errors array if it does
                      if(_.some(phaseList,v => v['phase_code']==value)){
                        errors.push(
                          new Error('学段编号重复')
                        )
                      }
                      if(isNaN(value) || value.length != 2){
                        errors.push(
                          new Error('学段号必须是2位数字')
                        )
                      }
                      callback(errors);
                    }
                  }],
                })(<Input/>)
              }
              </FormItem>
            }
            <FormItem
              label="学段名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
              key='pahseName'
            >
            {
              getFieldDecorator('phaseName', {
                rules: [{ required: true, message: '请输入学段名称' },{
                  validator(rule, value, callback, source, options) {
                    var errors = [];
                    // test if email address already exists in a database
                    // and add a validation error to the errors array if it does
                    if(value.length >= 10){
                      errors.push(
                        new Error('学段名称小于10个字')
                      )
                    }
                    callback(errors);
                  }
                }],
              })(<Input />)
            }
            </FormItem>
            <FormItem
              label="备注"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
              key='remark'
            >
            {
              getFieldDecorator('remark', {
                rules: [{ message: 'Please input your note!' }],
              })(<Input type="textarea" rows={3}/>)
            }
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  },
  renderAddSubjectModal(){
    return (
      <Modal visible={true} onOk={this.handleAddSubject} onCancel={()=>{this.setState({showAddSubjectModal:false})}}>
        <div>
          <Select
          multiple
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={this.handleSelectSubject}
          value={this._phaseSubjectList}
          >
            {
              this._subjectList.map((v,key )=> (
                <Option key={key} title={v.text} value={v.id}>{v.text}</Option>
              ))
            }
          </Select>
        </div>
      </Modal>
    )
  },
  render(){
    const tableData = this.getTableData()
    const {workspace} = this.props
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Button type="primary" style={{backgroundColor:'#FD9B09',borderColor:'#FD9B09'}} onClick={this.handleShowAddPhaseModal}>新建</Button><Search placeholder="input search text" value={this.state.searchStr} onChange={(e)=>{this.setState({searchStr:e.target.value})}} onSearch={this.handleSearchTableData} />
        </div>
        <div className={styles.body}>
          <div className={styles.wrapper}>
            <Table rowClassName={(record,index)=>index%2?styles.tableDarkRow:styles.tableLightRow} bordered columns={tableData.tableHeader} dataSource={tableData.tableBody}
            pagination={!this.props.workspace.get('data').isEmpty()?{
              total:this.props.workspace.get('data').get('totalCount'),
              pageSize:this.props.workspace.get('data').get('pageShow'),
              current:this.props.workspace.get('data').get('nowPage'),
              onChange:(page)=>{
                this.props.getWorkspaceData('phase',page,this.props.workspace.get('data').get('pageShow'),this.state.searchStr)
              },
              onShowSizeChange:(current,size)=>{
                this.props.getWorkspaceData('phase',this.props.workspace.get('data').get('nowPage'),size,this.state.searchStr)
              }
            }:null} />
            <div className={styles.tableMsg}>当前条目{workspace.get('data').get('start')}-{parseInt(workspace.get('data').get('start'))+parseInt(workspace.get('data').get('pageShow'))}/总条目{workspace.get('data').get('totalCount')}</div>
          </div>
        </div>
        {this.state.showAddPhaseModal?this.renderAddPhaseModal('create'):null}
        {this.state.showEditPhaseModal?this.renderAddPhaseModal('edit'):null}
        {this.state.showAddSubjectModal?this.renderAddSubjectModal():null}
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
    addPhase:bindActionCreators(addPhase,dispatch),
    editPhase:bindActionCreators(editPhase,dispatch),
    deletePhase:bindActionCreators(deletePhase,dispatch),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(PhasePage))
