var hb = require('../../helpers/handlebars_helpers.js')
var text = require('../../translation/en/auth/register.json')
var controller = require('../../controllers/auth/register.js')
var registerDOM = require("../../views/auth/register.html")

var register = function(html){
	hb.loadTemplate({ html: registerDOM, json: text}, function(){

	}, function(){
		
	})	
}
module.exports = register