import React from 'react'
import styles from './CreateHomework.scss'
import {Row,Col,Select,Icon,Input} from 'antd'
import {fromJS,List} from 'immutable'
import config from '../../config'
const Option = Select.Option
const selectStyle={
  width:'100%'
}

const CreateHomeworkPage = React.createClass({
  componentDidMount(){
    fetch(config.api.courseCenter.getDistinctSubject,{
      method:'get',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken')
      }
    }).then(res => res.json()).then(res => {
      //获取学科列表
      this.setState({
        subjectList:fromJS(res),
        subjectOption:res[0]['subject_id'],
      })
      //根据学科获取年级列表,获取版本列表
      let subjectId = res[0]['subject_id']
      return Promise.all([
        fetch(config.api.grade.getBySubject.get(res[0]['subject_id']),{
          method:'get',
          headers:{
            'from':'nodejs',
            'token':sessionStorage.getItem('accessToken')
          }
        }).then(res => res.json()),
        fetch(config.api.select.json.get('','','','JKS',''),{
          method:'get',
          headers:{
            'from':'nodejs',
            'token':sessionStorage.getItem('accessToken')
          }
        }).then(res => res.json())
      ]).then(res => {
        //获取年级列表
        this.setState({
          gradeList:fromJS(res[0]),
          gradeOption:res[0][0].gradeId,
          versionList:fromJS(res[1]),
          versionOption:res[1][0].id
        })
        return {
          gradeId:res[0][0].gradeId,
          versionId:res[1][0].id,
          subjectId,
        }
      })
    }).then(result => {
      const {subjectId,gradeId,versionId} = result
      //根据subjectId，gradeId获取章节列表
      fetch(config.api.textbook.getUnitBySubjectAndGrade(subjectId,gradeId),{
        method:'get',
        headers:{
          'from':'nodejs',
          'token':sessionStorage.getItem('accessToken')
        }
      }).then(res => res.json()).then(res => {
        //获取章节列表
        this.setState({
          charpterList:fromJS(res),
          charpterOption:res[0][0],
        })
        //根绝章节获取响应的课程
        fetch(config.api.textbook.getTextBookByCondition(subjectId,gradeId,versionId,'上学期',res[0][0]),{
          method:'get',
          headers:{
            'from':'nodejs',
            'token':sessionStorage.getItem('accessToken')
          }
        }).then(res => res.json()).then(res =>{
          this.setState({
            courseList:fromJS(res),
            courseOption:res[0]['textbook_id'],
          })
        })
      })
    })
  },
  getInitialState(){
    return {
      subjectList:List(),
      termList:fromJS([{id:'上学期',text:'上学期'},{id:'下学期',text:'下学期'}]),
      gradeList:List(),
      versionList:List(),
      charpterList:List(),
      courseList:List(),

      homeworkName:'',
      demand:'',
      homeworkType:''

    }
  },
  render(){
    return (
      <div className={styles.container}>
        <div className={styles.body}>
          <Row type='flex' gutter={8}>
            <Col span={8}>
              <div className={styles.itemBox}>
                <span><Icon type='appstore'/>学科</span>
                <Select style={selectStyle}>
                {
                  this.state.subjectList.map((v,k) => (
                    <Option value={v.get('subject_id')} key={k} title={v.get('subject_name')}>{v.get('subject_name')}</Option>
                  ))
                }
                </Select>
              </div>
              <div className={styles.itemBox}>
                <span><Icon type='appstore'/>年级</span>
                <Select style={selectStyle}>
                {
                  this.state.gradeList.map((v,k) => (
                    <Option value={v.get('gradeId')} key={k} title={v.get('gradeName')}>{v.get('gradeName')}</Option>
                  ))
                }
                </Select>
              </div>
              <div className={styles.itemBox}>
                <span><Icon type='appstore'/>学期</span>
                <Select style={selectStyle}>
                {
                  this.state.termList.map((v,k) => (
                    <Option value={v.get('id')} key={k} title={v.get('text')}>{v.get('text')}</Option>
                  ))
                }
                </Select>
              </div>
              <div className={styles.itemBox}>
                <span><Icon type='appstore'/>名称</span>
                <Input />
              </div>
              <div className={styles.itemBox}>
                <span><Icon type='appstore'/>版本</span>
                <Select style={selectStyle}>
                {
                  this.state.versionList.map((v,k) => (
                    <Option value={v.get('id')} key={k} title={v.get('text')}>{v.get('text')}</Option>
                  ))
                }
                </Select>
              </div>
              <div className={styles.itemBox}>
                <span><Icon type='appstore'/>章节</span>
                <Select style={selectStyle}>
                {
                  this.state.charpterList.map((v,k) => (
                    <Option value={k} key={k} title={v}>{v}</Option>
                  ))
                }
                </Select>
              </div>
              <div className={styles.itemBox}>
                <span><Icon type='appstore'/>课程</span>
                <Select style={selectStyle}>
                {
                  this.state.courseList.map((v,k) => (
                    <Option value={v.get('textbook_id')} key={k} title={v.get('course')}>{v.get('course')}</Option>
                  ))
                }
                </Select>
              </div>
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
})

export default CreateHomeworkPage
