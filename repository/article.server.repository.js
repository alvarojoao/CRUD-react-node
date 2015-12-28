
/*Constructor for Repository.*/
function Repository(array) {
    this.articles = array;
}
/*Makes the date pretty and easy to read*/
function prettyDate(time) {
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
  /*Function that makes the comparations between date to order the array/list*/
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

  /*Transational 'db' operations: Find and article with a particular id*/
Repository.prototype.findArticle = function (id){
  var articleFilterd = this.articles.filter(function(obj){
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

  /*Transational 'db' operations: Add and article with a particular id*/
Repository.prototype.addArticle =  function (article){
  article.id = this.articles.length+1;
  this.articles.push(article);
  var articleCl =  JSON.parse(JSON.stringify(article))
  articleCl.publishedDate = prettyDate(article.publishedDate);
  return articleCl;
};

  /*Transational 'db' operations: Remove and article with a particular id*/
Repository.prototype.removeArticle =   function (id){
    var articleIndexs = this.articles.map(function(obj, index) {
        if(obj.id == id) {
            return index;
        }
    }).filter(isFinite)

    if(articleIndexs.length>0){
      var index = articleIndexs[0];
      this.articles.splice(index,1);
      return true;
    }else{
      return false;
    }
  };

  /*Transational 'db' operations: Update and article with a particular id*/
Repository.prototype.updateArticle =   function (id,articleUpdated){
    var articleIndexs = this.articles.map(function(obj, index) {
        if(obj.id == id) {
            return index;
        }
    }).filter(isFinite)


    if(articleIndexs.length>0){
      var index = articleIndexs[0];
      this.articles[index].title = articleUpdated.title;
      this.articles[index].content = articleUpdated.content;
      var articleCl =  JSON.parse(JSON.stringify(articleUpdated))
      articleCl.publishedDate = prettyDate(articleUpdated.publishedDate);
      return articleCl;
    }else{
      return false;
    }
  };
Repository.prototype.listArticles =   function (){
  var articlesReturn = [];
  this.articles.sort(compareByPublishedDate);
  this.articles.forEach(function(obj){
    var articleCl =  JSON.parse(JSON.stringify(obj))
    articleCl.publishedDate = prettyDate(obj.publishedDate);
    articlesReturn.push(articleCl);
  });
  return articlesReturn;
}

// export the class
module.exports = Repository;