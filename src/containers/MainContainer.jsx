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

const MainContainer = React.createClass({
  getInitialState(){
    return {}
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
                      this.props.currentPath.map((item)=><Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)
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
    currentPath: state.get('workspace').get('currentPath'),
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(MainContainer)
