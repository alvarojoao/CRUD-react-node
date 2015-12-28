'use strict';

/**
 * Module dependencies.
 */
var articles = [],
	Article = require('../models/article.server.model.js');
var fs = require('fs');

function prettyDate(time){
    var date = new Date(time || ""),
        diff = ((new Date().getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) {
        return;
    }

    return day_diff == 0 && (
            diff < 60 && "just now" ||
            diff < 120 && "1 minute ago" ||
            diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
            diff < 7200 && "1 hour ago" ||
            diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
        day_diff == 1 && "Yesterday" ||
        day_diff < 7 && day_diff + " days ago" ||
        day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
};

function findArticle(id){
	var articleFilterd = articles.filter(function(obj){
		if(obj.id == id)
			return obj;
	});
	var article = {};
	if(articleFilterd.length>0){
		article = articleFilterd[0];
		article.publishedDate = prettyDate(article.publishedDate);
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
		articles[index].title = articleUpdated.title;
		articles[index].content = articleUpdated.content;
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
		var articleCl =  JSON.parse(JSON.stringify(article))
		articleCl.publishedDate = prettyDate(article.publishedDate);
		res.json(articleCl);
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
		var articleCl =  JSON.parse(JSON.stringify(articleUpdated))
		articleCl.publishedDate = prettyDate(articleUpdated.publishedDate);
		res.json(articleCl);

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
	var articlesReturn = [];
	articles.forEach(function(obj){
		var articleCl =  JSON.parse(JSON.stringify(obj))
		articleCl.publishedDate = prettyDate(obj.publishedDate);
		articlesReturn.push(articleCl);
	});
	res.json(articlesReturn);

};


