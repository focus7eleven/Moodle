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
		}
	}
})

export default config
