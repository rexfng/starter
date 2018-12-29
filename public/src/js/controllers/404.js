jQuery(document).ready(function($){
	$('#app').on('click', "#not-found-view input", function(){
		history.pushState({}, "Home", "/")
		window.location.href = "/"
	})
})