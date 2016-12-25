import React from 'react'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import AppContainer from './containers/AppContainer'
import HelloKdotContainer from './containers/HelloKdotContainer'
import AnnouncementEditor from './containers/editor/AnnouncementEditor'

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={AppContainer}>
			<Route path="test">
				<Route path="kdot" component={HelloKdotContainer}></Route>
				<Route path="editor" component={AnnouncementEditor}></Route>
			</Route>
		</Route>
	</Router>
)

export default routes
