'use strict';

/**
 * Module dependencies.
 */
var articles = [],
	Article = require('../models/article.server.model.js'),
	Repository = require('../repository/article.server.repository.js');

var fs = require('fs');

 
var repository = new Repository(articles);

/**
 * Create a article / route operation
 */
exports.create = function(req, res) {
	try{
		console.log(req.body);
		var article = new Article(req.body);
		var articleCl = repository.addArticle(article);
		
		res.json(articleCl);
	}catch(err){
		console.log(err);
		return res.status(400).send(err);
	}
};

/**
 * Show the current article / route operation
 */
exports.read = function(req, res) {
	var id  = req.params.articleId;
	if(!id||id==''){
		return res.status(400).send({
				message: 'Id not valid for Article'
			});
	}
	var article = repository.findArticle(id);
	if(article){
		res.json(article);
	}else{
		return res.status(404).send({
				message: 'Article not found'
			});
	}
};

/**
 * Update a article / route operation
 */
exports.update = function(req, res) {
	var id  = req.params.articleId;
	if(!id||id==''){
		return res.status(400).send({
				message: 'Id not valid for Article'
			});
	}

	var articleUpdated = {};
	try{
		articleUpdated = new Article(req.body);
		articleUpdated.id = parseInt(id);
	}catch(err){
		return res.status(400).send(err);
	}
	var article = repository.updateArticle(id,articleUpdated);

	if(article){
		
		res.json(article);

	}else{
		return res.status(404).send({
				message: 'Article not found'
			});
	}

};

/**
 * Delete an article / route operation
 */
exports.delete = function(req, res) {
	var id  = req.params.articleId;
	if(!id||id==''){
		return res.status(400).send({
				message: 'Id not valid for Article'
			});
	}
	
	var article = repository.removeArticle(id);

	if(article){
		res.json({message:'Sucess'});
	}else{
		return res.status(404).send({
				message: 'Article not found'
			});
	}
};


/**
 * List of Articles / route operation
 */
exports.list = function(req, res){

	var articlesReturn = repository.listArticles();
	res.json(articlesReturn);

};


