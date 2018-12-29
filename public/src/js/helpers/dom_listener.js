var dom_listener = {
	marker: function(src, id){
		img = document.createElement('img')
		img.src = null
		img.id = id
		src.appendChild(img)
	},
	listener: function(id, callback){
		jQuery('#app').on("error", id, callback());
	    jQuery(id).remove();
	}
	
}

module.exports = dom_listener