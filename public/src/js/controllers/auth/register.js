jQuery(document).ready(function($){	
	var formValues = {}
	$('#app').on('keyup', '#register-email',function(e){
		formValues.email = e.target.value
	})
	$('#app').on('keyup', '#register-password',function(e){
		formValues.password = e.target.value
	})
	$('#app').on('click', '#register-submit',function(e){
		e.preventDefault()
		$.ajax({
		  type: "POST",
		  url: "https://churchofgodio.auth0.com/dbconnections/signup",
		  data: {
			"email": formValues.email,
			"password": formValues.password,
			"connection":"IO"  	
		  },
		  dataType: "json"
		}).always(function(e){
			if (_.has(e, 'responseJSON')) {
				switch(e.responseJSON.code){
					case "user_exists":
						console.log('user_exists')
						return;
					default:
						console.log('catch all')
						return
				}
			}else{
				console.log('created new user: ', e)
				history.pushState({}, "Confirm Email", "/confirmemail")
				window.location.href = "/confirmemail"
			}
		})
	})
})