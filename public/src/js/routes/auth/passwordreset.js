var hb = require('../../helpers/handlebars_helpers.js')
var text = require('../../translation/en/auth/passwordreset.json')
var controller = require('../../controllers/auth/passwordreset.js')
var passwordresetDOM = require('../../views/auth/passwordreset.html')

var passwordreset = function(htmls){
	hb.loadTemplate({ html: passwordresetDOM, json: text}, function(){}, function(){})	
}
module.exports = passwordreset