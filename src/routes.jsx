import React from 'react'
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router'
import AppContainer from './containers/AppContainer'
import AnnouncementEditor from './containers/editor/AnnouncementEditor'
import BaseInfoContainer from './containers/base_info/BaseInfoContainer'
import MainContainer from './containers/MainContainer'
import Navigation from './containers/navigation/Navigation'
import NavigationMini from './containers/navigation/NavigationMini'
import EduOutline from './containers/edu_outline/EduOutline'
import LoginContainer from './containers/LoginContainer'
import Filter from './components/Filter'
import {LoginControlHOC} from './enhancers/AccessControlContainer'

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={AppContainer}>
			<Route path="test">
				<Route path="editor" component={AnnouncementEditor}></Route>
				<Route path='navigation' component={Navigation}></Route>
				<Route path='navigation-mini' component={NavigationMini}></Route>
				<Route path='edu-outline' component={EduOutline}></Route>
				<Route path='filter' component={Filter}></Route>
			</Route>
			<Route path='login' component={LoginContainer}></Route>
			<Route path='index' component={LoginControlHOC(MainContainer)}>
				<Route path='base-info'>
					<Route path='schoolDepart' component={Navigation}></Route>
					<Route path='textbook'>
						<IndexRoute component={EduOutline}/>
					</Route>
					<Route path='(:type)' component={BaseInfoContainer}></Route>
				</Route>
				{/*<Route path='notice_mgr' component={NoticeManagerContainer} />*/}
			</Route>
		</Route>
	</Router>
)

export default routes
