import React from 'react'
import {Row,Col,Table,Icon,Button} from 'antd'
import LeftBoard from '../components/LeftBoard'
import styles from './NoticeManagerContainer.scss'
import Navigate from '../components/Navigate'

const COLUMNS = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#"><Icon type="delete" /></a>
      <span className="ant-divider" />
      <Button type='ghost'>More Action</Button>
    </span>
  ),
}];

const DATA = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

const NoticeManagerContainer = React.createClass({
  getDefaultProps(){
    return {
      menuList:[{'通知':['新建的通知','收到的通知','发送的通知']}]
    }
  },
  getInitialState(){
    return {
      columns:[],
      data:[],
      showNavigate:false,
      showLeftBoard:false,
    }
  },
  handleClick(key){
    if(key==0){
      this.setState({
        columns:COLUMNS,
        data:DATA
      })
    }else{
      this.setState({
        columns:[],
        data:[]
      })
    }
    this.setState({
      showLeftBoard:false
    })
  },
  handleDisplayNavigate(){
    this.setState({
      showNavigate:!this.state.showNavigate
    })
  },
  handleDisplayLeftBoard(){
    this.setState({
      showLeftBoard:!this.state.showLeftBoard
    })
  },
  render(){
    const {columns,data} = this.state
    return (
      <div style={{height: '100%'}}>
        <Row>
          <Col>
            <div className={styles.navigateBar}><Navigate /></div>
            <div className={styles.miniNavigateBar}>
              <Icon type="bars" style={{fontSize:'24px'}} onClick={this.handleDisplayNavigate}/>
              <div className={styles.miniNavigate} style={this.state.showNavigate?{display:'block'}:{display:'none'}}><Navigate mode='inline'/></div>
            </div>
          </Col>
        </Row>
        <div style={{height: 'calc( 100% - 48px )'}}>
          <Row type='flex'  gutter={16} style={{height:'100%'}}>
            <Col span={24} className={styles.content}>
              <div className={styles.plainLeftBoard}>
                <LeftBoard menuList={this.props.menuList} onSelect={this.handleClick}/>
              </div>
              <div className={styles.leftBoard} style={this.state.showLeftBoard?{width:'200px'}:{width:'30px'}}>
                <div className={styles.miniLeftBoardToggler}><Icon type="bars" style={{fontSize:'24px'}} onClick={this.handleDisplayLeftBoard}/></div>
                <div className={styles.miniLeftBoard} style={this.state.showLeftBoard?{display:'block',width:'200px'}:{display:'none'}}><LeftBoard menuList={this.props.menuList} onSelect={this.handleClick}/></div>
              </div>
              <div className={styles.tableContent}>
                {
                  columns?<Table columns={columns} dataSource={data} />:null
                }
              </div>
            </Col>

          </Row>
        </div>
      </div>

    )
  }
})
export default NoticeManagerContainer
