import React from 'react'
import {Icon,Table,Button} from 'antd'
import {getWorkspaceData} from '../../actions/workspace'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './TableComponent.scss'

const TableComponent = React.createClass({
  propTypes: {
    tableData: React.PropTypes.object.isRequired,
    pageType: React.PropTypes.string.isRequired,
    searchStr: React.PropTypes.string.isRequired,
  },

  render(){
    const {tableData,pageType,searchStr,workspace,getWorkspaceData} = this.props;
    return (
      <div className={styles.wrapper}>
        <Table
          rowClassName={(record,index)=>index%2?styles.tableDarkRow:styles.tableLightRow}
          bordered
          columns={tableData.tableHeader}
          dataSource={tableData.tableBody}
          pagination={
            !workspace.get('data').isEmpty() ?
              {
                total:workspace.get('data').get('totalCount'),
                pageSize:workspace.get('data').get('pageShow'),
                current:workspace.get('data').get('nowPage'),
                showQuickJumper:true,
                onChange:(page)=>{
                  getWorkspaceData(pageType,page,this.props.workspace.get('data').get('pageShow'),searchStr)
                },
                onShowSizeChange:(current,size)=>{
                  getWorkspaceData(pageType,this.props.workspace.get('data').get('nowPage'),size,searchStr)
                }
              }
              :
              null
          }
        />
        <div className={styles.tableMsg}>
          当前条目{workspace.get('data').get('start')}
          -{parseInt(workspace.get('data').get('start'))
          +parseInt(workspace.get('data').get('pageShow'))}
          /总条目{workspace.get('data').get('totalCount')}
        </div>
      </div>
    )
  }
})

function mapStateToProps(state){
  return{
    workspace:state.get('workspace')
  }
}

function mapDispatchToProps(dispatch){
  return {
    getWorkspaceData:bindActionCreators(getWorkspaceData,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TableComponent)
