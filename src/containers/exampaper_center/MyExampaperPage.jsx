import React from 'react'
import TableComponent from '../../components/table/TableComponent'
import styles from './MyExampaperPage.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getTableData} from '../../actions/exampaper_action/main'
import {Input,Button} from 'antd'

const Search = Input.Search

const MyExampaperPage = React.createClass({
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
    exampaper:state.get('exampaper')
  }
}

function mapDispatchToProps(dispatch){
  return {
    getTableData:bindActionCreators(getTableData,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyExampaperPage)
