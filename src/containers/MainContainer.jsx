import React from 'react'
import styles from './MainContainer.scss'
import {Breadcrumb} from 'antd'
import Navigation from './navigation/Navigation'
import NavigationMini from './navigation/NavigationMini'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import schoolLogo from 'images/school.png'
import teacherLogo from 'images/teacher.png'
import studentLogo from 'images/student.png'
import {List} from 'immutable'
import {findPath} from '../reducer/menu'
const MainContainer = React.createClass({
  getInitialState(){
    return {
      currentPath:List()
    }
  },

  getDefaultProps(){
    return {
      schoolInfo: {
        schoolName: "连云港高中B",
        teacherNum: 45,
        studentNum: 750,
      }
    }
  },
  componentWillReceiveProps(nextProps){
    let menuUrl = nextProps.location.pathname.split('/').slice(-1)[0]
    let path = !nextProps.menu.get('data').isEmpty()?findPath(nextProps.menu.get('data'),menuUrl):List()
    this.setState({
      currentPath:path.map(v => v.get('resourceName'))
    })
  },
  render(){
    const {schoolInfo} = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.navigation}>
          <Navigation></Navigation>
        </div>
        <div className={styles.navigationMini}>
          <NavigationMini></NavigationMini>
        </div>
        {
          this.props.children ?
            <div className={styles.workspace}>
              <div className={styles.mainPanel}>
                <div className={styles.header}>
                  <Breadcrumb separator=">">
                    {
                      this.state.currentPath.map((item)=><Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)
                    }
                  </Breadcrumb>
                  <div className={styles.schooInfo}>
                    <span className={styles.school}><img src={schoolLogo}/>{schoolInfo.schoolName}</span>
                    <div className={styles.teacherNumContainer}>
                      <img src={teacherLogo} />
                      <div className={styles.teacherNum}>
                        <span>{schoolInfo.teacherNum}</span>
                        <span>教师人数</span>
                      </div>
                    </div>
                    <div className={styles.teacherNumContainer}>
                      <img src={studentLogo} />
                      <div className={styles.teacherNum}>
                        <span>{schoolInfo.studentNum}</span>
                        <span>学生人数</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.body}>
                  {this.props.children}
                </div>
              </div>
            </div>
            :
            null
          }
      </div>
    )
  }
})
function mapStateToProps(state) {
  return {
    menu:state.get('menu')
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(MainContainer)
