var hb = {
	loadTemplate: function(args, load, finish){
	  load()
	  _.isArray(args) ? args = args : args = [args]
	  jQuery('#app').html('') 
	  _.each(args, function(arg, i){
	  	var template = Handlebars.compile(arg.html)
      	jQuery('#app').append(template(arg.json))
      	if (args.length == i + 1) {
      		finish()
      	}	  	
	  })
	},
	createTemplate: function(path, json, callback){
	  jQuery.ajax({
	    url: path, 
	      cache: true,
	      success: function(data) {
	      	template = Handlebars.compile(data)
	      	callback(template(json))
	    }
	  });
	}
}

module.exports = hb