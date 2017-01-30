import React from 'react'
import styles from './HomeworkDetailModal.scss'
import {Modal,Row,Col,Icon,Tag} from 'antd'
import config from '../../config'
const HomeworkDetailModal = React.createClass({
  getDefaultProps(){
    return {
      homeworkId:'',
      onCancel:()=>{},
    }
  },
  getInitialState(){
    return {
      subject:'',
      homeworkName:'',
      finishTime:'',
      homeworkDesc:'',
      classes: [],
    }
  },
  componentDidMount(){
    fetch(config.api.homework.getHomeworkDetail(this.props.homeworkId),{
      method:'get',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken')
      }
    }).then(res => res.json()).then(res => {
      this.setState({
        subject:res[0].subject,
        homeworkName:res[0]['homework_name'],
        finishTime:res[0]['finish_time'],
        homeworkDesc:res[0]['homework_desc'],
      })
    })
    fetch(config.api.homework.getHomeworkClass(this.props.homeworkId),{
      method:'get',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken')
      }
    }).then(res => res.json()).then(res => {
      this.setState({
        classes: res
      })
    })
  },
  render(){
    return (
      <Modal width={800} title='作业详情' visible={true} onOk={()=>{this.props.onCancel()}} onCancel={()=>{this.props.onCancel()}}>
        <Row>
          <Col span={8}>
            <div className={styles.box}>
              <span><Icon type='appstore'/>学科</span>
              <span>{this.state.subject}</span>
            </div>
            <div className={styles.box}>
              <span><Icon type='edit'/>名称</span>
              <span>{this.state.homeworkName}</span>
            </div>
            <div className={styles.box}>
              <span><Icon type='book'/>教辅资料</span>
              <span>资料</span>
            </div>
            <div className={styles.box}>
              <span><Icon type='bars'/>作业内容</span>
              <span>无</span>
            </div>
            <div className={styles.box}>
              <span><Icon type='calendar'/>完成期限</span>
              <span>{this.state.finishTime}</span>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.box}>
              <span><Icon type='tags'/>要求</span>
              <span style={{height: "285px"}}>{this.state.homeworkDesc}</span>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.box}>
              <span><Icon type='file'/>附件</span>
              <span>无</span>
            </div>
            <div className={styles.box}>
              <span><Icon type='file-text'/>试卷</span>
              <span>无</span>
            </div>
            <div className={styles.box}>
              <span><Icon type='team'/>班级/群组</span>
              <span>{this.state.classes}</span>
            </div>
          </Col>
        </Row>
      </Modal>
    )
  }
})

export default HomeworkDetailModal
