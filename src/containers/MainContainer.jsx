import React from 'react'
import styles from './MainContainer.scss'
import {} from 'antd'
import Navigation from './navigation/Navigation'

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
        <div className={styles.workspace}>
          <div className={styles.mainPanel}>
            <div className={styles.header}>
              <div className={styles.teacherNum}>
                <span>{schoolInfo.studentNum}</span>
                <span>学生人数</span>
              </div>
              <div className={styles.teacherNum}>
                <span>{schoolInfo.teacherNum}</span>
                <span>教师人数</span>
              </div>
              <span className={styles.school}>{schoolInfo.schoolName}</span>
            </div>
            <div className={styles.body}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default MainContainer
