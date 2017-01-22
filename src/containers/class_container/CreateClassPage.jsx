import React from 'react'
import {Button,Icon,Form,Input,Row,Col,Modal,Table} from 'antd'
import styles from './CreateClassPage.scss'
const FormItem = Form.Item
const CreateClassPage = React.createClass({
  getInitialState(){
    return {
      showHomeworkModal:false,
      showMicroClassModal:false,
    }
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
  renderMicroClassModal(){
    const {getFieldDecorator} = this.props.form
    const tableData = this.state.microClassData
    const tableColumn = [{
      title:'微课名称',
      dataIndex:'name',
      key:'name',
    },{
      title:'创建人',
      dataIndex:'creator',
      key:'creator',
    },{
      title:'创建时间',
      dataIndex:'time',
      key:'time',
    },{
      title:'简介',
      dataIndex:'desc',
      key:'desc',
    },{
      title:'播放',
      dataIndex:'player',
      key:'player'
    }]
    return (
      <Modal title="添加微课" visible={true} onCancel={()=>{this.setState({showMicroClassModal:false})}} width={850}>
        <div>
          <div className={styles.filters}>
            <Form>
              <Row gutter={8}>
                <Col span={6}>
                  <FormItem>
                  {getFieldDecorator('subject', {
                  rules: [{ required: true, message: '选择学科' }],
                  })(
                  <Input addonBefore={<span><Icon type="appstore" />学科</span>} placeholder="学科" />
                  )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem>
                  {getFieldDecorator('subject', {
                  rules: [{ required: true, message: '选择学科' }],
                  })(
                  <Input addonBefore={<span><Icon type="appstore" />学科</span>} placeholder="学科" />
                  )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem>
                  {getFieldDecorator('subject', {
                  rules: [{ required: true, message: '选择学科' }],
                  })(
                  <Input addonBefore={<span><Icon type="appstore" />学科</span>} placeholder="学科" />
                  )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem>
                  {getFieldDecorator('subject', {
                  rules: [{ required: true, message: '选择学科' }],
                  })(
                  <Input addonBefore={<span><Icon type="appstore" />学科</span>} placeholder="学科" />
                  )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={8}>
                  <FormItem>
                  {getFieldDecorator('subject', {
                  rules: [{ required: true, message: '选择学科' }],
                  })(
                  <Input addonBefore={<span><Icon type="appstore" />学科</span>} placeholder="学科" />
                  )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem>
                  {getFieldDecorator('subject', {
                  rules: [{ required: true, message: '选择学科' }],
                  })(
                  <Input addonBefore={<span><Icon type="appstore" />学科</span>} placeholder="学科" />
                  )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem>
                  {getFieldDecorator('subject', {
                  rules: [{ required: true, message: '选择学科' }],
                  })(
                  <Input addonBefore={<span><Icon type="appstore" />学科</span>} placeholder="学科" />
                  )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <div className={styles.table}>
          <Table columns={tableColumn} dataSource ={tableData}/>
          </div>
        </div>
      </Modal>
    )
  },
  renderHomeworkModal(){
    return (
      <Modal title="添加作业" visible={true} onCancel={()=>{this.setState({showHomeworkModal:false})}}>

      </Modal>
    )
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
                {getFieldDecorator('subject', {
                rules: [{ required: true, message: '选择学科' }],
                })(
                <Input addonBefore={<span><Icon type="appstore" />学科</span>} placeholder="学科" />
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                {getFieldDecorator('version', {
                rules: [{ required: true, message: '选择版本' }],
                })(
                <Input addonBefore={<span><Icon type="appstore" />版本</span>} placeholder="版本" />
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                {getFieldDecorator('grade', {
                rules: [{ required: true, message: '选择年级' }],
                })(
                <Input addonBefore={<span><Icon type="appstore" />年级</span>} placeholder="年级" />
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                {getFieldDecorator('term', {
                rules: [{ required: true, message: '选择学期' }],
                })(
                <Input addonBefore={<span><Icon type="appstore" />学期</span>} placeholder="学期" />
                )}
                </FormItem>
              </Col>
            </Row>
            <Row type='flex' gutter={8}>
              <Col span={6}>
                <FormItem>
                {getFieldDecorator('charpter', {
                rules: [{ required: true, message: '选择章节课程' }],
                })(
                <Input addonBefore={<span><Icon type="appstore" />章节课程</span>} placeholder="章节课程" />
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                {getFieldDecorator('time', {
                rules: [{ required: true, message: '选择上课时间' }],
                })(
                <Input addonBefore={<span><Icon type="appstore" />上课时间</span>} placeholder="上课时间" />
                )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入课程名称' },{max:30,message:'输入小于30个字'}],
                })(
                <Input addonBefore={<span><Icon type="appstore" />课程名称</span>} placeholder="输入小于30个字" />
                )}
                </FormItem>
              </Col>
            </Row>
            <Row type='flex' gutter={8}>
              <Col span={24}>
                <FormItem>
                {getFieldDecorator('remark', {
                rules: [{ required: true, message: '请输入课程说明' }],
                })(
                <Input addonBefore={<span><Icon type="appstore" />课程说明</span>} placeholder="请输入课程说明" />
                )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <div className={styles.footer}>
          <Button type='primary' style={{marginRight:'10px'}}>保存为学校课程</Button><Button type='primary'>保存为个人课程</Button>
        </div>
        {this.state.showHomeworkModal?this.renderHomeworkModal():null}
        {this.state.showMicroClassModal?this.renderMicroClassModal():null}
      </div>
    )
  }
})

export default Form.create()(CreateClassPage)
