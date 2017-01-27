import React from 'react'
import {Spin} from 'antd'
import styles from './DetailContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getDetailData} from '../../actions/course_center/main'

const CourseCenterContainer = React.createClass({
  componentDidMount(){
    this.props.getDetailData(this.props.params.lessonId)
  },

  componentWillReceiveProps(nextProps){
    if(!this.props.detail.get('loading') && (nextProps.detail.get('data').isEmpty() || (this.props.location.pathname != nextProps.location.pathname))){

      this.props.getDetailData(nextProps.params.lessonId)
    }
  },

  render(){
    return this.props.detail.get('loading') || this.props.menu.get('data').isEmpty()?<div className={styles.loading}><Spin size="large" /></div>:this.props.children
  }
})

function mapStateToProps(state){
  return{
    detail:state.get('detail'),
    menu:state.get('menu'),
  }
}

function mapDispatchToProps(dispatch){
  return {
    getDetailData:bindActionCreators(getDetailData,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CourseCenterContainer)
