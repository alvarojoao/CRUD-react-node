var ArticleDispatcher = require('../dispatchers/article-dispatcher');
var ArticleConstants = require('../constants/article-constants');
var ArticleActions = {
  createArticle: function(data,Articles) {
    ArticleDispatcher.handleViewAction({
      type: ArticleConstants.ActionTypes.CREATE_Article,
      data: data,
      Articles:Articles
    });
  },
  updateArticle: function(data,Articles) {
    ArticleDispatcher.handleViewAction({
      type: ArticleConstants.ActionTypes.UPDATE_Article,
      data: data,
      Articles:Articles
    });
  },
  destroyArticle: function(id,Articles) {
    ArticleDispatcher.handleViewAction({
      type: ArticleConstants.ActionTypes.DESTROY_Article,
      id: id,
      Articles:Articles
    });
  }
}

module.exports = ArticleActions;
