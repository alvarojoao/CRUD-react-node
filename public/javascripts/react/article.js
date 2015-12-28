/**
 * @jsx React.DOM
 */
var React = require('react');
var ArticleForm = require('./article-form');
var ArticleActions = require('../actions/article-actions');
var ArticleStore = require('../stores/article-store');
var Article = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    // ArticleStore.addChangeEvent(function(data) {
    //   if(this.isMounted()) this.setState({ editing: false });
    // }.bind(this))
  },
  render: function() {
    return (
      <div className="article">
        <span><a href="javascript:void(0);" className="icon-bin" onClick={this.deleteArticle}>Delete</a></span>
        <span><a href="javascript:void(0);" className="icon-pencil" onClick={this.editArticle}>Edit</a></span>
        {this.state.editing ? this.renderForm() : this.renderArticle()}
        {this.state.editing ? <input type="button" onClick={this.cancelEditArticle} value="cancel" className="ps-btn ps-btn-alert"/>:""}

      </div>
    );
  },
  renderArticle: function() {
    return(<div className='article-item'>
              <h1>{this.props.article.title}</h1>
              <small>{this.props.article.publishedDate}</small>
              <p className='content less'>{this.props.article.content}</p>
              <a href="javascript:void(0);" onClick={this.readMore}>read more</a>
           </div>);
  },
  renderForm: function() {
    var object = {
        id:this.props.article.id,
        title:this.props.article.title,
        content:this.props.article.content
    };
    var options = {
      onSubmit: this.handleEdit,
      content: { type: 'textarea' , className:'ps-frm-entry'},
      title: { className:'ps-frm-entry'}
    };
    return(<ArticleForm object={object} options={options} errors={this.props.errors} />);
  },
  readMore: function(event,event2,event3){
    var content = event.target.parentElement.querySelector('.content');
    if(content.classList.contains('less')){
      content.classList.remove('less');
      event.target.innerHTML = 'less';
    }else{
      content.classList.add('less');
      event.target.innerHTML = 'read more';
    }
  },
  handleEdit: function(data) {
    ArticleActions.updateArticle(data,this);
  },
  editArticle: function() {
    if(this.isMounted()) this.setState({ editing: true });
  },
  cancelEditArticle: function() {
    if(this.isMounted()) this.setState({ editing: false });
  },
  deleteArticle: function() {
    this.props.handleDelete(this.props.article.id);
  }

});

module.exports = Article;
