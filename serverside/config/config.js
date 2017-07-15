module.exports = {
	
	development: {
		db: 'mongodb://localhost/sagalina_development',
		AccessControlAllowMethods: "GET,PUT,POST,DELETE",
		allowedDomains: "*",
		port: 4210
	},
	testing: {
		db: 'mongodb://localhost/sagalina_test',
		AccessControlAllowMethods: "GET,PUT,POST,DELETE",
		allowedDomains: "*",
		port: 4220
	},
	production: {
		db: 'mongodb://localhost/sagalina',
		AccessControlAllowMethods: "GET,PUT,POST,DELETE",
		allowedDomains: "*",
		port: 4200
	}
}