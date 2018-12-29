var db = function (path, method, data, callback){
	var settings = {
	  "url": "https://io-cog.auth0.com/oauth/token",
	  "method": "POST",
	  "headers": {
	    "content-type": "application/json"
	  },
	  "data": JSON.stringify({
			"client_id" : "gywlpB3aWmjATn5fhjjVNgQBEbVsLgpS",
			"client_secret" : "Yz7hPDpqnzFQkl2CkwExAHhcibMXjaDZRUEi9NIHyjWBlXcNAMfYgDfcalEiPjh0",
			"grant_type" : "client_credentials",
			"audience" :"https://io-cog.auth0.com/api/v2/"
		})
	}

	jQuery.ajax(settings).always(function(response, status){
		if(status !== "success"){
			callback({error: true, msg: "fail to retrieve token"})
		}else{
			_.isEmpty(data) ? data = "" : data = JSON.stringify(data)
			jQuery.ajax({
				"url": "https://io-coghk-api.herokuapp.com/api/v1" + path,
				"method": method,
				"data": data,
				"headers": {
					"Authorization": "Bearer " + response.access_token,
				    "content-type": "application/json"
				 }
			}).always(function(response){
				callback(response)
			})
		}
	});
}
module.exports = db