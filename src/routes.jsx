import React from 'react'
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router'
import AppContainer from './containers/AppContainer'
import AnnouncementEditor from './containers/editor/AnnouncementEditor'
import BaseInfoContainer from './containers/BaseInfoContainer'
import NoticeManagerContainer from './containers/NoticeManagerContainer'
import MainContainer from './containers/MainContainer'


import Naviagtion from './containers/Navigation'

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={AppContainer}>
			<Route path="test">
				<Route path="editor" component={AnnouncementEditor}></Route>
				<Route path='navigation' component={Naviagtion}></Route>
			</Route>
			<Route path='index' component={MainContainer}>
				<Route path='base-info' component={BaseInfoContainer} />
				<Route path='notice-mgr' component={NoticeManagerContainer} />
			</Route>
		</Route>
	</Router>
)

export default routes
