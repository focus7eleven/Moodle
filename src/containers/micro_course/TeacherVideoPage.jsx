import React from 'react'
import CourseFilterComponent from '../../components/course_filter/CourseFilterComponent'
import styles from './TeacherVideoPage.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getTableData} from '../../actions/micro_course/main'
import {Pagination,Menu,Input,Button} from 'antd'
import TreeComponent from '../../components/tree/TreeComponent'

const Search = Input.Search

const TeacherVideoPage = React.createClass({
  getInitialState(){
    return {
      searchStr:'',
      currentTab: "hot",
    }
  },

  handleSearchVideo(value){
    console.log(value);
  },

  handleClickMenu(e) {
    console.log('click ', e);
    this.setState({
      currentTab: e.key,
    });
  },

  handlePageChanged(pageNumber){
    console.log("page: ",pageNumber);
  },

  render(){
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div></div>
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
                  [1,2,3,4,5,6,7,8,9].map((item,index)=>{
                    return <div key={index}>video</div>
                  })
                }
              </div>
            </div>
            <div className={styles.videoPagination}>
              <span>当前条目 1-9 / 总条目 10</span>
              <div>
                <Pagination showQuickJumper defaultCurrent={1} total={21} pageSize={9} onChange={this.handlePageChanged} />
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(TeacherVideoPage)
