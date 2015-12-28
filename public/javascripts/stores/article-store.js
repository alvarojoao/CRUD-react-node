var ArticleDispatcher = require('../dispatchers/article-dispatcher');
var ArticleConstants = require('../constants/article-constants');
var Utils = require('../utils/loadJson');

var ArticleStore = (function() {
  var _articles = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var ActionTypes = ArticleConstants.ActionTypes;
  return {
    articles: function() {
     
      return _articles;
    },
    setArticles: function(articles){
      if(articles){
        this._articles = articles;
      }
    },
    new: function() {
      return {
        id: null,
        title: null,
        content: null
      }
    },
    updateArticles: function(Articles,_articles) {
       if(Articles.isMounted()){ Articles.setState({ articles: _articles });
                            Articles.setState({ errors: [] });
                            }
    },
    updateArticleEdit: function(Article,article) {
       if(Article.isMounted()){ 
          Article.props.article = article;
          Article.setState({ editing: false });
          document.getElementById('articles-form').getElementsByClassName('ps-btn')[0].classList.remove('ps-btn-disabled');
          document.getElementById('articles-form').getElementsByClassName('ps-btn')[0].disabled = false;
  
        }
    },
    failArticles: function(Articles,data) {
      var data_ = []; data_.push(data);
        if(Articles.isMounted()) Articles.setState({ errors: data_ });
    },
    failArticlesEdit: function(Articles,data) {

      var frm = document.getElementById('articles-list').getElementsByTagName('FORM')[0];
      if(frm.firstChild.tagName=='UL')
        frm.firstChild.remove()
      var ul = document.createElement('ul');
      var li = document.createElement('li');
      li.innerHTML = data.message;
      ul.appendChild(li);
      frm.insertBefore(ul,frm.firstChild);
    },
    create: function(article,Articles) {
      Utils.sendJSON('/api/blog/article','post',{data:article,object:this},function(response,object){
        var article = JSON.parse(response);
        object._articles.unshift(article);
        // object._articles = _articles;
        _articles = object._articles.filter(function(object){
                    var text = Articles.query;
                    if(!text||((object.title.toLowerCase().indexOf(text.toLowerCase())>-1)
                          ||(object.content.toLowerCase().indexOf(text.toLowerCase())>-1))) {
                      return object
                    }
                  });
        object.resetFields();
        object.updateArticles(Articles,_articles);
      },function(msg,object){
        object.failArticles(Articles,JSON.parse(msg));
      });
    },
    update: function(article,Article) {
      var index = this.find(article.id);
      article.id = parseInt(article.id);
      if(index === undefined) return this.failArticles(Article,{message:'Invalid Id'});
      Utils.sendJSON('/api/blog/article/'+article.id,'put',{data:article,object:this},function(response,object){
        var article = JSON.parse(response);
        _articles[index] = article;
        object._articles = _articles;
        object.updateArticleEdit(Article,article);
      },function(msg,object){
        object.failArticlesEdit(Article,JSON.parse(msg));
      });
    },
    destroy: function(id,Articles) {
      var index = this.find(id);
      if(index === undefined) return this.failArticles(Articles,{message:'Invalid Id'});
      Utils.sendJSON('/api/blog/article/'+id,'delete',{data:{},object:this},function(response,object){
        _articles.splice(index, 1);
        object._articles = _articles;
        object.updateArticles(Articles,_articles);
      },function(msg,object){
        object.failArticles(Articles,JSON.parse(msg));
      });
    },

    find: function(id) {
      var id = parseInt(id);
      var found = undefined;
      this._articles.some(function(article, i) {
        if(article.id === id) found = i;
      });
      return found;
    },
    resetFields: function(){
      var frm = document.getElementById('articles-form').getElementsByTagName('FORM')[0];
      frm.reset();  // Reset
    },
    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_Article:
          this.create(action.data,action.Articles);
          break;
        case ActionTypes.UPDATE_Article:
          this.update(action.data,action.Articles);
          break;
        case ActionTypes.DESTROY_Article:
          this.destroy(action.id,action.Articles);
          break;
        default:
          // do nothing
      }
    }
  }
}())

ArticleDispatcher.register(ArticleStore.payload.bind(ArticleStore));

module.exports = ArticleStore;
