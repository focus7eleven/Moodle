import React from 'react'
import styles from './GradeManagementPage.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Row,Col,Upload,Select,DatePicker,Icon,Input,Table,Button,Modal,Form} from 'antd'
import PermissionDic from '../../../utils/permissionDic'
import {setGradeLeader,getGradeTeacherList,getWorkspaceData} from '../../../actions/workspace'
import {fromJS,Map,List} from 'immutable'
import {findMenuInTree} from '../../../reducer/menu'

const FormItem = Form.Item
const Search = Input.Search
const confirm = Modal.confirm
const Option = Select.Option;

const GradeManagementPage = React.createClass({
  getInitialState(){
    return {
      searchStr: "",
      modalType: "",
      modalVisibility: false,
      leaderModalVisibility: false,
      selectedStaff: [],
      rowsChanged: false,
    }
  },

  componentWillMount(){
    let formData = new FormData();
    formData.append("filter","");
    this.props.getGradeTeacherList(formData);
  },

  getTableData(){
    let tableHeader = List()
    let tableBody = List()
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
        return <a onClick={this.handleLeaderModalDisplay.bind(null,true,record.key)}><Icon type="edit" />{text}</a>
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

  handleLeaderModalDisplay(visibility,key){
    if(visibility){
      this._currentLeaderId = this.props.workspace.get('data').get('result').get(key).get('userId');
      this._currentGradeId = this.props.workspace.get('data').get('result').get(key).get('gradeId');
      const index = _.findIndex(this.props.workspace.get('gradeTeacherList'),(v)=>v.userId===this._currentLeaderId);
      this.setState({selectedStaff:[index]});
    }
    this.setState({leaderModalVisibility: visibility});
  },

  handleSetLeader(){
    const {rowsChanged,selectedStaff} = this.state;
    if(!rowsChanged){
      this.setState({leaderModalVisibility: false});
    }else{
      let formData = new FormData()
      formData.append('gradeId',this._currentGradeId);
      formData.append('leaderUserId',this.props.workspace.get('gradeTeacherList')[selectedStaff[0]].userId);
      const result = this.props.setGradeLeader(formData);
      let visibility = true;
      result.then((res)=>{
        if(res!=="error"){
          visibility = false;
        }
      })
      this.setState({leaderModalVisibility: visibility})
    }
  },

  handleSearchStrChanged(e){
    this.setState({searchStr: e.target.value});
  },

  handleSearchTableData(value){
    this.props.getWorkspaceData('class',this.props.workspace.get('data').get('nowPage'),this.props.workspace.get('data').get('pageShow'),value)
  },

  renderLeaderModal(){
    const {leaderModalVisibility,selectedStaff} = this.state
    const columns = [{
      title: '教师编号',
      dataIndex: 'workNum',
    },{
      title: '教师姓名',
      dataIndex: 'teacherName',
    }];
    const rowSelection = {
      type: "radio",
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({selectedStaff: selectedRowKeys,rowsChanged: true});
      },
      selectedRowKeys: selectedStaff,
    };
    const data = this.props.workspace.get('gradeTeacherList').length>=0?this.props.workspace.get('gradeTeacherList').map((v,key) => {
      return {
        key: key,
        teacherName: v.teacherName,
        workNum: v.workNum,
      }
    }):[];
    return (
      <Modal title="设置年级组长" visible={leaderModalVisibility}
        onOk={this.handleSetLeader} onCancel={this.handleLeaderModalDisplay.bind(null,false,"")}
      >
        <div>
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
        {this.renderLeaderModal()}
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
    getGradeTeacherList: bindActionCreators(getGradeTeacherList,dispatch),
    setGradeLeader: bindActionCreators(setGradeLeader,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(GradeManagementPage))
