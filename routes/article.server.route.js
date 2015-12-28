'use strict';
var express = require('express');
var router = express.Router(),
	article = require('../controllers/article.server.controller');


/* GET users listing. */

// Article Routes
router.get('/',	article.list);
router.get('/article/:articleId',article.read);

router.post('/article',article.create);
router.put('/article/:articleId',article.update);
router.delete('/article/:articleId',article.delete);

router.param('articleId', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
})


module.exports = router;

