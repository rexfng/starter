var hb = require('../../helpers/handlebars_helpers.js')
var users = require('../../modal/db/users.json')
var nav_ui = require('../../controllers/nav/nav_ui.js')
var db = require('../../helpers/db')
var auth = require('../../helpers/auth')
var formBuilder = require('../../helpers/formBuilder');
// var controller = require('../../controllers/db/post.js')
var login_url = "https://churchofgodio.auth0.com/authorize?response_type=token&client_id=qAcVjoFyCAzPatzM282t4VpTWDcIF3Ae& connection=IO&redirect_uri=http://127.0.0.1:8000/authorize&scope=openid+profile"
var dl = require('../../helpers/dom_listener')

jQuery('#app').on('error', '#abc', function(){
	jQuery('#abc').remove()
	alert('now!')
})	
var post = function(htmls){
	auth.is_authenticated(function(result, response){
		if(result){
			// db("/users", "GET", null, function(res){
			// 	res = _.reject(_.map(res.response, function(r){
			// 		return r.data
			// 	}), _.isUndefined)
			// })

			hb.loadTemplate([
				{ url: "./src/views/nav.html", json: {avatar: response.picture} },		
				{ url: "./src/views/db/post.html", json: {} }
			], function(){
	
			},
			function(){
				formBuilder(users)
			})	
		}else{
			location.href = login_url
		}
	})
}
module.exports = post