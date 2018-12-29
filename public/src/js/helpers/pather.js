var _ = require('lodash')
var parseQuery = require('./query.js')
var pather = function(routes){
	var pathToArray = function(path){
		if(path == "/"){
			return ["/"]
		}else{
			return path.split("/").filter(x => x)
		}
	}
	var comparePaths = function(a, b){
		//filter out routes with same amount of patterns
		a_array = pathToArray(a)
		b_array = _.map(b, function(b_item){
			return Object.assign(b_item, {pattern_array: pathToArray(b_item.pattern)})
		})
		count_filter_b_array = _.filter(b, function(bi){
			return bi.pattern_array.length == pathToArray(a).length
		})
		raw_results = _.map(count_filter_b_array, function(bi){
			var temp_params = _.map(bi.pattern_array, function(b_term, i){
				var obj = {term: b_term, match: b_term == a_array[i], type: "exact"}
				if(b_term.startsWith(":")){
					obj = Object.assign(obj, {
							param: b_term.replace(":", ""), 
							value: a_array[i], 
							type: "params",
							match: true
						}
					)
				}
				return obj
			})
			var o = { 
				pattern: bi.pattern, 
				title: bi.title,
				render: bi.render,
				params: temp_params,
				all_match: _.every(temp_params, {match: true})
			}
			return o
		})
		// console.log(raw_results)
		remove_all_match_false = _.filter(raw_results, {all_match: true})
		sort = _.orderBy(remove_all_match_false, function(rr){
			// console.log(rr.params)
			return _.filter(rr.params,{match: true}).length
		},"desc")
		// console.log(sort)
		if(!_.isEmpty(sort)){
			return {
				is_matched: true, 
				msg: "found matching route.", 
				data: _.omit(sort[0], ['all_match']),
				raw: raw_results
			}
		}else{
			return {is_matched: false, msg: "no matching routes.", data: []}
		}
	}

	_.isEmpty(window.location.search) ? query = {} : query = parseQuery(window.location.search)
	var currentPath =  Object.assign(comparePaths(window.location.pathname, routes), {query: query})
	// console.log(currentPath)
	pObject = {}
	_.each(_.filter(currentPath.data.params, {type: "params"}), function(p){
		var op = {}
		op[p.param] = p.value
		pObject = Object.assign(pObject, op)
	})
	// if(currentPath.data.pattern !== window.location.pathname){
	// 	history.pushState({
	// 		query: currentPath.query,
	// 		params: pObject
	// 	},
	// 	currentPath.data.title,
	// 	window.location.pathname)
	// }
	document.title = currentPath.data.title
	return currentPath
}

module.exports = pather