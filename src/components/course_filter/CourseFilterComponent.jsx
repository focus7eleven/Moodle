import React from 'react'
import {Select} from 'antd'
import {getWorkspaceData} from '../../actions/workspace'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './CourseFilterComponent.scss'
import config from '../../config'

const Option = Select.Option;

const CourseFilterComponent = React.createClass({
  propTypes: {
  },

  componentWillMount(){
    fetch(config.api.courseCenter.getCourseVersion,{
      method:'GET',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken'),
      }
    }).then(res => res.json()).then((json)=>{
      this.setState({version: json})
      fetch(config.api.courseCenter.getDistinctSubject,{
        method:'GET',
        headers:{
          'from':'nodejs',
          'token':sessionStorage.getItem('accessToken'),
        }
      }).then(res => res.json()).then((json) => {
        this.setState({subjects: json})
        fetch(config.api.courseCenter.getUserGrade,{
          method:'GET',
          headers:{
            'from':'nodejs',
            'token':sessionStorage.getItem('accessToken'),
          }
        }).then(res => res.json()).then((json) => {
          this.setState({grade: json})
        })
      })
    })
  },

  getInitialState(){
    return {
      version: [],
      subjects: [],
      grade: [],
    }
  },

  handleGradeChange(value){
    console.log(value);
  },

  handleTermChange(value){
    console.log(value);
  },

  handleVersionChange(value){
    console.log(value);
  },

  handleSubjectChange(value){
    console.log(value);
  },

  render(){
    const {version,subjects,grade} = this.state

    return (
      <div className={styles.container}>
        <Select defaultValue="" style={{ width: 200 }} onChange={this.handleGradeChange}>
          <Option value="">所有年级</Option>
          {
            grade.map((item,index)=>{
              return <Option value={item.gradeId} key={index}>{item.gradeName}</Option>
            })
          }
        </Select>
        <Select defaultValue="" style={{ marginLeft:20,width: 200 }} onChange={this.handleSubjectChange}>
          <Option value="">所有学期</Option>
          <Option value="上学期">上学期</Option>
          <Option value="下学期">下学期</Option>
        </Select>
        <Select defaultValue="" style={{ marginLeft:20,width: 200 }} onChange={this.handleSubjectChange}>
          <Option value="">所有学科</Option>
          {
            subjects.map((item,index)=>{
              return <Option value={item.subject_id} key={index}>{item.subject_name}</Option>
            })
          }
        </Select>
        <Select defaultValue="" style={{ marginLeft:20,width: 200 }} onChange={this.handleVersionChange}>
          <Option value="">所有版本</Option>
          {
            version.map((item,index)=>{
              return <Option value={item.id} key={index}>{item.text}</Option>
            })
          }
        </Select>
      </div>
    )
  }
})

function mapStateToProps(state){
  return{
  }
}

function mapDispatchToProps(dispatch){
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CourseFilterComponent)
