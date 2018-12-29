jQuery = require("jquery")

const accessControlUI = require('./helpers/accesscontrol')
const accessControlParser = require('./helpers/accesscontrol/parser')
const store = accessControlUI.store

jQuery(document).ready(function($){
	$('.resource-key-permissions input').on('change', function(e){
	  if($(this).prop('checked')){
		store.dispatch({type: "ADD_PERMISSION_TO_LIST", permission: e.target.value})
	  }else{
		store.dispatch({type: "REMOVE_PERMISSION_FROM_LIST", permission: e.target.value})	
	  }
	})	
	store.subscribe(function(){
		let role = 'admin'
		array = accessControlParser.toArrayObjects(role, store.getState())
		console.log(array)
	})
})




// jQuery('.resource-key-permissions input').on('change', function(e){
//   if(jQuery(this).prop('checked')){
// 	console.log(e.target.value)
//   }else{
	
//   }
// })