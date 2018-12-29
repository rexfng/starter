var db = require('../../helpers/db')
var modal = require('../../modal/db/users.json')
var users_network_actions = function(auth_response){
	db("/users?auth0_id=" + auth_response.sub, "GET", null, function(res){
		db_data = res.response[0].data
		_.each(modal.fields, function(mf){
			jQuery('input[name=' + mf.name + ']').val(db_data[mf.name])
			jQuery('#app').on('keyup', 'input[name=' + mf.name + ']', function(e){
				db_data[mf.name] = e.target.value
			})
		})
		jQuery('#app').on('click', '.save', function(){
			db('/users/' + res.response[0]._id, "PUT", db_data, function(res,status){
				alert('save!')
			})
		})
	})
}

module.exports = users_network_actions