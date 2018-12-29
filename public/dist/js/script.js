jQuery(document).ready(function($){
	jQuery('.delete').on('click', function(){
		let id = $(this).data('id')
		if (confirm("Are you sure you want to delete this member?")) {
			$.ajax({
			    url: '/member/' + id,
			    type: 'DELETE',
			    success: function(result) {
					$("#" + id).fadeOut()
			    }
			});
		}
	})
	jQuery('.create').on('click', function(){
		$.ajax({
		    url: '/members',
		    type: 'POST',
		    success: function(result) {
				location.reload()
		    }
		});
	})
	var searchBox = new google.maps.places.SearchBox(document.getElementById('input_address'));
})

