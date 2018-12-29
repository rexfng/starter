jQuery(document).ready(function($){
	$('#app').on('click', "#confirmemail-view input", function(){
		history.pushState({}, "Home", "/")
		window.location.href = "/"
	})
})