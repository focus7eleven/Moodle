import React from 'react'
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router'
import AppContainer from './containers/AppContainer'
import AnnouncementEditor from './containers/editor/AnnouncementEditor'
import BaseInfoContainer from './containers/base_info/BaseInfoContainer'
import MainContainer from './containers/MainContainer'
import Navigation from './containers/navigation/Navigation'

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={AppContainer}>
			<Route path="test">
				<Route path="editor" component={AnnouncementEditor}></Route>
				<Route path='navigation' component={Navigation}></Route>
			</Route>
			<Route path='index' component={MainContainer}>
				<Route path="base-info">
					<Route path='phase' component={BaseInfoContainer} />
					<Route path='grade' component={BaseInfoContainer} />
					<Route path='subject' component={BaseInfoContainer} />
				</Route>
			</Route>
		</Route>
	</Router>
)

export default routes
