import React from 'react'
import {connect} from 'react-redux'
import config from '../config'

const AppContainer = React.createClass({
	render(){
		return this.props.children
	},
})

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
