import React from 'react'
import {Icon,Input,Table,Button,Modal,Form,Spin,Select,InputNumber} from 'antd'
import PermissionDic from '../../../utils/permissionDic'
import {getWorkspaceData,addTextbook,editTextbook,deleteTextbook,searchTextbook} from '../../../actions/workspace'
import {fromJS,Map,List} from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { findMenuInTree,findPath} from '../../../reducer/menu'
import styles from './EduOutline.scss'
import _ from 'lodash'
import config from '../../../config'

const FormItem = Form.Item
const Search = Input.Search
const Option = Select.Option
const confirm = Modal.confirm

const getSelectJson = (data) => {
  const {selectid,selectname,table,selectstyle,selectcompareid} = data
  return new Promise((resolve,reject) =>{
    fetch(config.api.select.json.get(selectid,selectname,table,selectstyle,selectcompareid),{
      method:'get',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken')
      }
    }).then(res => res.json()).then(res => {
      resolve(res)
    })
  })
}

const EduOutlinePage = React.createClass({
  _currentMenu:Map({
    authList:List()
  }),
  _phaseList:List(),
  _gradeList:List(),
  _subjectList:List(),
  _termList:[{id:'上学期',text:'上学期'},{id:'下学期',text:'下学期'}],
  _versionList:List(),

  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState(){
    return {
      searchStr:'',
      loading:true,
    }
  },

  getDefaultProps(){
    return {}
  },
  componentWillMount(){
    if(!this.props.menu.get('data').isEmpty()){
      this._currentMenu = findMenuInTree(this.props.menu.get('data'),'textbook')
    }
  },
  // componentWillReceiveProps(nextProps){
  //   if(!nextProps.menu.get('data').isEmpty()){
  //     this._currentMenu = findMenuInTree(nextProps.menu.get('data'),'grade')
  //   }
  // },
  componentDidMount(){
    Promise.all([getSelectJson({selectid:"phase_code",selectname:"phase_name",table:"study_phase"}).then(res => {this._phaseList = res}),
    getSelectJson({selectid:"grade_id",selectname:"grade_name",table:"grade"}).then(res => {this._gradeList = res}),
    getSelectJson({selectid:"subject_id",selectname:"subject_name",table:"subject"}).then(res => {this._subjectList = res}),
    getSelectJson({selectstyle:'JKS'}).then(res => {this._versionList = res})]).then(()=>{
      this.setState({
        loading:false
      })
    })
  },

  getTableData(){
    let tableHeader = List()
    let tableBody = List()
    let authList = this._currentMenu.get('authList')
    tableHeader = fromJS([{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      className:styles.tableColumn,
    },{
      title: '学段',
      dataIndex: 'phase_name',
      key: 'phase_name',
      className:styles.tableColumn,
    },{
      title: '年级',
      dataIndex: 'grade_name',
      key: 'grade_name',
      className:styles.tableColumn,
    },{
      title: '版本',
      dataIndex: 'textbook_version_name',
      key: 'textbook_version_name',
      className:styles.tableColumn,
    },{
      title: '学科',
      dataIndex: 'subject_name',
      key: 'subject_name',
      className:styles.tableColumn,
    },{
      title: '学期',
      dataIndex: 'textbook_term',
      key: 'textbook_term',
      className:styles.tableColumn,
    },{
      title: '发布年份',
      dataIndex: 'textbook_year',
      key: 'textbook_year',
      className:styles.tableColumn,
    },{
      title: '目录',
      dataIndex: 'catalogue',
      key: 'catalogue',
      className:styles.tableColumn,
      render:(text,record)=>{
        return (<div><a >导入</a><a >详情</a></div>)
      }
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
              <Button type="primary" style={{backgroundColor:'#30D18E',borderColor:'#30D18E'}} onClick={this.handleShowEditTextbookModal.bind(this,record.key)}>{PermissionDic[v.get('authUrl').split('/')[2]]}</Button>
              <Button type="primary" style={{backgroundColor:'#FD9B09',borderColor:'#FD9B09',marginLeft:'10px'}} onClick={this.handleShowDeleteModal.bind(this,record.key)}>删除</Button>
            </div>
          )
        }
      }
    }))
    tableBody = !this.props.workspace.get('data').isEmpty()?this.props.workspace.get('data').get('result').map( (v,key) => {
      return {
        key:key,
        id:key,
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
        that.props.deleteTextbook({
          textbookId:currentRow.get('textbook_id'),
          action:'delete'
        })
      },
      onCancel() {},
    });
  },
  handleCloseAddTextbookModal(type){
    switch (type) {
      case 'create':
        this.setState({
          showAddTextbookModal:false
        })
        break;
      case 'edit':
        this.setState({
          showEditTextbookModal:false
        })
      default:

    }
  },
  handleShowEditTextbookModal(key){
    const {setFieldsValue} = this.props.form
    this._currentRow = this.props.workspace.get('data').get('result').get(key)
    this.setState({
      showEditTextbookModal:true
    })
    const phase = this._phaseList.find(v => v.text == this._currentRow.get('phase_name'))
    const grade = this._gradeList.find(v => v.text == this._currentRow.get('grade_name'))
    const subject = this._subjectList.find(v => v.text == this._currentRow.get('subject_name'))
    const term = this._termList.find(v => v.text == this._currentRow.get('textbook_term'))
    const year = this._currentRow.get('textbook_year')
    const version = this._versionList.find(v => v.id == this._currentRow.get('textbook_version'))
    setFieldsValue({
      phase:phase?phase.id:'',
      grade:grade?grade.id:'',
      subject:subject?subject.id:'',
      term:term?term.id:'',
      year:year,
      version:version?version.id:'',
    })
  },
  handleAddTextbook(){
    const {getFieldValue,getFieldError} = this.props.form
    let errors = [getFieldError('phase'),getFieldError('grade'),getFieldError('subject'),getFieldError('term'),getFieldError('year'),getFieldError('version')]
    if(!errors.reduce((pre,cur)=>pre||cur,false)){
      this.props.addTextbook({
        phaseCode:getFieldValue('phase'),
        gradeId:getFieldValue('grade'),
        subjectId:getFieldValue('subject'),
        term:getFieldValue('term'),
        year:getFieldValue('year'),
        version:getFieldValue('version'),
        name:getFieldValue('name'),
      })
    }
  },
  handleEditTextbook(){
    const {getFieldValue,getFieldError} = this.props.form
    let errors = [getFieldError('phase'),getFieldError('grade'),getFieldError('subject'),getFieldError('term'),getFieldError('year'),getFieldError('version')]
    if(!errors.reduce((pre,cur)=>pre||cur,false)){
      this.props.editTextbook({
        phaseCode:getFieldValue('phase'),
        gradeId:getFieldValue('grade'),
        subjectId:getFieldValue('subject'),
        term:getFieldValue('term'),
        year:getFieldValue('year'),
        version:getFieldValue('version'),
        name:getFieldValue('name'),
        textbookId:this._currentRow.get('textbook_id')
      })
    }
  },
  handleSearchTableData(){
    const { searchStr,phaseId,gradeId,subjectId}
    const currnetPage = this.prope.workspace.get('data').get('result').get('nowPage')
    this.props.searchTextbook(searchStr,currentPage,phaseId,gradeId,subjectId)
  }
  renderSelectBar(optionList,type){
    return (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder={`请选择${type}`}
        filterOption={(input,option)=>{return option.props.title.indexOf(input)>=0}}
        optionFilterProp="children"
        showSearch
      >
      {
        optionList.map((v,k) => (
          <Option key={k} value={v.id} title={v.text}>{v.text}</Option>
        ))
      }
      </Select>
    )
  },
  renderAddTextbookModal(type){
    const {getFieldDecorator,getFieldValue} = this.props.form
    return (
      <Modal title='添加角色' visible={true} onCancel={this.handleCloseAddTextbookModal.bind(this,type)}
      footer={[
        <Button key='cancel' type='ghost' onClick={this.handleCloseAddTextbookModal.bind(this,type)}>取消</Button>,
        <Button key='ok' type='primary'
        disabled={!getFieldValue('phase')&&!getFieldValue('grade')&&!getFieldValue('subject')&&!getFieldValue('term')&&(type=='create')}
        onClick={type=='edit'?this.handleEditTextbook:this.handleAddTextbook}>确认</Button>
      ]}
      >
        <div>
          <Form>
            <FormItem
            label='学段'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            key='phase'>
            {getFieldDecorator('phase', {
              rules: [{ required: true, message: '输入学段' }],
            })(
              this.renderSelectBar(this._phaseList,'学段')
            )}
            </FormItem>
            <FormItem
            label='年级'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            key='grade'>
            {getFieldDecorator('grade', {
              rules: [{ required: true, message: '输入年级' }],
            })(
              this.renderSelectBar(this._gradeList,'年级')
            )}
            </FormItem>
            <FormItem
            label='学科'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            key='subject'>
            {getFieldDecorator('subject', {
              rules: [{ required: true, message: '输入学科' },{max:20,message:'输入不超过20个字'}],
            })(
              this.renderSelectBar(this._subjectList,'学科')
            )}
            </FormItem>
            <FormItem
            label='学期'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            key='term'>
            {getFieldDecorator('term', {
              rules: [{ required: true, message: '输入学期' }],
            })(
              this.renderSelectBar(this._termList,'学期')
            )}
            </FormItem>
            <FormItem
            label='发布年份'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            key='year'>
            {getFieldDecorator('year', {
              rules: [{ required: true, message: '输入发布年份' }],
            })(
              <Input style={{width:200}} placeholder="输入发布年份"/>
            )}
            </FormItem>
            <FormItem
            label='大纲版本'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            key='version'>
            {getFieldDecorator('version', {
              rules: [{ required: true, message: '输入大纲版本' }],
            })(
              this.renderSelectBar(this._versionList,'大纲版本')
            )}
            </FormItem>
            <FormItem
            label='备注'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            key='comment'>
            {getFieldDecorator('comment', {
              rules: [],
            })(
              <Input style={{width:200}} placeholder="输入备注"/>
            )}
            </FormItem>
          </Form>
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
          {this._currentMenu.get('authList').some(v => v.get('authUrl')=='/textbook/add')?<Button type="primary" style={{backgroundColor:'#FD9B09',borderColor:'#FD9B09'}} onClick={()=>{this.setState({showAddTextbookModal:true})}}>新建</Button>:<div> </div>}
          <Select
          style={{ width: 200 }}
          placeholder='选择学段'
          onChange={(e)=>{this.setState({phaseOption:e.target.value})}}
          >
          {
            this.state.loading?<Option key={0} value='0' title='0'><Spin size="small"/></Option>:this._phaseList.map((v,k) => (
              <Option key={k} value={v.id} title={v.text}>{v.text}</Option>
            ))
          }
          </Select>
          <Select
          style={{ width: 200 }}
          placeholder='选择年级'
          onChange={(e)=>{this.setState({gradeOption:e.target.value})}}
          >
          {
            this.state.loading?<Option key={0} value='0' title='0'><Spin size="small"/></Option>:this._gradeList.map((v,k) => (
              <Option key={k} value={v.id} title={v.text}>{v.text}</Option>
            ))
          }
          </Select>
          <Select
          style={{ width: 200 }}
          placeholder='选择学科'
          onChange={(e)=>{this.setState({subjectOption:e.target.value})}}
          >
          {
            this.state.loading?<Option key={0} value='0' title='0'><Spin size="small"/></Option>:this._subjectList.map((v,k) => (
              <Option key={k} value={v.id} title={v.text}>{v.text}</Option>
            ))
          }
          </Select>
          <Search placeholder="请输入年级名称" value={this.state.searchStr} onChange={(e)=>{this.setState({searchStr:e.target.value})}} onSearch={this.handleSearchTableData} />
        </div>
        <div className={styles.body}>
          <div className={styles.wrapper}>
            <Table rowClassName={(record,index)=>index%2?styles.tableDarkRow:styles.tableLightRow} bordered columns={tableData.tableHeader} dataSource={tableData.tableBody}
            pagination={!this.props.workspace.get('data').isEmpty()?{
              total:this.props.workspace.get('data').get('totalCount'),
              pageSize:this.props.workspace.get('data').get('pageShow'),
              current:this.props.workspace.get('data').get('nowPage'),
              onChange:(page)=>{
                this.props.getWorkspaceData('textbook',page,this.props.workspace.get('data').get('pageShow'),this.state.searchStr)
              },
              showQuickJumper:true,
              onShowSizeChange:(current,size)=>{
                this.props.getWorkspaceData('textbook',this.props.workspace.get('data').get('nowPage'),size,this.state.searchStr)
              }
            }:null} />
            <div className={styles.tableMsg}>当前条目{workspace.get('data').get('start')}-{parseInt(workspace.get('data').get('start'))+parseInt(workspace.get('data').get('pageShow'))}/总条目{workspace.get('data').get('totalCount')}</div>
          </div>
        </div>
        {this.state.showAddTextbookModal?this.renderAddTextbookModal('create'):null}
        {this.state.showEditTextbookModal?this.renderAddTextbookModal('edit'):null}
        {this.state.showRoleDescEditModal?this.renderRoleDescEditModal():null}
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
    addTextbook:bindActionCreators(addTextbook,dispatch),
    editTextbook:bindActionCreators(editTextbook,dispatch),
    deleteTextbook:bindActionCreators(deleteTextbook,dispatch),
    searchTextbook:bindActionCreators(searchTextbook,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(EduOutlinePage))
