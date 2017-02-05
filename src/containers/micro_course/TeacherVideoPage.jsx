import React from 'react'
import CourseFilterComponent from '../../components/course_filter/CourseFilterComponent'
import styles from './TeacherVideoPage.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getTableData} from '../../actions/micro_course/main'
import {Pagination,Menu,Input,Button,Modal,Form} from 'antd'
import TreeComponent from '../../components/tree/TreeComponent'
import VideoComponent from '../../components/video/VideoComponent'
import {findMenuInTree} from '../../reducer/menu'
import {fromJS,Map,List} from 'immutable'

const Search = Input.Search
const FormItem = Form.Item

const TeacherVideoPage = React.createClass({
  _currentMenu:Map({
    authList:List()
  }),

  componentWillMount(){
    if(!this.props.menu.get('data').isEmpty()){
      this._currentMenu = findMenuInTree(this.props.menu.get('data'),'teachervideo')
    }
  },

  getInitialState(){
    return {
      searchStr:'',
      currentTab: "hot",
      showAddVideoModal: false,
      videoFile: null,
    }
  },

  handleSearchVideo(value){
    this.props.getTableData('getTeacher',value,this.props.microCourse.get('data').get('nowPage'));
  },

  handleClickMenu(e) {
    console.log('click ', e);
    this.setState({
      currentTab: e.key,
    });
  },

  handlePageChanged(pageNumber){
    this.props.getTableData('getTeacher','',pageNumber);
  },

  handleShowAddVideoModal(){
  },

  handlePostVideo(){

  },

  handleShowAddVideoModal(){
    this.setState({showAddVideoModal: true});
  },

  handleHideAddVideoModal(){
    this.setState({showAddVideoModal: false});
  },

  handleFileChange(e){
    const file = e.target.files[0];
    this.setState({videoFile: file});
  },

  renderModal(){
    const {getFieldDecorator} = this.props.form;
    const {showAddVideoModal} = this.state;
    const formItemLayout = {labelCol:{span:5},wrapperCol:{span:12}};
    return (
      <Modal title="添加微课视频" visible={showAddVideoModal}
          onOk={this.handlePostVideo} onCancel={this.handleHideAddVideoModal}
        >
        <div>
          <Form>
            <FormItem
              label='微视频名称'
              {...formItemLayout}
              key='name'
            >
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: '请填写微视频名称' },{
                  validator(rule, value, callback, source, options) {
                    var errors = [];
                    if(value.length > 30){
                      errors.push(
                        new Error('微视频名称应不超过30个字')
                      )
                    }
                    callback(errors);
                  }
                }],
              })(<Input placeholder='输入不超过30个字'/>)
            }
            </FormItem>
          </Form>
          <Form>
            <FormItem
              label='微视频文件'
              {...formItemLayout}
              key='file'
            >
            {
              getFieldDecorator('file', {
                rules: [{ required: true, message: '请填写学科名称' }],
              })(<Input className={styles.videoFile} type="file" onChange={this.handleFileChange} />)
            }
            </FormItem>
          </Form>
          <Form>
            <FormItem
              label='简介'
              {...formItemLayout}
              key='description'
            >
            {
              getFieldDecorator('description', {
                rules: [{
                  validator(rule, value, callback, source, options) {
                    var errors = [];
                    if(value.length > 150){
                      errors.push(
                        new Error('简介应不超过150个字')
                      )
                    }
                    callback(errors);
                  }
                }],
              })(<Input type="textarea" placeholder='输入不超过150个字' rows={3}/>)
            }
            </FormItem>
            <FormItem
              label='年级'
              {...formItemLayout}
              key='gradeId'
            >
            {
              getFieldDecorator('gradeId', {
                rules: [{required: true}],
                // initialValue: allAreasList[0]?allAreasList[0].areaId:"",
              })(
                <Select
                  placeholder="请选择年级"
                  optionFilterProp="children"
                >
                  {
                    // allAreasList.map((item)=>{
                    //   return <Option value={item.areaId} key={item.areaId}>{item.areaName}</Option>
                    // })
                  }
                </Select>
              )
            }
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  },

  render(){
    const data = this.props.microCourse.get('data');
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            {
              this._currentMenu.get('authList').find((v)=>v.get('authName')=='新增') ?
              <Button data-action="add" type="primary" className={styles.operationButton} onClick={this.handleShowAddVideoModal}>
                新建
              </Button>:null
            }
          </div>
          <div className={styles.right}>
            <CourseFilterComponent pageType="publicPage"/>
            <Search style={{width: '260px'}} placeholder="请输入微课名称" value={this.state.searchStr} onChange={(e)=>{this.setState({searchStr:e.target.value})}} onSearch={this.handleSearchVideo}/>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.treeContainer}>
            <TreeComponent></TreeComponent>
          </div>
          <div className={styles.videoContainer}>
            <div className={styles.videoList}>
              {/* 微课列表 */}
              <Menu
                onClick={this.handleClickMenu}
                selectedKeys={[this.state.currentTab]}
                mode="horizontal"
                className={styles.menu}
              >
                <Menu.Item key="hot">
                  热门
                </Menu.Item>
                <Menu.Item key="recommend">
                  推荐
                </Menu.Item>
                <Menu.Item key="newest">
                  最新
                </Menu.Item>
              </Menu>
              <div className={styles.videoPanel}>
                {
                  data.get('result').map((item,index)=>{
                    let description = {};
                    description.grade = item.get('gradeName');
                    description.subject = item.get('subjectName');
                    description.chapter = item.get('textbookMenuCourse');
                    description.playNums = item.get('playCount');
                    description.collectNums = item.get('collectionCount');
                    description.school = item.get('schoolName');
                    description.teacher = 'teacher';
                    return <div key={index}>
                      <VideoComponent description={description} videoUrl={item.get('url')} coverUrl={item.get('coverUrl')} id={item.get('id')}></VideoComponent>
                    </div>
                  })
                }
              </div>
            </div>
            <div className={styles.videoPagination}>
              <span>当前条目 {data.get('start')} - {data.get('pageShow')*data.get('nowPage')} / 总条目 {data.get('totalCount')}</span>
              <div>
                <Pagination showQuickJumper defaultCurrent={data.get('nowPage')} total={data.get('totalCount')} pageSize={12} onChange={this.handlePageChanged} />
              </div>
            </div>
          </div>
        </div>
        {this.renderModal()}
      </div>
    )
  }
})

function mapStateToProps(state){
  return{
    menu:state.get('menu'),
    microCourse:state.get('microCourse')
  }
}

function mapDispatchToProps(dispatch){
  return {
    getTableData:bindActionCreators(getTableData,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(TeacherVideoPage))
