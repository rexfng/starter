var modalTemplate = require('../../helpers/modals.js')
var auth = require('../../helpers/auth.js')

jQuery(document).ready(function($){
	$('#app').on('click', '#avatar', function(){
		$('.dropdown').toggleClass('hide')
	})
	$('#app').on('click', '#reset-password-btn', function(){
		modalTemplate('./src/views/_modals/reset-password.html', "Reset Password", function(destroyer){
			$('#app').on('click', '#reset-password-confirmed', function(){
				auth.is_authenticated(function(status, response){
					if (status) {
						auth.reset_password({email: response.name }, function(reset_response){
							if (reset_response) {
								destroyer()
							}else{
								console.log('failed to reset password')
							}
						})
					}
				})
			})
		})
	})
	$('#app').on('click', '#signout-btn', function(){
		auth.logout()
	})
})