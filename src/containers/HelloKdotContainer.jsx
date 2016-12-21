import React from 'react'
import {connect} from 'react-redux'

const HelloKdotContainer = React.createClass({
	render(){
		return (
      <div>Hello kdot</div>
    )
	},
})

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloKdotContainer)
