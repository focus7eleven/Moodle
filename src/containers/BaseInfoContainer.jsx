import React from 'react'
import {Row,Col} from 'antd'
import LeftBoard from '../components/LeftBoard'
import Navigate from '../components/Navigate'
import EditorComponent from '../components/PlainTextEditor'

const BaseInfoContainer = React.createClass({
  getInitialState(){
    return {}
  },

  getDefaultProps(){
    return {
      menuList:[{'基础信息':['学段','年级','学科']},{'组织结构':['学校机构','年级管理']},{'人员管理':['老师','学生','家长']},{'群组管理':['通用群','定制群']},{'教学大纲':['教学大纲']},{'工具管理':['健康档案','课程表','菜谱']}]
    }
  },
  handleLeftBoardSelect(){

  },
  render(){
    return (
      <div style={{height: '100%'}}>
        <Row>
          <Col span={24}><Navigate /></Col>
        </Row>
        <div style={{height: 'calc( 100% - 48px )'}}>
          <Row gutter={16} style={{height:'100%'}}>
            <Col span={6} style={{height:'100%'}}>
              <LeftBoard menuList={this.props.menuList} onSelect={this.handleLeftBoardSelect}/>
            </Col>
            <Col span={18}>
              <div style={{paddingTop:'10px'}}>
                <EditorComponent></EditorComponent>
              </div>
            </Col>
          </Row>
        </div>
      </div>

    )
  }
})
export default BaseInfoContainer
