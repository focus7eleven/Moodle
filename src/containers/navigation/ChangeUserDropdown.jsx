import React from 'react'
import {Icon,Modal,Select} from 'antd'
import styles from './ChangeUserDropdown.scss'
import {logout} from '../../actions/user'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
const Option = Select.Option

const ChangeUserDropDown = React.createClass({
  contextTypes:{
    router: React.PropTypes.object,
  },

  getInitialState(){
    return ({
      showRoleChange:false
    })
  },
  componentDidMount(){
    window.addEventListener('click',this.handleWindowEvent1)
  },
  componentWillUnmount(){
    window.removeEventListener('click',this.handleWindowEvent1)
  },
  componentDidUpdate(prevProps, prevState){
    if(this.state.showRoleChange){
      //对话框打开
      window.removeEventListener('click',this.handleWindowEvent1)
    }else{
      //对话框关闭
      window.addEventListener('click',this.handleWindowEvent1)
    }
  },
  handleWindowEvent1(){
    this.props.onClose()
  },
  handleChangeRole(){
    this.setState({
      showRoleChange:true
    })
  },
  handleCancelRoleChange(){
    this.setState({
      showRoleChange:false
    })
  },
  handleConfirmRoleChange(){
    this.setState({
      showRoleChange:false
    })
  },
  handleLogout(){
    this.props.logout();
    this.context.router.push(`/login`);
  },
  render(){
    return (
      <div className={styles.changeUser} onClick={(e)=>{e.stopPropagation()}}>
        <div className={styles.avatar}><img src = 'https://unsplash.it/25/25'/></div>
        <div className={styles.name}>曹老师</div>
        <div className={styles.division}></div>
        <div className={styles.menuList}>
          <div className={styles.item}><Icon type="user" />个人资料</div>
          <div className={styles.item}><Icon type="lock" />修改密码</div>
          <div className={styles.item} onClick={this.handleChangeRole}><Icon type="retweet" />更换角色</div>
          <div className={styles.item} onClick={this.handleLogout}><Icon type="logout" />退出</div>
        </div>
        <Modal wrapClassName={styles.modalWrapper} title='角色切换' visible={this.state.showRoleChange}
          onOk={this.handleConfirmRoleChange} onCancel={this.handleCancelRoleChange}
          width={300}
        >
        <div className={styles.roleChangeContent}>
          <div className={styles.selsctWrapper}><span>角色：</span><Select size="large" defaultValue="jack" style={{ width: 200 }}>
            <Option value="jack">学校任课老师</Option>
            <Option value="lucy">学校管理员</Option>
            <Option value="disabled">教育局局长</Option>
          </Select>
          </div>
        </div>
        </Modal>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch){
  return {
    logout:bindActionCreators(logout,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangeUserDropDown)
