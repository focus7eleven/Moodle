import React from 'react'
import {Button,Icon,Form,Input,Row,Col,Modal,Table,Select,DatePicker} from 'antd'
import {List,fromJS} from 'immutable'
import styles from './CreateClassPage.scss'
// import config from '../../config'
import AddMicroClassModal from '../../components/modal/AddMicroClassModal.jsx'
import AddHomeworkModal from '../../components/modal/AddHomeworkModal'
const FormItem = Form.Item
const Option = Select.Option
const Search = Input.Search
const CreateClassPage = React.createClass({
  getInitialState(){
    return {
      showHomeworkModal:false,
      showMicroClassModal:false,

      subjectList:List(),
      versionList:List(),
      gradeList:List(),
      termList:List(),
      charpterList:List(),
    }
  },
  componentDidMount(){
    // Promise.all([
    //   fetch(config.api.courseCenter.getdistinctsubject,{
    //     method:'get',
    //     headers:{
    //       'from':'nodej',
    //       'token':sessionStorage.getItem('accessToken')
    //     }
    //   }).then(res => res.json()),
    //   fetch(config.api.grade)
    // ])
  },
  handleShowHomeworkModal(){
    this.setState({
      showHomeworkModal:true
    })
  },
  handleShowMicroClassModal(){
    this.setState({
      showMicroClassModal:true
    })
  },
  render(){
    const {getFieldDecorator} = this.props.form
    return (
      <div className={styles.container}>
        <div className={styles.header}>
           <Button type='primary' style={{marginRight:'10px'}} onClick={this.handleShowMicroClassModal}><Icon type="plus" />微课</Button><Button type='primary' onClick={this.handleShowHomeworkModal}><Icon type="plus" />作业</Button>
        </div>
        <div className={styles.body}>
          <div className={styles.title}><Icon type='edit'/>教学计划</div>
          <Form>
            <Row type='flex' gutter={8}>
              <Col span={6}>
                <FormItem>
                <div ><span><Icon type="appstore" />学科</span></div>
                {getFieldDecorator('subject', {
                rules: [{ required: true, message: '选择学科' }],
                })(
                  <Select placeholder='选择学科' size="large" >
                  {
                    this.state.subjectList.map(v => (
                      <Option key={v.get('subject_id')} value={v.get('subject_id')} title={v.get('subject_name')}>{v.get('subject_name')}</Option>
                    ))
                  }
                  </Select>
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                <div ><span><Icon type="tag" />版本</span></div>
                {getFieldDecorator('version', {
                rules: [{ required: true, message: '选择版本' }],
                })(
                  <Select placeholder='选择版本' size="large" >
                  {
                    this.state.versionList.map(v => (
                      <Option key={v.get('id')} value={v.get('id')} title={v.get('text')}>{v.get('text')}</Option>
                    ))
                  }
                  </Select>
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                <div ><span><Icon type="appstore" />年级</span></div>
                {getFieldDecorator('grade', {
                rules: [{ required: true, message: '选择年级' }],
                })(
                  <Select placeholder='选择年级' size="large" >
                  {
                    this.state.gradeList.map(v => (
                      <Option key={v.get('gradeId')} value={v.get('gradeId')} title={v.get('gradeName')}>{v.get('gradeName')}</Option>
                    ))
                  }
                  </Select>
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                <div ><span><Icon type="bars" />学期</span></div>
                {getFieldDecorator('term', {
                rules: [{ required: true, message: '选择学期' }],
                })(
                  <Select placeholder='学则学期' size="large" >
                  {
                    this.state.termList.map(v => (
                      <Option key={v.get('id')} value={v.get('id')} title={v.get('text')}>{v.get('text')}</Option>
                    ))
                  }
                  </Select>
                )}
                </FormItem>
              </Col>
            </Row>
            <Row type='flex' gutter={8}>
              <Col span={6}>
                <FormItem>
                <div ><span><Icon type="appstore" />章节课程</span></div>
                {getFieldDecorator('charpter', {
                rules: [{ required: true, message: '选择章节课程' }],
                })(
                  <Select placeholder='选择章节课程' size="large" >
                  {
                    this.state.charpterList.map(v => (
                      <Option key={v.get('id')} value={v.get('id')} title={v.get('text')}>{v.get('text')}</Option>
                    ))
                  }
                  </Select>
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                <div ><span><Icon type="calendar" />上课时间</span></div>
                {getFieldDecorator('time', {
                rules: [{ required: true, message: '选择上课时间' }],
                })(
                  <DatePicker style={{width:'100%'}} showTime format="YYYY-MM-DD HH:mm:ss" />
                )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                <div ><span><Icon type="appstore" />课程名称</span></div>
                {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入课程名称' },{max:30,message:'输入小于30个字'}],
                })(
                <Input placeholder="输入小于30个字" />
                )}
                </FormItem>
              </Col>
            </Row>
            <Row type='flex' gutter={8}>
              <Col span={24}>
                <FormItem>
                <div ><span><Icon type="appstore" />课程说明</span></div>
                {getFieldDecorator('remark', {
                rules: [{ required: true, message: '请输入课程说明' }],
                })(
                <Input placeholder="请输入课程说明"/>
                )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <div className={styles.footer}>
          <Button type='primary' style={{marginRight:'10px'}}>保存为学校课程</Button><Button type='primary'>保存为个人课程</Button>
        </div>
        {this.state.showHomeworkModal?<AddHomeworkModal onCancel={()=>{this.setState({showHomeworkModal:false})}}/>:null}
        {this.state.showMicroClassModal?<AddMicroClassModal onCancel={()=>{this.setState({showMicroClassModal:false})}}/>:null}
      </div>
    )
  }
})

export default Form.create()(CreateClassPage)
