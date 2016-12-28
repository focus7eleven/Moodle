import React from 'react'
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router'
import AppContainer from './containers/AppContainer'
import HelloKdotContainer from './containers/HelloKdotContainer'
import BaseInfoContainer from './containers/BaseInfoContainer'
import NoticeManagerContainer from './containers/NoticeManagerContainer'
import MainContainer from './containers/MainContainer'

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={AppContainer}>
			<Route path='index' component={MainContainer}>
				<Route path='base-info' component={BaseInfoContainer} />
				<Route path='notice-mgr' component={NoticeManagerContainer} />
			</Route>
		<Route path="test">
			<Route path="kdot" component={HelloKdotContainer}></Route>
		</Route>
		</Route>
	</Router>
)

export default routes
