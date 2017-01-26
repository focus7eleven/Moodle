import React from 'react'
import styles from './PublishedPage.scss'
import {Select,Spin} from 'antd'
const Option = Select.Option

const PublishedPage = React.createClass({
  _gradeList:List(),
  _subjectList:List(),
  _versionList:List(),
  _termList:fromJS([{id:'1',text:'上学期'},{id:'2',text:'下学期'}]),
  getInitialState(){
    return {
      loading:false,
    }
  },
  render(){
    return (
      <div className={styles.container}>
        <div className={styles.header}>
        <Select>
        {
          this.state.loading?this._gradeList.map(v => (
            <Option key={v.get("gradeId")} value={v.get('gradeId')} title={v.get('gradeName')}>{v.get('gradeName')}</Option>
          )):<Option key={'-1'} value={'-1'}><Spin size='small'/></Option>
        }
        </Select>
        <Select>
        {
          this.state.loading?this._termList.map(v => (
            <Option key={v.get('id')} value={v.get('id')} title={v.get('text')}>{v.get('text')}</Option>
          )):<Option key={'-1'} value={'-1'}><Spin size='small'/></Option>
        }
        </Select>
        <Select>
        {
          this.state.loading?this._subjectList.map(v => (
            <Option key={v.get('subject_id')} value={v.get('subject_id')} title={v.get('subject_name')}>{v.get('subject_name')}</Option>
          )):<Option key={'-1'} value={'-1'}><Spin size='small'/></Option>
        }
        </Select>
        <Select>
        {
          this.state.loading?this._versionList.map(v => (
            <Option key={v.get('id')} value={v.get('id')} title={v.get('text')}>{v.get('text')}</Option>
          )):<Option key={'-1'} value={'-1'}><Spin size='small'/></Option>
        }
        </Select>
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
              showQuickJumper:true,
              onShowSizeChange:(current,size)=>{
                this.props.getWorkspaceData('phase',this.props.workspace.get('data').get('nowPage'),size,this.state.searchStr)
              }
            }:null} />
            <div className={styles.tableMsg}>当前条目{workspace.get('data').get('start')}-{parseInt(workspace.get('data').get('start'))+parseInt(workspace.get('data').get('pageShow'))}/总条目{workspace.get('data').get('totalCount')}</div>
          </div>
        </div>
      </div>
    )
  }
})
