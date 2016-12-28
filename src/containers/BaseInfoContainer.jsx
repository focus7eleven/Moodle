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
      <Row gutter={16}>
        <Col span={24}>
          <div style={{paddingTop:'10px'}}>
            <EditorComponent></EditorComponent>
          </div>
        </Col>
      </Row>
    )
  }
})
export default BaseInfoContainer
