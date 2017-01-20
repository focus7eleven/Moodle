import React from 'react'
import styles from './GradeManagementPage.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Row,Col,Upload,Select,DatePicker,Icon,Input,Table,Button,Modal,Form} from 'antd'
import PermissionDic from '../../../utils/permissionDic'
import {getWorkspaceData} from '../../../actions/workspace'
import {fromJS,Map,List} from 'immutable'
import {findMenuInTree} from '../../../reducer/menu'

const FormItem = Form.Item
const Search = Input.Search
const confirm = Modal.confirm
const Option = Select.Option;

const GradeManagementPage = React.createClass({
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
      this._currentMenu = findMenuInTree(this.props.menu.get('data'),'classes')
    }
  },

  getTableData(){
    let tableHeader = List()
    let tableBody = List()
    let authList = this._currentMenu.get('authList')
    tableHeader = fromJS([{
      title: '名称',
      dataIndex: 'gradeName',
      key: 'gradeName',
      className:styles.tableColumn,
    },{
      title: '别称',
      dataIndex: 'gradeNickName',
      key: 'gradeNicName',
      className:styles.tableColumn,
    },{
      title: '学段',
      dataIndex: 'phaseName',
      key: 'phaseName',
      className:styles.tableColumn,
    },{
      title: '年级组长',
      dataIndex: 'userName',
      key: 'userName',
      className:styles.tableColumn,
      render: (text, record) => {
        return <a><Icon type="edit" />{text}</a>
      }
    }])
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

  handleModalDispaly(evt){
    const visibility = evt.currentTarget.getAttribute("data-visible")==="true"?true:false;
    const type = evt.currentTarget.getAttribute('data-modaltype');
    if(type==='add'){
      this.props.getPhaseList();
      this.props.form.resetFields();
      this.setState({modalVisibility: visibility,modalType: type});
    }else if(!visibility){
      this.setState({modalVisibility: visibility,modalType: type});
    }else{
      this.props.getPhaseList();
      const {setFieldsValue} = this.props.form
      this._currentRow = this.props.workspace.get('data').get('result').get(type)
      this.props.getGradeList(this._currentRow.get('phaseCode'))
      setFieldsValue({
        'className':this._currentRow.get('className'),
        'phaseCode':this._currentRow.get('phaseCode'),
        'gradeId':this._currentRow.get('gradeId'),
        'enrolmentDate':moment(this._currentRow.get('enrolmentDate')),
      })
      this.setState({modalVisibility: visibility,modalType: 'edit'});
    }
  },

  renderModal(){
    const { getFieldDecorator } = this.props.form;
    const { modalType, modalVisibility } = this.state;
    const formItemLayout = {labelCol:{span:5},wrapperCol:{span:12}};
    const phaseList = this.props.workspace.get('phaseList');
    const gradeList = this.props.workspace.get('gradeList');
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
                  label="所属学段"
                  {...formItemLayout}
                  key='phaseCode'
                >
                  {
                    getFieldDecorator('phaseCode', {initialValue: "",
                      rules: [{required: true,message: "学段不能为空"}],
                    })(
                      <Select
                        placeholder="请选择学段"
                        optionFilterProp="children"
                        onChange={this.handlePhaseSelected}
                      >
                        {
                          phaseList.map((item)=>{
                            return <Option key={item.phase_code} value={item.phase_code}>{item.phase_name}</Option>
                          })
                        }
                      </Select>
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem
                  label="所属年级"
                  {...formItemLayout}
                  key='gradeId'
                >
                  {
                    getFieldDecorator('gradeId', {initialValue: "",
                      rules: [{required: true,message: "年级不能为空"}],
                    })(
                      <Select
                        placeholder="请选择年级"
                        optionFilterProp="children"
                      >
                        {
                          gradeList.map((item)=>{
                            return <Option key={item.gradeId} value={item.gradeId}>{item.gradeName}</Option>
                          })
                        }
                      </Select>
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem
                  label="入学日期"
                  {...formItemLayout}
                  key='enrolmentDate'
                >
                  {
                    getFieldDecorator('enrolmentDate',{rules:[{required: true, message: "入学日期不能为空"}]})(
                      <DatePicker style={{width: '100%'}} placeholder="选择入学日期" disabledDate={(current)=> current && current.valueOf() > Date.now()} />
                    )
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
          <div className={styles.headerOperation}></div>
          <Search style={{width:'260px'}} placeholder="请输入年级名称" value={this.state.searchStr} onChange={this.handleSearchStrChanged} onSearch={this.handleSearchTableData} />
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
                      this.props.getWorkspaceData('gradeSet',page,this.props.workspace.get('data').get('pageShow'),this.state.searchStr)
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
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(GradeManagementPage))
