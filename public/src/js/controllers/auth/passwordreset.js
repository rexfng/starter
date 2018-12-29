var auth = require('../../helpers/auth.js')

jQuery(document).ready(function($){
	var formValues = {}
	$('#app').on('keyup', '#passwordreset-email',function(e){
		formValues.email = e.target.value
	})

	$('#app').on('click', '#passwordreset-submit',function(e){
		e.preventDefault()
		auth.reset_password(formValues, function(success){
			if(success){
				console.log('succeeded to reset password.')
				history.pushState({}, "Confirm Email", "/confirmemail")
				window.location.href = "/confirmemail"				
			}else{
				console.log('failed to reset password.')
			}
		})
	})
})