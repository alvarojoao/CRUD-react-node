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

/*I guess for this project this kind of resource is unnecessary, 
either way I left this to show I undestand this kind of solutions*/ 
router.param('articleId', function (req, res, next, id) {
  next();
})


module.exports = router;

