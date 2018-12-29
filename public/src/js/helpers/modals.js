var loadModal = function(url, title, callback){
  jQuery.ajax({
    url: url, 
      cache: true,
      success: function(data) {
      	jQuery('#app').append(
      		"<div class='modal-wrapper'><div class='modal'>" + 
      			"<i id='close-modal' class='fa fa-times'></i>" +
      			"<h1>" + title + "</h1><div class='line'></div>" + 
      			data + "<div class='line'></div>" +
      		"</div></div>")
    }
  });
  	jQuery('#app').on('click', '#close-modal', function(){
  		destroyModal()
  	})
    var destroyModal = function(){
      jQuery('.modal-wrapper').remove()
      jQuery('.dropdown').toggleClass('hide')
    }
    callback(destroyModal)
}

module.exports = loadModal