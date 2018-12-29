var hb = require('../../helpers/handlebars_helpers.js')
var users_json = require('../../modal/db/users.json')
var nav_ui = require('../../controllers/nav/nav_ui.js')
var auth = require('../../helpers/auth')
var formBuilder = require('../../helpers/formBuilder');
var loadScript = require('../../helpers/loadscript.js')
var autoPopulateDataFromMongoDBOntoFormBuilder = require('../../controllers/users/profile.js')
var login_url = "https://churchofgodio.auth0.com/authorize?response_type=token&client_id=qAcVjoFyCAzPatzM282t4VpTWDcIF3Ae& connection=IO&redirect_uri=http://127.0.0.1:8000/authorize&scope=openid+profile"
var navDOM = require('../../views/nav.html')
var profileDOM = require('../../views/db/post.html')

var users = function(htmls){
	auth.is_authenticated(function(result, response){
		if(result){
			loadScript("https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAGuQURJoOYE48jJaNg0TI8HKth2lmSbbA", function(status){
				hb.loadTemplate([
					{ html: navDOM, json: {avatar: response.picture} },		
					{ html: profileDOM, json: {} }
				], function(){
					
				},
				function(){
					formBuilder(users_json)
					autoPopulateDataFromMongoDBOntoFormBuilder(response)
				})	
			})
		}else{
			location.href = login_url
		}
	})
}
module.exports = users