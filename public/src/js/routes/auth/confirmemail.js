var hb = require('../../helpers/handlebars_helpers.js')
var text = require('../../translation/en/auth/confirmemail.json')
var controller = require('../../controllers/auth/confirmemail.js')
var confirmemailDOM = require('../../views/auth/confirmemail.html')

var confirmemail = function(htmls){
	hb.loadTemplate({ html: confirmemailDOM, json: text}, function(){}, function(){})	
}
module.exports = confirmemail