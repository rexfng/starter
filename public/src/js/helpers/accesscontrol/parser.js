const _ = require('lodash')

const accessControlParser = {
	toHTMLInputForm: function(array){

	},
	toArrayObjects: function(role, array){
		console.log(array)
		return _.map(array, function(a){
			a = a.split('-')
			return { 
				role: role, 
				resource: a[0], 
				action: a[2], 
				attributes: a[1] 
			}
		})
	}
}

module.exports = accessControlParser