var hb = require('../handlebars_helpers')

var formBuilder = function(data){
	var title = "<h1>" + data.title + "</h1>"
	var buttons = "<header><h1>" + data.collection + "</h1><div class='btns-" + data.slug + "'><button class='cancel'>Cancel</button><button class='save'>Save</button></div></header>"
	var data = _.map(data.fields, function(u,i){
		return  Object.assign(u, {uid: data.slug + "_" + i, id: i + ""})
	})
	var file = _.filter(data, {type: "file"})
	var text = _.filter(data, function(f){return f.type == "email" || f.type == "text" || f.type == "date"})
	var address = _.filter(data, {type: "address"})

	jQuery('#db-post').append(buttons + "<div class='wrapper'>" + title + "<form id='" + data.slug + "'></form></div>")
	_.each(text, function(t){
		hb.createTemplate('./src/views/form/text.html', t, function(html){
			jQuery('#' + data.slug).append(html)
		})
	})
	_.each(file, function(t){
		hb.createTemplate('./src/views/form/file.html', t, function(html){
			jQuery('#' + data.slug).append(html)
		})
	})
	_.each(address, function(a){
		hb.createTemplate('./src/views/form/address.html', a, function(html){
			jQuery('#' + data.slug).append(html)
			jQuery('.map-handler').on('error', function(e){
				var searchBox = new google.maps.places.SearchBox(document.getElementById(a.uid));
			})

		})
	})


	var select = _.filter(data, {type: "select"})
	var select_dom = _.map(select, function(sd){
		return "<div class='f-control'><label>" + sd.label + "</label><select class='" + sd.type + "' style='order:" + sd.id + ";' id='" + sd.uid + "'>" + _.map(sd.option, function(sdsd){
			return "<option value='" + sdsd['value'] + "'>" + sdsd.key + "</option>" 
		}).join('') + "</select></div>"
	}).join('')
	// jQuery('#db-post').append(buttons + "<div class='wrapper'>" + title + "<form id='" + data.slug + "'>" + text_dom + address_dom + select_dom + file_dom + "</form></div>")
	// s3_presigned: function(req, success){
	// 	axios({
	// 		url: "https://test-8it-api-db.herokuapp.com/api/v1/_s3signature", 
	// 		method: "POST",
	// 		data: {
	// 			bucket: req.bucket,
	// 			ttl: req.ttl,
	// 			filename: req.filename,
	// 			filetype: req.filetype
	// 		},
	// 		headers: { 
	// 			'content-type': 'application/json',
	// 			'Authorization': 'Bearer ' + req.access_token
	// 		}
	// 	})
	// 	.then(function(response) {
	// 		success(response.data['presigned-endpoint'])
	// 	})
	// },
	// upload_to_s3: function(url, data, success){
	//     $.ajax({
	//       type: 'PUT',
	//       url: url,
	//       contentType: data.type,
	//       processData: false,
	//       data: data
	//     })
	// },
}
	
module.exports = formBuilder