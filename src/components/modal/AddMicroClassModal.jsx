import React from 'react'
import {Modal,Row,Col,Select,Input,Form,Table} from 'antd'
import config from '../../config'
import {List,fromJS} from 'immutable'
import styles from './AddMicroClassModal.scss'
const Option = Select.Option
const FormItem = Form.Item
const Search = Input.Search

const AddMicroClassModal = React.createClass({
  getDefaultProps(){
    return {
      subjectList:List(),
      onSubmit:()=>{},
      onCancel:()=>{},
    }
  },
  getInitialState(){
    return {

      subjectList:List(),
      versionList:List(),
    }
  },
  componentDidMount(){
    Promise.all([

    ]).then(result => {

    }).catch(error => {

    })
  },
  render(){
    const microClassTypeList =fromJS([{id:'1',text:'公共微课'},{id:'2',text:'学校微课'},{id:'3',text:'个人微课'}])
    const termList = fromJS([{id:'1',text:'上学期'},{id:'2',text:'下学期'}])
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
      <Modal title="添加微课" visible={true} onCancel={this.props.onCancel} width={850}>
        <div>
          <div className={styles.filters}>
            <Form>
              <Row gutter={8}>
                <Col span={6}>
                  <FormItem>
                  {getFieldDecorator('microClassType', {
                  rules: [{ required: true, message: '选择微课类型' }],
                  })(
                    <Select placeholder='选择微课类型' size="large" style={{ width: 200 }}>
                    {
                      microClassTypeList.map(v => (
                        <Option key={v.get('id')} value={v.get('id')} title={v.get('text')}>{v.get('text')}</Option>
                      ))
                    }
                    </Select>
                  )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem>
                  {getFieldDecorator('subject', {
                  rules: [{ required: true, message: '选择学科' }],
                  })(
                    <Select placeholder='选择学科' size="large" style={{ width: 200 }}>
                    {
                      this.state.subjectList.map(v => (
                        <Option key={v.get('id')} value={v.get('id')} title={v.get('text')}>{v.get('text')}</Option>
                      ))
                    }
                    </Select>
                  )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem>
                  {getFieldDecorator('version', {
                  rules: [{ required: true, message: '选择版本' }],
                  })(
                    <Select placeholder='选择版本' size="large" style={{ width: 200 }}>
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
                  {getFieldDecorator('subject', {
                  rules: [{ required: true, message: '选择学科' }],
                  })(
                    <Select placeholder='选择微课类型' size="large" style={{ width: 200 }}>
                    {
                      microClassTypeList.map(v => (
                        <Option key={v.get('id')} value={v.get('id')} title={v.get('text')}>{v.get('text')}</Option>
                      ))
                    }
                    </Select>
                  )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={8}>
                  <FormItem>
                  {getFieldDecorator('term', {
                  rules: [{ required: true, message: '选择学期' }],
                  })(
                    <Select placeholder='选择学期' size="large">
                    {
                      termList.map(v => (
                        <Option key={v.get('id')} value={v.get('id')} title={v.get('text')}>{v.get('text')}</Option>
                      ))
                    }
                    </Select>
                  )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem>
                  {getFieldDecorator('subject', {
                  rules: [{ required: true, message: '选择学科' }],
                  })(
                    <Select placeholder='选择微课类型' size="large">
                    {
                      microClassTypeList.map(v => (
                        <Option key={v.get('id')} value={v.get('id')} title={v.get('text')}>{v.get('text')}</Option>
                      ))
                    }
                    </Select>
                  )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <Search size="large"
                    placeholder="教师姓名、学校名称"
                    onSearch={value => console.log(value)}
                  />
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
  }
})

export default Form.create()(AddMicroClassModal)
