import React from 'react'
import styles from './CreateExampaper.scss'
import ExamElement from '../../components/tag/ExamElement'
import {Row,Col,Checkbox,Button,Icon} from 'antd'
import {List} from 'immutable'
import config from '../../config'

const CreateExampaper = React.createClass({
  getInitalState(){
    return {
      exerciseList:List()
    }
  },
  //添加选择题
  handleAddChoose(type){
    let formData = new formData()
    formData.append('examId','')
    formData.append('kind',type)
    formData.append('parentId','')
    formData.append('date',Date.now())
    fetch(config.api.wordquestion.addChoose,{
      method:'post',
      headers:{
        'from':'nodejs',
        'token':sessionStorage.getItem('accessToken')
      },
      body:formData
    })
  },
  render(){
    return (
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.center}>
            <div className={styles.paperElement}>
              <Row type='flex' align='middle' justify='space-between'>
                <Col span={10}>
                  <ExamElement text='单选' />
                  <ExamElement text='多选' />
                  <ExamElement text='判断' />
                  <ExamElement text='填空' />
                  <ExamElement text='简答（计算）' />
                </Col>
                <Col span={8}>
                  <Checkbox onChange={()=>{}}>对填空题和简答题统一上传标准答案</Checkbox>
                  <Button><Icon type='plus' />上传答案</Button>
                </Col>
              </Row>
              <Row type='flex' align='middle' justify='space-between' style={{marginTop:'10px'}}>
                <Col>
                  <ExamElement text='语文作文' />
                  <ExamElement text='英语作文' />
                </Col>
                <Col span={5} style={{display:'flex',justifyContent:'flex-end'}}>
                  <Button type='primary' style={{marginRight:'10px'}}><Icon type='download'/>导入</Button>
                  <Button type='primary' style={{marginRight:'10px'}}><Icon type='plus'/>发布</Button>
                </Col>
              </Row>
            </div>
            <div className={styles.paperContent}>

            </div>
          </div>

        </div>
      </div>
    )
  }
})

export default CreateExampaper
