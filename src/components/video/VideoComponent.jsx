import React,{PropTypes} from 'react'
import styles from './VideoComponent.scss'
import {Tag} from 'antd'
import plyr from 'plyr'
import 'plyr/dist/plyr.css'

const mockURL = 'https://cdn.selz.com/plyr/1.5/View_From_A_Blue_Moon_Trailer-HD.mp4'
const VideoComponent = React.createClass({
  propTypes:{
    tag:PropTypes.shape({
      color:PropTypes.string,
    }),//标签的颜色和文字内容
    description:PropTypes.shape({
      grade:PropTypes.string,
      subject:PropTypes.string,
      charpter:PropTypes.string,//章节
      playNums:PropTypes.number,//播放次数
      collectNums:PropTypes.number,//收藏次数,
      school:PropTypes.string,
      teacher:PropTypes.string,
    }),//视频的描述信息
    videoUrl:PropTypes.string,
    coverUrl:PropTypes.string,
    id:PropTypes.string,
  },
  getDefaultProps(){
    return {
      tag:{
        color:'#8494C8',
      },
      description:{
        grade:'七年级',
        subject:'物理',
        charpter:'分子结构',
        playNums:100,
        collectNums:74,
        school:'光明小学',
        teacher:'张老师',
      },
      videoUrl:mockURL,
      coverUrl:'https://unsplash.it/260/142',
      id:'1',
    }
  },
  componentDidMount(){
  },
  handlePlay(){
    console.log("this",this.refs.player)
    if(this._played){
      this._played = false
      this.refs.player.pause()
    }else{
      this._played = true
      this.refs.player.play()
    }
  },
  render(){
    return(
      <div className={styles.videoComponent}>
        <div className={styles.videoContainer} onClick={this.handlePlay}>
          <Tag className={styles.tag} color={this.props.tag.color}>{this.props.description.grade}|{this.props.description.subject}</Tag>
          <video ref="player" poster={this.props.coverUrl} className={styles.microVideo} id={this.props.id}>
            <source src={this.props.videoUrl} type="video/mp4"/>
          </video>
          <div className={styles.mask}>
            <span>{this.props.description.school}</span>
            <span>{this.props.description.teacher}</span>
          </div>
        </div>
        <div className={styles.description}>
          <div>
            <span>{this.props.description.grade}</span>
            <span>{this.props.description.subject}</span>
            <span>{this.props.description.charpter}</span>
          </div>
          <div className={styles.line}></div>
          <div>
            <span>播放:{this.props.description.playNums}</span>
            <span>{this.props.description.collectNums}人收藏</span>
          </div>
        </div>
      </div>
    )
  }
})

export default VideoComponent
