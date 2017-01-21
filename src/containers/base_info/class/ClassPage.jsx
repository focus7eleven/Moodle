import React from 'react'
import styles from './ClassPage.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Radio,Row,Col,Upload,Select,DatePicker,Icon,Input,Table,Button,Modal,Form} from 'antd'
import PermissionDic from '../../../utils/permissionDic'
import {setClassTeacher,getGradeTeacherList,getClassSubject,getClassSubjectTeacher,getClassLeaderList,setClassLeader,getGradeList,getPhaseList,addClass,editClass,getWorkspaceData} from '../../../actions/workspace'
import {fromJS,Map,List} from 'immutable'
import {findMenuInTree} from '../../../reducer/menu'
import moment from 'moment'
import _ from 'lodash'

const FormItem = Form.Item
const Search = Input.Search
const confirm = Modal.confirm
const Option = Select.Option;
const RadioGroup = Radio.Group;
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
      classLeaderModalVisibility: false,
      classLeaderIndex: [],
      rowsChanged: false,
      teacherModalVisibility: false,
      subjectTeacherIndex: {},
      subjectTeacherChanged: false,
    }
  },

  componentWillMount(){
    if(!this.props.menu.get('data').isEmpty()){
      this._currentMenu = findMenuInTree(this.props.menu.get('data'),'classes')
    }
    let formData = new FormData();
    formData.append("filter","");
    this.props.getGradeTeacherList(formData);
  },

  getTableData(){
    let tableHeader = List()
    let tableBody = List()
    let authList = this._currentMenu.get('authList')
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
        return <a onClick={this.handleLeaderModalDisplay.bind(null,true,record.key)}><Icon type="edit" />{text}</a>
      }
    },{
      title: '任课教师',
      dataIndex: 'teacherCount',
      key: 'teacherCount',
      className:styles.tableColumn,
      render: (text, record) => {
        return <a onClick={this.handleTeacherModalDisplay.bind(null,true,record.key)}><Icon type="edit" />{text}</a>
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

  handleLeaderModalDisplay(visibility,key){
    if(visibility){
      this._currentLeaderId = this.props.workspace.get('data').get('result').get(key).get('userId');
      this._currentClassId = this.props.workspace.get('data').get('result').get(key).get('classId');
      this.props.getClassLeaderList(this._currentClassId).then((res)=>{
        const index = _.findIndex(this.props.workspace.get('classLeaderList'),(v)=>v.userId===this._currentLeaderId);
        this.setState({classLeaderModalVisibility: true,classLeaderIndex:[index]});
      })
    }else {
      this.setState({classLeaderModalVisibility: visibility});
    }
  },

  handleTeacherModalDisplay(visibility,key){
    if(visibility){
      this._currentClassId = this.props.workspace.get('data').get('result').get(key).get('classId');
      this.props.getClassSubject(this._currentClassId).then((res)=>{
        this.props.getClassSubjectTeacher(this._currentClassId).then((res)=>{
          const subjectList = this.props.workspace.get('classSubject');
          const subjectTeacherList = this.props.workspace.get('classSubjectTeacher');
          let subjectTeacherIndex = {};
          let teacherUserId = 0;
          subjectTeacherList.forEach((item,index)=>{
            teacherUserId = _.findIndex(this.props.workspace.get('gradeTeacherList'),(v)=>v.userId===item.userId);
            subjectTeacherIndex[item.subjectId] = [teacherUserId];
          })
          const currentSubject = subjectList.length>0?subjectList[0].subject_id:"";
          this.setState({currentSubject,subjectTeacherIndex,teacherModalVisibility: visibility});
        })
      })
    }else {
      this.setState({teacherModalVisibility: visibility});
    }
  },

  handleSubjectChange(e){
    this.setState({currentSubject:e.target.value})
  },

  handleSubjectTeacherDisplay(id){
    const subjectTeacher = this.props.workspace.get('classSubjectTeacher').find((item)=>item.subjectId==id);
    return subjectTeacher?subjectTeacher.teacherName:"未设置";
  },

  handleSetTeacher(){
    const {subjectTeacherChanged,subjectTeacherIndex} = this.state;
    if(!subjectTeacherChanged){
      this.setState({classLeaderModalVisibility: false});
    }else{
      const gradeTeacherList = this.props.workspace.get('gradeTeacherList');
      let res = {};
      _.keys(subjectTeacherIndex).map((key)=>{
        if(subjectTeacherIndex[key]>=0){
          res[key] = gradeTeacherList[subjectTeacherIndex[key]].userId;
        }
      })
      let formData = new FormData()
      formData.append('classId',this._currentClassId);
      formData.append('result',JSON.stringify(res));
      const result = this.props.setClassTeacher(formData);
      let visibility = true;
      result.then((res)=>{
        if(res!=="error"){
          visibility = false;
        }
      })
      this.setState({teacherModalVisibility: visibility})
    }
  },

  handleSetLeader(){
    const {rowsChanged,classLeaderIndex} = this.state;
    if(!rowsChanged){
      this.setState({classLeaderModalVisibility: false});
    }else{
      let formData = new FormData()
      formData.append('classId',this._currentClassId);
      formData.append('userId',this.props.workspace.get('classLeaderList')[classLeaderIndex[0]].userId);
      const result = this.props.setClassLeader(formData);
      let visibility = true;
      result.then((res)=>{
        if(res!=="error"){
          visibility = false;
        }
      })
      this.setState({classLeaderModalVisibility: visibility})
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

  handlePhaseSelected(value){
    this.props.getGradeList(value);
    this.props.form.setFieldsValue({'gradeId':""});
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

  renderLeaderModal(){
    const {classLeaderModalVisibility,classLeaderIndex} = this.state
    const columns = [{
      title: '教师编号',
      dataIndex: 'teacherNum',
    },{
      title: '教师姓名',
      dataIndex: 'teacherName',
    }];
    const rowSelection = {
      type: "radio",
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({classLeaderIndex: selectedRowKeys,rowsChanged: true});
      },
      selectedRowKeys: classLeaderIndex,
    };
    const data = this.props.workspace.get('classLeaderList').length>=0?this.props.workspace.get('classLeaderList').map((v,key) => {
      return {
        key: key,
        teacherName: v.teacherName,
        teacherNum: v.teacherNum,
      }
    }):[];
    return (
      <Modal title="设置班主任" visible={classLeaderModalVisibility}
        onOk={this.handleSetLeader} onCancel={this.handleLeaderModalDisplay.bind(null,false,"")}
      >
        <div>
          <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
      </Modal>
    )
  },

  renderTeacherModal(){
    const {currentSubject,teacherModalVisibility,subjectTeacherIndex} = this.state
    const columns = [{
      title: '教师编号',
      dataIndex: 'teacherNum',
    },{
      title: '教师姓名',
      dataIndex: 'teacherName',
    }];
    const rowSelection = {
      type: "radio",
      onChange: (selectedRowKeys, selectedRows) => {
        let newTeacherIndex = subjectTeacherIndex;
        newTeacherIndex[currentSubject] = selectedRowKeys
        this.setState({subjectTeacherIndex: newTeacherIndex,subjectTeacherChanged: true});
      },
      selectedRowKeys: subjectTeacherIndex[currentSubject],
    };
    const data = this.props.workspace.get('gradeTeacherList').length>=0?this.props.workspace.get('gradeTeacherList').map((v,key) => {
      return {
        key: key,
        teacherName: v.teacherName,
        teacherNum: v.workNum,
      }
    }):[];
    return (
      <Modal width={650} title="设置任课老师" visible={teacherModalVisibility}
        onOk={this.handleSetTeacher} onCancel={this.handleTeacherModalDisplay.bind(null,false,"")}
      >
        <div>
          <div className={styles.subjectList}>
            <RadioGroup onChange={this.handleSubjectChange} value={this.state.currentSubject}>
              {
                this.props.workspace.get('classSubject').map((item,index)=>{
                  return (
                    <Radio className={styles.subjectRadio} value={item.subject_id} key={item.subject_id}>{item.subject_name}(<span>{this.handleSubjectTeacherDisplay(item.subject_id)}</span>)</Radio>
                  )
                })
              }
            </RadioGroup>
          </div>
          <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={data} />
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
          <Search style={{width:'260px'}} placeholder="请输入班级名称" value={this.state.searchStr} onChange={this.handleSearchStrChanged} onSearch={this.handleSearchTableData} />
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
        {this.renderLeaderModal()}
        {this.renderTeacherModal()}
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
    getPhaseList: bindActionCreators(getPhaseList,dispatch),
    getGradeList: bindActionCreators(getGradeList,dispatch),
    getGradeTeacherList: bindActionCreators(getGradeTeacherList,dispatch),
    getClassLeaderList: bindActionCreators(getClassLeaderList,dispatch),
    setClassLeader: bindActionCreators(setClassLeader,dispatch),
    getClassSubject: bindActionCreators(getClassSubject,dispatch),
    getClassSubjectTeacher: bindActionCreators(getClassSubjectTeacher,dispatch),
    setClassTeacher: bindActionCreators(setClassTeacher,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(ClassPage))
