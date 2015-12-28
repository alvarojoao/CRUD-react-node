/**
 * @jsx React.DOM
 */
var React = require('react');
var Articles = require('./articles');
window.onload = function() {
  React.render(<Articles url="/api/blog" pollInterval={10000} />, document.body);
}
