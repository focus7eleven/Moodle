import React from 'react'
import {Modal,Row,Col,Select,Input,Form,Table,DatePicker} from 'antd'
import config from '../../config'
import {List,fromJS} from 'immutable'
import styles from './AddHomeworkModal.scss'
const Option = Select.Option
const FormItem = Form.Item
const Search = Input.Search
const RangePicker = DatePicker.RangePicker

const AddHomeworkModal = React.createClass({
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
      title:'布置日期',
      dataIndex:'time',
      key:'time',
    },{
      title:'作业名称',
      dataIndex:'name',
      key:'name',
    },{
      title:'班级群组',
      dataIndex:'group',
      key:'group',
    },{
      title:'创建人',
      dataIndex:'creator',
      key:'creator',
    },{
      title:'完成期限',
      dataIndex:'deadline',
      key:'deadline'
    },{
      title:'学科',
      dataIndex:'subject',
      key:'subject'
    }]
    return (
      <Modal title="添加微课" visible={true} onCancel={this.props.onCancel} width={850}>
        <div>
          <div className={styles.filters}>
            <Form>
              <Row gutter={8}>
                <Col span={10}>
                  <FormItem>
                  {getFieldDecorator('timerange',{
                    rules:[{required:true,message:'输入时间'}]
                  })(
                  <RangePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder={['开始时间', '结束时间']}
                  />
                  )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <Search size="large"
                    placeholder="输入搜索条件"
                    onSearch={value => console.log(value)}
                  />
                </Col>
                <Col span={6}>
                  <div className={styles.homeworkSum}><span>共{this.state.homeworkSum}条作业</span></div>
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

export default Form.create()(AddHomeworkModal)
