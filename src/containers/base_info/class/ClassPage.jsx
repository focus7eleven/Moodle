import React from 'react'
import styles from './ClassPage.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Row,Col,Upload,Select,DatePicker,Icon,Input,Table,Button,Modal,Form} from 'antd'
import PermissionDic from '../../../utils/permissionDic'
import {addClass,editClass,getWorkspaceData} from '../../../actions/workspace'
import {fromJS,Map,List} from 'immutable'
import {findMenuInTree} from '../../../reducer/menu'
import moment from 'moment'

const FormItem = Form.Item
const Search = Input.Search
const confirm = Modal.confirm
const Option = Select.Option;
moment.locale('zh-cn');

const ClassPage = React.createClass({
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
      this._currentMenu = findMenuInTree(this.props.menu.get('data'),'class')
    }
  },

  getTableData(){
    let tableHeader = List()
    let tableBody = List()
    let authList = this._currentMenu.get('authList')
    console.log(authList.toJS());
    tableHeader = fromJS([{
      title: '名称',
      dataIndex: 'className',
      key: 'className',
      className:styles.tableColumn,
    },{
      title: '年级',
      dataIndex: 'gradeName',
      key: 'gradeName',
      className:styles.tableColumn,
    },{
      title: '入学日期',
      dataIndex: 'enrolmentDate',
      key: 'enrolmentDate',
      className:styles.tableColumn,
    },{
      title: '班级人数',
      dataIndex: 'count',
      key: 'count',
      className:styles.tableColumn,
      render: (text, record) => {
        return <span>{text}</span>
      }
    },{
      title: '班主任',
      dataIndex: 'userName',
      key: 'userName',
      className:styles.tableColumn,
      render: (text, record) => {
        return <span>{text}</span>
      }
    },{
      title: '任课教师',
      dataIndex: 'teacherCount',
      key: 'teacherCount',
      className:styles.tableColumn,
      render: (text, record) => {
        return <span>{text}</span>
      }
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
              <Button data-visible={true} data-modaltype={record.key} className={styles.editButton} type="primary" onClick={this.handleModalDispaly}>编辑</Button>
              <Button className={styles.deleteButton} type="primary" onClick={this.handleDeleteRecord.bind(this,record.key)}>删除</Button>
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

  handleAddRecord(){
    const {getFieldsValue,getFieldValue,getFieldError,validateFields} = this.props.form
    validateFields((err, values) => {
      if (!err) {
        let formData = new FormData()
        formData.append('className',values.className)
        formData.append('gradeId',values.gradeId)
        formData.append('phaseCode',values.phaseCode)
        formData.append('enrolmentDate',moment(values.enrolmentDate).format("YYYY/MM/DD"))
        const result = this.props.addClass(formData)
        let visibility = true;
        result.then((res)=>{
          if(res!=="error"){
            visibility = false;
          }
        })
        this.setState({modalVisibility: visibility})
      }
    });
  },

  handleSearchStrChanged(e){
    this.setState({searchStr: e.target.value});
  },

  handleSearchTableData(value){
    this.props.getWorkspaceData('class',this.props.workspace.get('data').get('nowPage'),this.props.workspace.get('data').get('pageShow'),value)
  },

  handleEditRecord(){
    const {getFieldsValue,getFieldValue,getFieldError,validateFields} = this.props.form
    validateFields((err, values) => {
      if (!err) {
        let formData = new FormData()
        formData.append('classId',this._currentRow.get('classId'))
        formData.append('action',"edit")
        formData.append('className',values.className)
        formData.append('gradeId',values.gradeId)
        formData.append('phaseCode',values.phaseCode)
        formData.append('enrolmentDate',moment(values.enrolmentDate).format("YYYY/MM/DD"))
        const result = this.props.editClass(formData)
        let visibility = true;
        result.then((res)=>{
          if(res!=="error"){
            visibility = false;
          }
        })
        this.setState({modalVisibility: visibility});
      }
    });
  },

  handleDeleteRecord(key){
    const classId = this.props.workspace.get('data').get('result').get(key).get('classId')
    const that = this
    let formData = new FormData()
    formData.append('classId',classId)
    formData.append('action',"delete")
    confirm({
      title: '你先删除这条记录吗？',
      content: '删除后不可恢复',
      onOk() {
        that.props.editClass(formData)
      },
      onCancel() {},
    });
  },

  handleModalDispaly(evt){
    const visibility = evt.currentTarget.getAttribute("data-visible")==="true"?true:false;
    const type = evt.currentTarget.getAttribute('data-modaltype');
    if(type==='add'){
      this.props.form.resetFields();
      this.setState({modalVisibility: visibility,modalType: type});
    }else if(!visibility){
      this.setState({modalVisibility: visibility,modalType: type});
    }else{
      const {setFieldsValue} = this.props.form
      this._currentRow = this.props.workspace.get('data').get('result').get(type)
      setFieldsValue({
        'className':this._currentRow.get('departmentName'),
        'phaseCode':this._currentRow.get('phone'),
        'gradeId':this._currentRow.get('function'),
        'enrolmentDate':moment(this._currentRow.get('enrolmentDate')),
      })
      this.setState({modalVisibility: visibility,modalType: 'edit'});
    }
  },

  renderModal(){
    const { getFieldDecorator } = this.props.form;
    const { modalType, modalVisibility } = this.state;
    const formItemLayout = {labelCol:{span:5},wrapperCol:{span:12}};
    return (
      <Modal title={modalType==="add"?"添加班级":"编辑班级"} visible={modalVisibility}
          onOk={modalType==="add"?this.handleAddRecord:this.handleEditRecord} data-visible={false} data-modaltype="" onCancel={this.handleModalDispaly}
        >
        <div>
          <Form>
            <Row>
              <Col span={24}>
                <FormItem
                  label="班级名称"
                  {...formItemLayout}
                  key='className'
                >
                  {
                    getFieldDecorator('className', {
                      rules: [{required: true,message: "班级名称不能为空"},{
                        validator(rule, value, callback, source, options) {
                          var errors = [];
                          if(value && value.length > 20){
                            errors.push(
                              new Error('姓名应不超过20个字')
                            )
                          }
                          callback(errors);
                        }
                      }],
                    })(<Input placeholder='输入不超过20个字'/>)
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem
                  label="职能"
                  {...formItemLayout}
                  key='function'
                >
                  {
                    getFieldDecorator('function', {initialValue: "",
                      rules: [{max:200, message: '输入不超过200个字' }],
                    })(<Input type="textarea" placeholder='输入不超过200个字' rows={3}/>)
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem
                  label="电话"
                  {...formItemLayout}
                  key='phone'
                >
                  {
                    getFieldDecorator('phone', {
                      rules: [{
                        validator(rule, value, callback, source, options) {
                          var errors = [];
                          if(value && value.length > 15){
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
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem
                  label="备注"
                  {...formItemLayout}
                  key='remark'
                >
                  {
                    getFieldDecorator('remark', {initialValue: "",
                      rules: [{max:50, message: '输入不超过50个字' }],
                    })(<Input type="textarea" placeholder='输入不超过50个字' rows={3}/>)
                  }
                </FormItem>
              </Col>
            </Row>
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
              <Button data-visible={true} data-modaltype="add" type="primary" className={styles.operationButton} onClick={this.handleModalDispaly}>
                新建
              </Button>:null
            }
          </div>
          <Search style={{width:'260px'}} placeholder="请输入学校机构姓名" value={this.state.searchStr} onChange={this.handleSearchStrChanged} onSearch={this.handleSearchTableData} />
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
                      this.props.getWorkspaceData('class',page,this.props.workspace.get('data').get('pageShow'),this.state.searchStr)
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
    getWorkspaceData: bindActionCreators(getWorkspaceData,dispatch),
    addClass: bindActionCreators(addClass,dispatch),
    editClass: bindActionCreators(editClass,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(ClassPage))
