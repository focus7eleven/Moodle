import React from 'react'
import styles from './OfficerPage.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Select,DatePicker,Icon,Input,Table,Button,Modal,Form} from 'antd'
import PermissionDic from '../../../utils/permissionDic'
import {getAllAreas,getWorkspaceData} from '../../../actions/workspace'
import {fromJS,Map,List} from 'immutable'
import {findMenuInTree} from '../../../reducer/menu'
import moment from 'moment'

const FormItem = Form.Item
const Search = Input.Search
const confirm = Modal.confirm
const Option = Select.Option;
moment.locale('zh-cn');

const OfficerPage = React.createClass({
  _currentMenu:Map({
    authList:List()
  }),

  getInitialState(){
    return {
      searchStr: "",
      modalType: "",
      modalVisibility: false,
    }
  },

  componentWillMount(){
    if(!this.props.menu.get('data').isEmpty()){
      this._currentMenu = findMenuInTree(this.props.menu.get('data'),'officer')
    }
    this.props.getAllAreas()
  },

  getTableData(){
    let tableHeader = List()
    let tableBody = List()
    let authList = this._currentMenu.get('authList')
    tableHeader = fromJS([{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      className:styles.tableColumn,
    },{
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      className:styles.tableColumn,
    },{
      title: '职位',
      dataIndex: 'title',
      key: 'title',
      className:styles.tableColumn,
    },{
      title: '身份证号',
      dataIndex: 'id',
      key: 'id',
      className:styles.tableColumn,
    },{
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      className:styles.tableColumn,
      render:(text,record) => {
        return (text=="M"?"男":(text=="F"?"女":""))
      }
    },{
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      className:styles.tableColumn,
    },{
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      className:styles.tableColumn,
    },{
      title: '所属教育局',
      dataIndex: 'areaName',
      key: 'areaName',
      className:styles.tableColumn,
    }])
    tableHeader = tableHeader.concat(authList.filter(v => (v.get('authUrl').split('/')[2] != 'import')&&(v.get('authUrl').split('/')[2] != 'view')&&(v.get('authUrl').split('/')[2] != 'add')).map( v => {
      return {
        title: PermissionDic[v.get('authUrl').split('/')[2]],
        dataIndex: v.get('authUrl').split('/')[2],
        key: v.get('authUrl').split('/')[2],
        className:styles.editColumn,
        render:(text,record) => {
          return (
            <div>
              <Button className={styles.editButton} type="primary" onClick={this.handleEditOfficer.bind(this,record.key)}>编辑</Button>
              <Button className={styles.deleteButton} type="primary" onClick={this.handleDeleteOfficer.bind(this,record.key)}>删除</Button>
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

  handleAddOfficer(){

  },

  handleSearchStrChanged(e){
    this.setState({searchStr: e.target.value});
  },

  handleSearchTableData(value){
    this.props.getWorkspaceData('officer',this.props.workspace.get('data').get('nowPage'),this.props.workspace.get('data').get('pageShow'),value)
  },

  handleEditOfficer(key){
    console.log(key);
  },

  handleDeleteOfficer(key){
    console.log(key);
  },

  handleImportOfficer(){

  },

  handleModalDispaly(visibility,type){
    if(type==='add'){
      this.props.form.resetFields();
      this.setState({modalVisibility: visibility,modalType: type});
    }else if(type===""){
      this.setState({modalVisibility: visibility,modalType: type});
    }else{
      const {setFieldsValue} = this.props.form
      this._currentRow = this.props.workspace.get('data').get('result').get(type)
      console.log(this._currentRow.toJS());
      setFieldsValue({
        'resourceName':this._currentRow.get('resourceName'),
        'resourceUrl':this._currentRow.get('resourceUrl'),
        'resourceOrder':this._currentRow.get('resourceOrder'),
        'logo':this._currentRow.get('logo'),
      })
      this.setState({modalVisibility: visibility,modalType: 'edit'});
    }
  },

  renderModal(){
    const { getFieldDecorator } = this.props.form;
    const { modalType, modalVisibility } = this.state;
    const formItemLayout = {labelCol:{span:5},wrapperCol:{span:12}};
    const allAreasList = this.props.workspace.get('allAreasList');
    return (
      <Modal title={modalType==="add"?"添加科员":"编辑科员"} visible={modalVisibility}
          onOk={modalType==="add"?this.handleAddOfficer:this.handleEditOfficer} onCancel={this.handleModalDispaly.bind(this,false,"")}
        >
        <div>
          <Form>
            {
              <FormItem
                label='所属教育局'
                {...formItemLayout}
                key='areaName'
              >
              {
                getFieldDecorator('areaName', {
                  rules: [{required: true}],
                  initialValue: allAreasList[0]?allAreasList[0].areaId:"",
                })(
                  <Select
                    placeholder="请选择所属教育局"
                    optionFilterProp="children"
                    // defaultValue={this.props.workspace.get('allAreasList').length===0?"":this.props.workspace.get('allAreasList')[0].areaId}
                  >
                    {
                      allAreasList.map((item)=>{
                        return <Option value={item.areaId} key={item.areaId}>{item.areaName}</Option>
                      })
                    }
                  </Select>
                )
              }
              </FormItem>
            }
            <FormItem
              label="姓名"
              {...formItemLayout}
              key='name'
            >
            {
              getFieldDecorator('name', {
                rules: [{required: true},{
                  validator(rule, value, callback, source, options) {
                    var errors = [];
                    if(value.length > 36){
                      errors.push(
                        new Error('姓名应不超过36个字')
                      )
                    }
                    callback(errors);
                  }
                }],
              })(<Input placeholder='输入不超过36个字'/>)
            }
            </FormItem>
            <FormItem
              label="职位"
              {...formItemLayout}
              key='title'
            >
            {
              getFieldDecorator('title', {
                rules: [{
                  validator(rule, value, callback, source, options) {
                    var errors = [];
                    if(value.length > 200){
                      errors.push(
                        new Error('职位应不超过200个字')
                      )
                    }
                    callback(errors);
                  }
                }],
              })(<Input type="textarea" rows={3} placeholder='输入不超过200个字'/>)
            }
            </FormItem>
            <FormItem
              label="身份证"
              {...formItemLayout}
              key='id'
            >
            {
              getFieldDecorator('id', {
                rules: [{required: true},{
                  validator(rule, value, callback, source, options) {
                    var errors = [];
                    if(value.length > 18){
                      errors.push(
                        new Error('身份证应不超过18位')
                      )
                    }
                    callback(errors);
                  }
                }],
              })(<Input placeholder='输入不超过18位'/>)
            }
            </FormItem>
            <FormItem
              label="性别"
              {...formItemLayout}
              key='sex'
            >
            {
              getFieldDecorator('sex',{initialValue:"M"})(
                <Select
                  placeholder="请选择性别"
                  optionFilterProp="children"
                >
                  <Option value="M">男</Option>
                  <Option value="F">女</Option>
                </Select>
              )
            }
            </FormItem>
            <FormItem
              label="电话"
              {...formItemLayout}
              key='phone'
            >
            {
              getFieldDecorator('phone', {
                rules: [{required: true},{
                  validator(rule, value, callback, source, options) {
                    var errors = [];
                    if(value.length > 15){
                      errors.push(
                        new Error('电话应不超过15位')
                      )
                    }
                    callback(errors);
                  }
                }],
              })(<Input placeholder='输入不超过15位'/>)
            }
            </FormItem>
            <FormItem
              label="出生日期"
              {...formItemLayout}
              key='birth'
            >
            {
              getFieldDecorator('birth')(
                <DatePicker placeholder="选择出生日期" disabledDate={(current)=> current && current.valueOf() > Date.now()} />
              )
            }
            </FormItem>
            <FormItem
              label="住址"
              {...formItemLayout}
              key='homeAddr'
            >
            {
              getFieldDecorator('homeAddr', {
                rules: [{max:180, message: '输入不超过180个字' }],
              })(<Input type="textarea" placeholder='输入不超过180个字' rows={3}/>)
            }
            </FormItem>
            <FormItem
              label="邮箱"
              {...formItemLayout}
              key='email'
            >
            {
              getFieldDecorator('email', {
                rules: [{
                  validator(rule, value, callback, source, options) {
                    var errors = [];
                    if(value.length > 40){
                      errors.push(
                        new Error('邮箱应不超过40个字')
                      )
                    }
                    callback(errors);
                  }
                }],
              })(<Input placeholder='输入不超过40个字'/>)
            }
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
          <div className={styles.headerOperation}>
            {
              this._currentMenu.get('authList').find((v)=>v.get('authName')=='增加') ?
              <Button type="primary" className={styles.operationButton} onClick={this.handleModalDispaly.bind(this,true,"add")}>
                新建
              </Button>:null
            }
            {
              this._currentMenu.get('authList').find((v)=>v.get('authName')=='导入') ?
              <Button type="primary" className={styles.operationButton} onClick={this.handleImportOfficer}>
                导入
              </Button>:null
            }
          </div>
          <Search style={{width:'260px'}} placeholder="请输入科员姓名" value={this.state.searchStr} onChange={this.handleSearchStrChanged} onSearch={this.handleSearchTableData} />
        </div>
        <div className={styles.body}>
          <div className={styles.wrapper}>
            <Table
              rowClassName={(record,index)=>index%2?styles.tableDarkRow:styles.tableLightRow}
              bordered
              columns={tableData.tableHeader}
              dataSource={tableData.tableBody}
              pagination={
                !this.props.workspace.get('data').isEmpty() ?
                  {
                    total:this.props.workspace.get('data').get('totalCount'),
                    pageSize:this.props.workspace.get('data').get('pageShow'),
                    current:this.props.workspace.get('data').get('nowPage'),
                    showQuickJumper:true,
                    onChange:(page)=>{
                      this.props.getWorkspaceData('officer',page,this.props.workspace.get('data').get('pageShow'),this.state.searchStr)
                    }
                  }
                  :
                  null
                }
              />
            <div className={styles.tableMsg}>当前条目{workspace.get('data').get('start')}-{parseInt(workspace.get('data').get('start'))+parseInt(workspace.get('data').get('pageShow'))}/总条目{workspace.get('data').get('totalCount')}</div>
          </div>
        </div>
        {this.renderModal()}
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
    getAllAreas:bindActionCreators(getAllAreas,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(OfficerPage))
