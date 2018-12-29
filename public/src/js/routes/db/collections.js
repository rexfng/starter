var hb = require('../../helpers/handlebars_helpers.js')
var text = require('../../translation/en/db/gets.json')
var controller = require('../../controllers/db/gets.js')
var nav_ui = require('../../controllers/nav/nav_ui.js')
var db = require('../../helpers/db')
var auth = require('../../helpers/auth')
var login_url = "https://churchofgodio.auth0.com/authorize?response_type=token&client_id=qAcVjoFyCAzPatzM282t4VpTWDcIF3Ae& connection=IO&redirect_uri=http://127.0.0.1:8000/authorize&scope=openid+profile"
var navDOM = require('../../views/nav.html')
var getsDOM = require('../../views/db/gets.html')

var collections = function(){
	auth.is_authenticated(function(result, response){
		if(result){
			db("/users", "GET", null, function(res){
				res = _.reject(_.map(res.response, function(r){
					return r.data
				}), _.isUndefined)
			})
			hb.loadTemplate([
				{ html: navDOM, json: {avatar: response.picture} },		
				{ html: getsDOM, json: {}}
			],function(){

			}, function(){
				controller()
			})	
		}else{
			console.log("not authenticated")
			location.href = login_url
		}
	})
}
module.exports = collections