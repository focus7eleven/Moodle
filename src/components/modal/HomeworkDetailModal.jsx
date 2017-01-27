import React from 'react'
import styles from './HomeworkDetailModal.scss'
import {Modal,Row,Col,Icon,Tag} from 'antd'

const HomeworkDetailModal = React.createClass({
  getDefaultProps(){
    return {
      onCancel:()=>{}
    }
  },
  componentDidMount(){

  },
  render(){
    return (
      <Modal title='作业详情' visible={true} onCancel={()=>{this.props.onCancel()}}>
        <Row>
          <Col span={8}>
            <div className={styles.box}>
              <span><Icon type='appstore'/>学科</span>
              <span><Tag >语文</Tag></span>
            </div>
            <div className={styles.box}>
              <span><Icon type='appstore'/>名称</span>
              <span><Tag >作业1</Tag></span>
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
              <span><Tag >时间</Tag></span>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.box}>
              <span><Icon type='appstore'/>要求</span>
              <span><Tag >要求</Tag></span>
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
