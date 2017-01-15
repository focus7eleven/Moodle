import _ from 'underscore'

const baseURL = "http://139.224.194.45:8080"

// App config the for development and deployment environment.
const isProduction = process.env.NODE_ENV === "production"

const config = _.extend({
	// common config
	debug: !isProduction,
},{
	// dev config
	api:{
		key:{
			get:`${baseURL}/key`
		},
		resource:{
			tree:{
				get:`${baseURL}/resource/tree`
			},
			list:{
				get:(roleId)=>`${baseURL}/role/resource/list?roleId=${roleId}`
			},
			set:{
				update:`${baseURL}/role/resource/set`
			}
		},
		select:{
			json:{
				get:(selectid,selectname,table,selectstyle,selectcompareid)=>`${baseURL}/select.json?selectid=${selectid}&selectname=${selectname}&table=${table}&selectstyle=${selectstyle}&selectcompareid=${selectcompareid}`
			},
			change:{
				update:`${baseURL}/select/change`
			}
		},
		user:{
			login:{
				post:`${baseURL}/LoginWithToken`
			},
			logout:{
				post:`${baseURL}/account/logout`
			}
		},
		menu:{
			get:`${baseURL}/getMenuWithTreeFormat`
		},
		workspace:{
			baseInfo:{
				baseData:{
					get:(type,currentPage,pageShow,search) => `${baseURL}/${type}/page?currentPage=${currentPage}&search=${search}&pageShow=${pageShow}`
				}
			}
		},
		phase:{
			post:`${baseURL}/phase/add`,
			update:`${baseURL}/phase/edit`,
			phaseList:{
				get:`${baseURL}/phase/phaseList`,
			},
			subjectList:{
				get:(phaseCode)=>`${baseURL}/phase/subject?phaseCode=${phaseCode}`,
				update:`${baseURL}/phase/subject/set`
			}
		},
		subject:{
			post: `${baseURL}/subject/add`,
			update: `${baseURL}/subject/edit`,
			subjectList:{
				get:`${baseURL}/subject/list`
			}
		},
		grade:{
			post:`${baseURL}/grade/add`,
			update:`${baseURL}/grade/edit`,
		},
		dict:{
			post:`${baseURL}/dict/add`,
			update:`${baseURL}/dict/edit`,
		},
		role:{
			desc:{update:`${baseURL}/memo/update`},
			post:`${baseURL}/role/add`,
			update:`${baseURL}/role/edit`
		},
		textbook:{
			post:`${baseURL}/textbook/add`,
			update:`${baseURL}/textbook/edit`,
			search:{
				get:(searchStr,currentPage,phaseId,gradeId,subjectId)=>`${baseURL}/textbook/page?search=${searchStr}&currentPage=${currentPage}&phaseId=${phaseId}&gradeId=${gradeId}&subjectId=${subjectId}`
			},
			menulist:{
				get:(textbookId)=>`${baseURL}/textbook/menulist.json?textbook_id=${textbookId}`,
				delete:`${baseURL}/textbook/menudel`,
			}
		},
		resource: {
			getAllResources: `${baseURL}/resource/list`,
			// form data {jsonStr:"",resourceId:""}
			updateAuth: `${baseURL}/resource/updateauth`,
			// form data {*resourceName,resourceUrl,resourceDesc,parentId,logo,resourceOrder,authList}
			addResource: `${baseURL}/resource/add`,
			editResource: `${baseURL}/resource/add`,
		}
	}
})

export default config
