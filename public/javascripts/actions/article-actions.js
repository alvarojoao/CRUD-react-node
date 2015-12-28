var ArticleDispatcher = require('../dispatchers/article-dispatcher');
var ArticleConstants = require('../constants/article-constants');
  /*Actions Dispatcher*/

var ArticleActions = {
  /*Create a dispatcher call for creat Article*/
  createArticle: function(data,Articles) {
    ArticleDispatcher.handleViewAction({
      type: ArticleConstants.ActionTypes.CREATE_Article,
      data: data,
      Articles:Articles
    });
  },
  /*Create a dispatcher call for update Article*/
  updateArticle: function(data,Articles) {
    ArticleDispatcher.handleViewAction({
      type: ArticleConstants.ActionTypes.UPDATE_Article,
      data: data,
      Articles:Articles
    });
  },
  /*Create a dispatcher call for delete Article*/
  destroyArticle: function(id,Articles) {
    ArticleDispatcher.handleViewAction({
      type: ArticleConstants.ActionTypes.DESTROY_Article,
      id: id,
      Articles:Articles
    });
  }
}

module.exports = ArticleActions;
