import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {login} from '../actions/user'
import LoginContainer from '../containers/LoginContainer'

function mapStateToProps(state) {
	return {
		user: state.get('user'),
	}
}

function mapDispatchToProps(dispatch) {
	return {}
}

export const LoginControlHOC = (Component) => connect(mapStateToProps, mapDispatchToProps)(React.createClass({
	render() {
		const isAuth = this.props.user.get('auth')

		return isAuth?<Component {...this.props}></Component>:<LoginContainer {...this.props}></LoginContainer>
	},
}))
