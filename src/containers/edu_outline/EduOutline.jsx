import React from 'react'
import {Table, Icon, Button, Dropdown} from 'antd'
import styles from './EduOutline.scss'

const columns = [{
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
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
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

const EduOutline = React.createClass({
  getInitialState(){
    return {
      filterIndex:0,
    }
  },

  getDefaultProps(){
    return{
      filterOptions: [{
          'name': "所有学科",
          'options': ["语文","语文","语文","语文","语文","语文","语文","语文","语文","语文","语文","语文","语文","语文","语文"]
        },{
          'name': "所有年级",
          'options': ["一年级","二年级","三年级","四年级","五年级","六年级"]
        },{
          'name': "所有学段",
          'options': ["语文","语文","语文","语文","语文","语文","语文","语文","语文","语文","语文","语文","语文","语文","语文"]
        },
      ]
    }
  },
  handleFilterFadeIn(evt){
    const ref = evt.target.getAttribute('data-ref');
    this.setState({filterIndex:parseInt(ref.slice(6))});
    this.refs.filter.style.zIndex = 2;
    this.refs[ref].style.zIndex = 3;
    this.refs[ref].style.border = "1px solid #38BA82";
    this.refs[ref].style.borderBottom = "none";
    this.refs[ref].style.borderBottomLeftRadius = "0px";
    this.refs[ref].style.borderBottomRightRadius = "0px";
  },
  handleFilterFadeOut(evt){
    const ref = evt.target.getAttribute('data-ref');
    this.refs.filter.style.zIndex = -2;
    this.refs[ref].style.zIndex = 1;
    this.refs[ref].style.border = "1px solid #DDDDDD";
    this.refs[ref].style.borderBottomLeftRadius = "4px";
    this.refs[ref].style.borderBottomRightRadius = "4px";
  },
  render(){
    const {filterOptions} = this.props;
    const {filterIndex} = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header} ref="header">
          {
            filterOptions.map((item,index)=>{
              return <div key={index} data-ref={"filter"+index} ref={"filter"+index}
                          onMouseEnter={this.handleFilterFadeIn}
                          onMouseLeave={this.handleFilterFadeOut}
                          className={styles.filterButton}>
                    {item.name}</div>
            })
          }
          <div ref="filter" className={styles.filter}>
            {
              filterOptions[filterIndex].options.map((item,index)=><span key={index}>{item}</span>)
            }
          </div>
        </div>
        <div className={styles.body}>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    )
  }
})

export default EduOutline
