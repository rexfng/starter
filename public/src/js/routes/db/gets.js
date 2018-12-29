var hb = require('../../helpers/handlebars_helpers.js')
var text = require('../../translation/en/db/gets.json')
var controller = require('../../controllers/db/gets.js')
var nav_ui = require('../../controllers/nav/nav_ui.js')
var db = require('../../helpers/db')
var auth = require('../../helpers/auth')
var login_url = "https://churchofgodio.auth0.com/authorize?response_type=token&client_id=qAcVjoFyCAzPatzM282t4VpTWDcIF3Ae& connection=IO&redirect_uri=http://127.0.0.1:8000/authorize&scope=openid+profile"

var gets = function(){
	auth.is_authenticated(function(result, response){
		if(result){
			hb.loadTemplate([
				{ html: window['_templates'].nav, json: {avatar: response.picture} },		
				{ html: window['_templates'].db.db, json: {collection: _.filter(window['_path'].data.params, {type: "params", term: ":collections"})[0].value.split('_').join(' ')}}
			],function(){

			}, function(){
				controller()
				if(!_.isEmpty(_.filter(window['_path'].data.params, {type: "params"}))){
					var collectionName = (_.filter(window['_path'].data.params, {type: "params", term: ":collections"})[0].value)
					filter = Handlebars.compile(window['_templates'].db.table.filter)
					filterDOM = _.map(window['_schema'][collectionName].fields, function(fd){
						return filter(fd)
					}).join('')
					filterArr = [
						{ name: '_id', label: 'ID' },
						{ name: 'createdAt', label: 'Created At' },
						{ name: 'updatedAt', label: 'Updated At' }
					]
					var metaFilter = _.map(filterArr, function(fa){
						return "<div class='filter'><label for='checkbox-" + fa.name + "'>" + fa.label + "</label><input id='checkbox-" + fa.name + "' type='checkbox' name='filter' value='" + fa.name + "'></div>"
					}).join('')
					th = Handlebars.compile(window['_templates'].db.table.th)
					var meta_header = '<th></th><th style="display:none;" class="header _id">_id</th>' +
					'<th class="header createdAt" style="display:none;" >Created At</th>' +
					'<th class="header updatedAt" style="display:none;" >Updated At</th>'
					thDOM = "<tr style='order: -1'>" + meta_header + _.map(window['_schema'][collectionName].fields, function(s){
						return th(s)
					}).join('') + "</tr>"
					jQuery('#db table').append(thDOM)
					jQuery('#filters').append(metaFilter + filterDOM)
					var numberOfChecked = jQuery('#filters input:checkbox:checked').length;
					var totalCheckboxes = jQuery('#filters input:checkbox').length;
					jQuery('th').css('width', (1 / totalCheckboxes) * jQuery('table').width() + "px")
					db("/" + collectionName + "?", "GET", null, function(res){
						td = Handlebars.compile(window['_templates'].db.table.td)
						data = _.map(res.response, function(d){
							return Object.assign.apply(Object, _.map(window['_schema'][collectionName].fields, function(f){
								_.isEmpty(d.data) ? v = "" : v = d.data[f.name]
								_.isEmpty(v) ? v = "" : v = v
								obj = {}
								obj._id = d._id
								obj.createdAt = d.createdAt
								obj.updatedAt = d.updatedAt
								obj[f.name] = v
								return obj
							}))
						})
						tdDOM = _.map(data, function(d){
							a = []
							a.push("<td class='admin-actions data'><a href='/db/users/" + d._id + "'><i class='fa fa-edit'></i></a></td>")
							
							for (var k in d) {
								a.push(td({"name": k, "label":d[k]}))
							}
							return "<tr class='data-row' id='" + d._id + "'>" + a.join("") + "</tr>"
						}).join("")
						jQuery('#db table').append(tdDOM)
						jQuery('td').css('width', (1 / totalCheckboxes) * jQuery('table').width() + "px")

						function resizeCell(){
							var numberOfChecked = jQuery('#filters input:checkbox:checked').length;
							var totalCheckboxes = jQuery('#filters input:checkbox').length;
							jQuery('th').css('width', (1 / totalCheckboxes) * jQuery('table').width() + "px")
							jQuery('td').css('width', (1 / totalCheckboxes) * jQuery('table').width() + "px")							
						}
						resizeCell()

						jQuery('#app').on('click', 'th.header', function(){
							jQuery(this).hasClass('asc') ? order = 'asc' : order = 'desc'
							sortedData = _.orderBy(data, jQuery(this).attr('id'), order)
							_.each(sortedData, function(sd, i){
								jQuery('#' + sd._id).css('order', i + "")
							})
							jQuery(this).toggleClass('asc')
						})
						jQuery('._id').hide()
						jQuery('.createdAt').hide()
						jQuery('.updatedAt').hide()

						jQuery('#app').on('change', '#filters :checkbox', function(){
							resizeCell()
							if(this.checked){
								className = jQuery(this).attr('value')
								console.log("." + className)
								jQuery("." + className).show()
							// }
							}else{
								jQuery("." + className).hide()
							}
						})
						jQuery('#app').on('keyup', '.search input', function(e){
						var collectionName = (_.filter(window['_path'].data.params, {type: "params", term: ":collections"})[0].value)
							q = "?_q=" + e.target.value + "&_in=" + window['_schema'][collectionName].searchable_fields.join('+')
							db("/" + collectionName + q, "GET", null, function(res){
								data = _.map(res.response, function(d){
									return Object.assign.apply(Object, _.map(window['_schema'][collectionName].fields, function(f){
										_.isEmpty(d.data) ? v = "" : v = d.data[f.name]
										_.isEmpty(v) ? v = "" : v = v
										obj = {}
										obj._id = d._id
										obj.createdAt = d.createdAt
										obj.updatedAt = d.updatedAt
										obj[f.name] = v
										return obj
									}))
								})
								tdDOM = _.map(data, function(d){
									a = []
									a.push("<td class='admin-actions data'><a href='/db/users/" + d._id + "'><i class='fa fa-edit'></i></a></td>")
									for (var k in d) {
										a.push(td({"name": k, "label":d[k]}))
									}
									return "<tr class='data-row'id='" + d._id + "'>" + a.join("") + "</tr>"
								}).join("")
								jQuery('#db table .data-row').remove()
								jQuery('#db table').append(tdDOM)
								jQuery('._id').hide()
								jQuery('.createdAt').hide()
								jQuery('.updatedAt').hide()
							})
						})
						//hide show column
					})
				}
			})	
		}else{
			console.log("not authenticated")
			location.href = login_url
		}
	})
}
module.exports = gets