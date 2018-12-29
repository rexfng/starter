const redux = require('redux')
const _ = require('lodash')

function permission(state = [], action) {
  switch (action.type) {
    case 'ADD_PERMISSION_TO_LIST':
      return state.concat(action.permission)
    case 'REMOVE_PERMISSION_FROM_LIST':
      return _.pull(state, action.permission);
    default:
      return state
  }
}

let store = redux.createStore(permission)

AccessControlUI = {
	store: store,
	addPermissionToList: function(item){
		store.dispatch({ type: 'ADD_PERMISSION_TO_LIST', permission: item })
	},
	removePermissionFromList: function(item){
		store.dispatch({ type: 'REMOVE_PERMISSION_FROM_LIST', permission: item })
	}
}

module.exports = AccessControlUI