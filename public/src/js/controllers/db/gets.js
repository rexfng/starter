var db = require('../../helpers/db')
var gets = function(){
	jQuery('#app').on('click', '#add-new-member-btn', function(){
		history.pushState({}, "Member Details", "/members-post")
		window.location.href = "/members-post"		
	})
	jQuery('#app').on('click', '#filter-btn', function(){
		jQuery('#filters').toggleClass('inactive')
	})
}

module.exports = gets