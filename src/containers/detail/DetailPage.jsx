import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const DetailPage = React.createClass({
  render(){
    return (
      <div>
      dfdfd
      </div>
    )
  }
})

function mapStateToProps(state){
  return{
    menu:state.get('menu'),
    detail:state.get('detail')
  }
}
function mapDispatchToProps(dispatch){
  return {
    // getTableData:bindActionCreators(getTableData,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailPage)
