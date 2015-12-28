'use strict';

/**
 * Module dependencies.
 */
var articles = [],
	Article = require('../models/article.server.model.js');
var fs = require('fs');

function findArticle(id){
	var articleFilterd = articles.filter(function(obj){
		if(obj.id == id)
			return obj;
	});
	var article = {};
	if(articleFilterd.length>0){
		article = articleFilterd[0];
		return article
	}else
		return undefined;
};
function addArticle(article){
	article.id = articles.length+1;
	articles.push(article);
};
function removeArticle(id){
	var articleIndexs = articles.map(function(obj, index) {
	    if(obj.id == id) {
	        return index;
	    }
	}).filter(isFinite)

	if(articleIndexs.length>0){
		var index = articleIndexs[0];
		articles.splice(index,1);
		return true;
	}else{
		return false;
	}
};
function updateArticle(id,articleUpdated){
	var articleIndexs = articles.map(function(obj, index) {
	    if(obj.id == id) {
	        return index;
	    }
	}).filter(isFinite)


	if(articleIndexs.length>0){
		var index = articleIndexs[0];
		articles[index] = articleUpdated;
		return true;
	}else{
		return false;
	}
};
/**
 * Create a article
 */
exports.create = function(req, res) {
	try{
		console.log(req.body);
		var article = new Article(req.body);
		addArticle(article);
		res.json(article);
	}catch(err){
		console.log(err);
		return res.status(400).send(err);
	}
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	var id  = req.params.articleId;
	if(!id||id==''){
		return res.status(400).send({
				message: 'Id not valid for Article'
			});
	}
	var article = findArticle(id);
	if(article){
		res.json(article);
	}else{
		return res.status(404).send({
				message: 'Article not found'
			});
	}
};

/**
 * Update a article
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
	var article = updateArticle(id,articleUpdated);

	if(article){
		res.json(articleUpdated);

	}else{
		return res.status(404).send({
				message: 'Article not found'
			});
	}

};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var id  = req.params.articleId;
	if(!id||id==''){
		return res.status(400).send({
				message: 'Id not valid for Article'
			});
	}
	
	var article = removeArticle(id);

	if(article){
		res.json({message:'Sucess'});
	}else{
		return res.status(404).send({
				message: 'Article not found'
			});
	}
};

/**
 * List of Articles
 */
function compareByPublishedDate(a,b) {
	var key1 = new Date(a.publishedDate);
    var key2 = new Date(b.publishedDate);

    if (key1 < key2) {
        return 1;
    } else if (key1 == key2) {
        return 0;
    } else {
        return -1;
    }
};
exports.list = function(req, res){

	articles.sort(compareByPublishedDate);
	res.json(articles);

};


