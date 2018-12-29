var pather = require("../helpers/pather")
var Pather = pather([
	{ pattern: "/", title: "Home", render: require("./users/profile.js") },
	// { pattern: "/login", title: "Login", render: require("./auth/login.js") },
	{ pattern: "/register", title: "Register", render: require("./auth/register.js") },
	{ pattern: "/passwordreset", title: "Reset Password", render: require("./auth/passwordreset.js") },
	{ pattern: "/confirmemail", title: "Confirm Email", render: require("./auth/confirmemail.js") },
	{ pattern: "/authorize", title: "Authroize", render: require("./auth/authorize.js") },
	{ pattern: "/db", title: "Database", render: require("./db/collections.js") },
	{ pattern: "/db/edit/:collections", title: "Profile", render: require("./users/profile.js") },
	{ pattern: "/db/:collections", title: "Collection", render: require("./db/gets.js") },
	{ pattern: "/profile", title: "Profile", render: require("./users/profile.js") }
])
var _404 = require('../views/404.html')
var loadingDOM = require('../views/loading.html')
window['_schema'] = {
	users: require('../modal/db/users.json')
}
window['_templates'] = {
	nav: require('../views/nav.html'),
	db: {
		db: require('../views/db/db.html'),
		table: {
			th: require('../views/db/table/th.html'),
			td: require('../views/db/table/td.html'),
			filter: require('../views/db/table/filter.html')
		}
	}
}
var routes = function(){
	window['_path'] = Pather
	if(Pather.is_matched){
		Pather.data.render()
	}else{
		require('./404.js')(_404)
	}
}
module.exports = routes