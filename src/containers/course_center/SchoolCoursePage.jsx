import React from 'react'
import CourseFilterComponent from '../../components/course_filter/CourseFilterComponent'
import TableComponent from '../../components/table/TableComponent'
import styles from './TeacherPage.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getTableData} from '../../actions/course_center/main'
import {Button} from 'antd'
import PublishModal from '../../components/modal/PublishModal'
const SchoolCoursePage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState(){
    return {
      searchStr:'',
      showPublishModal:false,
    }
  },
  getTableData(){
    const tableHeader=[{
      title:'序号',
      dataIndex:'num',
      key:'num',
    },{
      title:'课程名称',
      dataIndex:'name',
      key:'name',
    },{
      title:'微课数量',
      dataIndex:'content_num',
      key:'content_num',
    },{
      title:'预习作业数量',
      dataIndex:'prepare_homework',
      key:'prepare_homework',
    },{
      title:'课后作业数量',
      dataIndex:'after_class_homework',
      key:'after_class_homework',
    },{
      title:'创建人',
      dataIndex:'teacher_name',
      key:'teacher_name',
    },{
      title:'创建时间',
      dataIndex:'created_at_string',
      key:'created_at_string',
    },{
      title:'查看详情',
      dataIndex:'lesson_id',
      key:'detail',
      render:(text,record)=>{
        return (<Button type='primary' onClick={this.handleCheckDetail.bind(this,text)}>详情</Button>)
      }
    },{
      title:'发布',
      key:'publish',
      render:(text,record)=>{
        return (<Button type='primary' onClick={this.handlePublish}>发布</Button>)
      }
    }]
    const tableBody = this.props.courseCenter.get('data').isEmpty()?[]:this.props.courseCenter.get('data').get('result').map((v,k) => ({
      key:k,
      ...v.toJS(),
    })).toJS()
    return {
      tableHeader,
      tableBody,
    }
  },
  handlePublish(){
    this.setState({
      showPublishModal:true
    })
  },
  handleCheckDetail(text){
    this.context.router.push(`/index/courseCenter/detail/${text}`)
  },
  render(){
    const tableData = this.getTableData()
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <CourseFilterComponent />
        </div>
        <div className={styles.body}>
          <TableComponent tableData={tableData} pageType="publicedPage" searchStr={this.state.searchStr}></TableComponent>
        </div>
        {this.state.showPublishModal?<PublishModal onOk={()=>{this.context.router.push(`/index/course-center/publishedCourse`)}} onCancel={()=>{this.setState({showPublishModal:false})}}/>:null}
      </div>
    )
  }
})
function mapStateToProps(state){
  return{
    menu:state.get('menu'),
    courseCenter:state.get('courseCenter')
  }
}
function mapDispatchToProps(dispatch){
  return {
    getTableData:bindActionCreators(getTableData,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SchoolCoursePage)
