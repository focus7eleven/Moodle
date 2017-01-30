import React from 'react'
import TableComponent from '../../components/table/TableComponent'
import styles from './PublicVideoPage.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getTableData} from '../../actions/micro_course/main'
import {Input,Button} from 'antd'

const Search = Input.Search

const PublicVideoPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState(){
    return {
      searchStr:'',
    }
  },

  handleSearchVideo(value){
    console.log(value);
  },

  render(){
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {/* <CourseFilterComponent pageType="publicPage"/> */}
          <div></div>
          <Search style={{width: '260px'}} placeholder="请输入微课名称" value={this.state.searchStr} onChange={(e)=>{this.setState({searchStr:e.target.value})}} onSearch={this.handleSearchVideo}/>
        </div>
        <div className={styles.body}>
        </div>
      </div>
    )
  }
})

function mapStateToProps(state){
  return{
    menu:state.get('menu'),
    microCourse:state.get('microCourse')
  }
}

function mapDispatchToProps(dispatch){
  return {
    getTableData:bindActionCreators(getTableData,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PublicVideoPage)
