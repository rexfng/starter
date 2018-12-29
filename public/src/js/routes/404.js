var hb = require('../helpers/handlebars_helpers.js')
var text = require('../translation/en/404.json')
var controller = require('../controllers/404.js')

var _404 = function(html){
	hb.loadTemplate({ html: html, json: text},
		function(){

		},
		function(){
		}
	)
}
module.exports = _404