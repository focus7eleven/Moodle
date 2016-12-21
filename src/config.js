import _ from 'underscore'

const baseURL = "http://"

// App config the for development and deployment environment.
const isProduction = process.env.NODE_ENV === "production"

const config = _.extend({
	// common config
	debug: !isProduction,
},{
	// dev config
})

export default config
