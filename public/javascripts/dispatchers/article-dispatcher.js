var copyProperties = require('react/lib/Object.assign');

//importing the module flux, for dispatcher , so I left the rendering part only to react.js
var Dispatcher = require('flux').Dispatcher;

var ArticleDispatcher = copyProperties(new Dispatcher(), {
  
  handleServerAction: function(action) {
    var payload = {
      source: 'SERVER_ACTION',
      action: action
    };
    this.dispatch(payload);
  },

 
  handleViewAction: function(action) {
    var payload = {
      source: 'VIEW_ACTION',
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = ArticleDispatcher;
