let search_members = function(){
	$('#app').on('keyup', '#search input', function(e){
		console.log(e.target.value)
	})	
}

module.exports = search_members
