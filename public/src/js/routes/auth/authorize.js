// var controller = require('../../controllers/auth/authorize.js')
var db = require('../../helpers/db')
var hash = require('../../helpers/hash.js')
var cookie = require('../../helpers/cookie')
var hashString = hash(location.hash).access_token
var hb = require('../../helpers/handlebars_helpers.js')
var loadingDOM = require('../../views/loading.html')

var authorize = function(){
	hb.loadTemplate([
		{ html: loadingDOM, json: {title: "", subtitle: "authorizing"} }
	], function(){

	},
	function(){

	})	
	cookie.set('token', hashString, 1/48)
	history.pushState("", document.title, window.location.pathname + window.location.search);
	jQuery.ajax({
		"url": "https://churchofgodio.auth0.com/userinfo",
		"method": "GET",
		"headers": {
			"Authorization": "Bearer " + cookie.get('token'),
		    "content-type": "application/json"
		 }
	}).always(function(response){
		obj = {}
		obj.auth0_id = response.sub
		obj.email = response.name
		obj.avatar = response.picture
		db("/users?email=" + obj.email, "GET", null, function(res){
			console.log('done checking /user?email=')
			if(_.isEmpty(res.response)){
				db("/users", "POST", obj, function(create_user){
					window.location.href = "/"
				})
			}else{
				window.location.href = "/"
			}			
		})
	})
}
module.exports = authorize