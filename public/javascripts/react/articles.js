/**
 * @jsx React.DOM
 */
var React = require('react');
var Article = require('./article');
var ArticleForm = require('./article-form');
var ArticleActions = require('../actions/article-actions');
var ArticleStore = require('../stores/article-store');
var Utils = require('../utils/loadJson');
var renderCount = 0;

var Articles = React.createClass({

  getInitialState: function() {
    return {
      articles: [],
      errors: []
    };
  },
  loadCommentsFromServer: function() {
    Utils.loadJSON(this.props.url,function(response){
      ArticleStore.setArticles(JSON.parse(response));
      
      if(this.query&&this.query!=""){
        var articleFiltered =  ArticleStore._articles.filter(this.customFilter);
        this.setState({articles: articleFiltered})
      }else{
        this.setState({articles: ArticleStore._articles})
      }

    }.bind(this))
  },
  
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="articles">
        <div className="articles-search">
         <label className="ps-frm-lbl">Search:</label> <input type="text" placeholder="search" className="ps-frm-entry" onKeyUp={this.filter}   />
        </div>
        <div className="articles-list" id="articles-list">
          {this.renderArticles()}
        </div>
        <div className="articles-form" id="articles-form">
         <label className="ps-frm-lbl">Form template:</label> 
          {this.renderForm()}
        </div>
      </div>
    );
  },
  filter: function(event){
    var element = event.target;
    this.query = element.value;
    if(this.query&&this.query!=""){
      var articleFiltered =  ArticleStore._articles.filter(this.customFilter);
      this.setState({articles: articleFiltered})
    }else{
      this.setState({articles: ArticleStore._articles})
    }
    
  },
  customFilter: function(object){
    var text = this.query;
    if(!text||((object.title.toLowerCase().indexOf(text.toLowerCase())>-1)
          ||(object.content.toLowerCase().indexOf(text.toLowerCase())>-1))) {
      return object
    }
      
  },
  renderArticles: function() {
    var articles = [];
    this.state.articles.forEach(function(article) {
      articles.push(<Article key={article.id} article={article} errors={this.state.errors} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />);
    }.bind(this));
    return articles;
  },
  renderForm: function() {
    var object = ArticleStore.new();
    var options = {
      onSubmit: this.handleSubmit,
      content: { type: 'textarea' , className:'ps-frm-entry'},
      title: { className:'ps-frm-entry'}
    };
    return(<ArticleForm object={object} options={options} errors={this.state.errors} />);
  },
  handleSubmit: function(data) {
    ArticleActions.createArticle(data,this);
  },
  handleDelete: function(id) {
    ArticleActions.destroyArticle(id,this);
  }
});

module.exports = Articles;
