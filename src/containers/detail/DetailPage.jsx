import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './DetailPage.scss'
import {Row,Col,Card,Icon,Button,Table,Tag} from 'antd'
import VideoModal from '../../components/modal/VideoModal'
import HomeworkDetailModal from '../../components/modal/HomeworkDetailModal'

const DetailPage = React.createClass({
  getInitialState(){
    return {
      showDetailModal:false
    }
  },
  handleBack(){
    this.props.router.goBack()
  },
  handleCheckDetail(currentRow){
    if(currentRow['content_name']=='微课'){
      this.setState({
        showVidoeoDetailModal:true
      })
    }else{
      this.setState({
        showHomeworkDetailModal:true
      })
    }
  },
  render(){
    const tableHeader = [{
      title:'类型',
      dataIndex:'content_name',
      key:'content_name',
    },{
      title:'名称',
      dataIndex:'name',
      key:'name',
    },{
      title:'创建时间',
      dataIndex:'create_dt',
      key:'create_dt',
    },{
      title:'说明',
      dataIndex:'desc2',
      key:'desc2',
    },{
      title:'操作',
      key:'action',
      render:(text,record)=>{
        return (<Button onClick={this.handleCheckDetail.bind(this,text)} type='primary'>详情</Button>)
      }
    }]
    const tableBody = this.props.detail.get('data').get('lessonContentPojoList').map(v => ({
      key:v.get('content_id'),
      ...v.toJS()
    })).toJS()
    return (
      <div className={styles.container}>
        <div className={styles.body}>
          <Row type='flex' gutter={8} style={{marginBottom:'10px'}}>
            <Col span={6}>
              <Card title={<span><Icon type='appstore'/>学科</span>} bordered={true}>Card content</Card>
            </Col>
            <Col span={6}>
              <Card title={<span><Icon type='appstore'/>版本</span>} bordered={true}>Card content</Card>
            </Col>
            <Col span={6}>
              <Card title={<span><Icon type='appstore'/>年级</span>} bordered={true}>Card content</Card>
            </Col>
            <Col span={6}>
              <Card title={<span><Icon type='appstore'/>学期</span>} bordered={true}>Card content</Card>
            </Col>
          </Row>
          <Row type='flex' gutter={8} style={{marginBottom:'10px'}}>
            <Col span={8}>
              <Card title={<span><Icon type='appstore'/>章节课程</span>} bordered={true}>Card content</Card>
            </Col>
            <Col span={8}>
              <Card title={<span><Icon type='appstore'/>上课时间</span>} bordered={true}>Card content</Card>
            </Col>
            <Col span={8}>
              <Card title={<span><Icon type='appstore'/>课程名称</span>} bordered={true}>Card content</Card>
            </Col>
          </Row>
          <Row type='flex' gutter={8} style={{marginBottom:'10px'}}>
            <Col span={24}>
              <Card title={<span><Icon type='appstore'/>课程说明</span>} bordered={true}>Card content</Card>
            </Col>
          </Row>
          <Row type='flex'>
            <Col span={24}>
              <Table columns={tableHeader} dataSource={tableBody}/>
            </Col>
          </Row>
        </div>
        <div className={styles.footer}>
          <Button type='primary' onClick={this.handleBack}>返回</Button>
        </div>
        {this.state.showVidoeoDetailModal?<VideoModal onCancel={()=>{this.setState({showVidoeoDetailModal:false})}}/>:null}
        {this.state.showHomeworkDetailModal?<HomeworkDetailModal onCancel={()=>{this.setState({showHomeworkDetailModal:false})}}/>:null}
      </div>
    )
  }
})

function mapStateToProps(state){
  return{
    menu:state.get('menu'),
    detail:state.get('detail')
  }
}
function mapDispatchToProps(dispatch){
  return {
    // getTableData:bindActionCreators(getTableData,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailPage)
