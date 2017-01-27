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
  },
  render(){
    return (
      <Modal title='作业详情' visible={true} onCancel={()=>{this.props.onCancel()}}>
        <Row>
          <Col span={8}>
            <div className={styles.box}>
              <span><Icon type='appstore'/>学科</span>
              <span><Tag >{this.state.subject}</Tag></span>
            </div>
            <div className={styles.box}>
              <span><Icon type='appstore'/>名称</span>
              <span><Tag >{this.state.homeworkName}</Tag></span>
            </div>
            <div className={styles.box}>
              <span><Icon type='appstore'/>教辅资料</span>
              <span><Tag >资料</Tag></span>
            </div>
            <div className={styles.box}>
              <span><Icon type='appstore'/>作业内容</span>
              <span><Tag >无</Tag></span>
            </div>
            <div className={styles.box}>
              <span><Icon type='appstore'/>完成期限</span>
              <span><Tag >{this.state.finishTime}</Tag></span>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.box}>
              <span><Icon type='appstore'/>要求</span>
              <span><Tag >{this.state.homeworkDesc}</Tag></span>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.box}>
              <span><Icon type='appstore'/>附件</span>
              <span><Tag >语文</Tag></span>
            </div>
            <div className={styles.box}>
              <span><Icon type='appstore'/>试卷</span>
              <span><Tag >语文</Tag></span>
            </div>
            <div className={styles.box}>
              <span><Icon type='appstore'/>班级/群组</span>
              <span><Tag >语文</Tag></span>
            </div>
          </Col>
        </Row>
      </Modal>
    )
  }
})

export default HomeworkDetailModal
