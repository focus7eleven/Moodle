import React from 'react'
import styles from './ResourceManagementPage.scss'
import PermissionDic from '../../../utils/permissionDic'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input,Table,Button,Modal,Form} from 'antd'

const FormItem = Form.Item
const Search = Input.Search
const confirm = Modal.confirm

const ResourceManagementPage = React.createClass({
  getInitialState(){
    return {}
  },

  render(){
    return (
      <div className={styles.container}>
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
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(ResourceManagementPage))
