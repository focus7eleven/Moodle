import React from 'react'
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router'
import AppContainer from './containers/AppContainer'
import AnnouncementEditor from './containers/editor/AnnouncementEditor'
import BaseInfoContainer from './containers/base_info/BaseInfoContainer'
import MainContainer from './containers/MainContainer'
import Navigation from './containers/navigation/Navigation'
import NavigationMini from './containers/navigation/NavigationMini'
import EduOutlinePage from './containers/base_info/edu_outline/EduOutline'
import LoginContainer from './containers/LoginContainer'
import Filter from './components/Filter'
import PhasePage from './containers/base_info/phase/PhasePage'
import GradePage from './containers/base_info/grade/GradePage'
import SubjectPage from './containers/base_info/subject/SubjectPage'
import {LoginControlHOC} from './enhancers/AccessControlContainer'
import DictPage from './containers/base_info/dict/DictPage'
import ResourceManagementPage from './containers/base_info/resource_management/ResourceManagementPage'
import OfficerPage from './containers/base_info/officer/OfficerPage'
import RoleSettingPage from './containers/base_info/role_setting/RoleSettingPage'

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={AppContainer}>
			<Route path="test">
				<Route path="editor" component={AnnouncementEditor}></Route>
				<Route path='navigation' component={Navigation}></Route>
				<Route path='navigation-mini' component={NavigationMini}></Route>
				<Route path='edu-outline' component={EduOutlinePage}></Route>
				<Route path='filter' component={Filter}></Route>
			</Route>
			<Route path='login' component={LoginContainer}></Route>
			<Route path='index' component={LoginControlHOC(MainContainer)}>
				<IndexRedirect to='base-info/phase' component={PhasePage} />
				<Route path='base-info' component={BaseInfoContainer}>
					<IndexRedirect to='phase'/>

					{/* 基础数据 */}
					<Route path='phase' component={PhasePage}></Route>
					<Route path='grade' component={GradePage}></Route>
					<Route path='subject' component={SubjectPage}></Route>

					{/* 人员管理 */}
					<Route path='officer' component={OfficerPage}></Route>

					{/* 通用设置 */}
					<Route path='dict' component={DictPage}></Route>
					<Route path='resource' component={ResourceManagementPage}></Route>
					<Route path='role' component={RoleSettingPage}></Route>

					<Route path='schoolDepart' component={Navigation}></Route>

					{/* 教育大纲 */}
					<Route path='textbook'>
						<IndexRoute component={EduOutlinePage}/>
					</Route>
				</Route>
				{/*<Route path='notice_mgr' component={NoticeManagerContainer} />*/}
			</Route>
		</Route>
	</Router>
)

export default routes
