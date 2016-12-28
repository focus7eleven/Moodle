import React from 'react'
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router'
import AppContainer from './containers/AppContainer'
import HelloKdotContainer from './containers/HelloKdotContainer'
import AnnouncementEditor from './containers/editor/AnnouncementEditor'
import BaseInfoContainer from './containers/BaseInfoContainer'
import NoticeManagerContainer from './containers/NoticeManagerContainer'

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={AppContainer}>
			<Route path="test">
				<Route path="editor" component={AnnouncementEditor}></Route>
			</Route>
			<IndexRedirect to='/base-info' />
			<Route path='/base-info' component={BaseInfoContainer} />
			<Route path='notice-mgr' component={NoticeManagerContainer} />
		</Route>
	</Router>
)

export default routes
