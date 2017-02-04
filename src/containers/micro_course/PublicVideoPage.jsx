import React from 'react'
import TableComponent from '../../components/table/TableComponent'
import styles from './PublicVideoPage.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getTableData} from '../../actions/micro_course/main'
import {Menu,Input,Button} from 'antd'

const Search = Input.Search

const PublicVideoPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

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

  render(){
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {/* <CourseFilterComponent pageType="publicPage"/> */}
          <div></div>
          <Search style={{width: '260px'}} placeholder="请输入微课名称" value={this.state.searchStr} onChange={(e)=>{this.setState({searchStr:e.target.value})}} onSearch={this.handleSearchVideo}/>
        </div>
        <div className={styles.body}>
          <div className={styles.treeContainer}>
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

export default connect(mapStateToProps,mapDispatchToProps)(PublicVideoPage)
