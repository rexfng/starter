jQuery(document).ready(function($){
	var formValues = {}
	$('#app').on('keyup', '#login-email',function(e){
		formValues.email = e.target.value
	})
	$('#app').on('keyup', '#login-password',function(e){
		formValues.password = e.target.value
	})
  	var count = 0;
	$('#app').on('click', '#email-submit',function(e){
	    count += 1;
	    if (count == 1) {
	    	$('.email-input').fadeIn()
	    	$('.f-control.social').fadeOut()
	    }
	    e.preventDefault()
	})
})