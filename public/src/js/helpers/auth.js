var cookie = require('./cookie')

var auth = {
	is_authenticated: function(callback){
		if(!_.isEmpty(cookie.get('token'))){
			jQuery.ajax({
				"url": "https://churchofgodio.auth0.com/userinfo",
				"method": "GET",
				"headers": {
					"Authorization": "Bearer " + cookie.get('token'),
				    "content-type": "application/json"
				 }
			}).always(function(response, status){
				if(status == "error"){
					// Cookies.set('auth0_token', '')
					callback(false, response)
				}else{
					callback(true, response)
				}
			})		
		}else{
			callback(false, {})
		}
	},
	reset_password: function(current_user, callback){
		jQuery.ajax({
			"url": "https://churchofgodio.auth0.com/dbconnections/change_password",
			"method": "POST",
			"headers": {
			    "content-type": "application/json"
			 },
			 data: JSON.stringify({
				"client_id":"",
				"email": current_user.email,
				"connection":"IO"
			 })
		}).always(function(response, status){
			if(status == "error"){
				callback(false)
			}else{
				callback(true)
			}
		})				
	},
	logout: function(callback){
		cookie.delete('token')
		window.location.replace("https://churchofgodio.auth0.com/v2/logout?returnTo=http://localhost:3000&client_id=qAcVjoFyCAzPatzM282t4VpTWDcIF3Ae")
	}
}

module.exports = auth