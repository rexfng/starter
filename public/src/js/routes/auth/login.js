var hb = require('../../helpers/handlebars_helpers.js')
var text = require('../../translation/en/auth/login.json')
var controller = require('../../controllers/auth/login.js')

var login = function(htmls){
	hb.loadTemplate({ url: "./src/views/auth/login.html", json: text})	
}
module.exports = login