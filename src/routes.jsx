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
import TeacherPage from './containers/base_info/teacher/TeacherPage'
import StudentPage from './containers/base_info/student/StudentPage'
import PatriarchPage from './containers/base_info/patriarch/PatriarchPage'
import RoleSettingPage from './containers/base_info/role_setting/RoleSettingPage'
import NormalGroupPage from './containers/base_info/normal_group/NormalGroupPage'
import MadeGroupPage from './containers/base_info/made_group/MadeGroupPage'
import DepartmentPage from './containers/base_info/department/DepartmentPage'
import SchoolDepartPage from './containers/base_info/school/SchoolDepartPage'
import ClassPage from './containers/base_info/class/ClassPage'
import AreaPage from './containers/base_info/area/AreaPage'
import SchoolPage from './containers/base_info/school/SchoolPage'

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
					<Route path='teacher' component={TeacherPage}></Route>
					<Route path='student' component={StudentPage}></Route>
					<Route path='patriarch' component={PatriarchPage}></Route>

					{/* 通用设置 */}
					<Route path='dict' component={DictPage}></Route>
					<Route path='resource' component={ResourceManagementPage}></Route>
					<Route path='role' component={RoleSettingPage}></Route>

					{/* 教育大纲 */}
					<Route path='textbook'>
						<IndexRoute component={EduOutlinePage}/>
					</Route>

					{/* 群组管理 */}
					<Route path='normalgroup' component={NormalGroupPage}></Route>
					<Route path='madegroup' component={MadeGroupPage}></Route>

					<Route path='cityDepartment' component={DepartmentPage}></Route>
					<Route path='area' component={AreaPage}></Route>
					<Route path='schoolDepart' component={SchoolDepartPage}></Route>
					<Route path='classes' component={ClassPage}></Route>
					<Route path='school' component={SchoolPage}></Route>
				</Route>
				{/*<Route path='notice_mgr' component={NoticeManagerContainer} />*/}
			</Route>
		</Route>
	</Router>
)

export default routes
