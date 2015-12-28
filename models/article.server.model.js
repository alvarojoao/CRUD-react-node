
/*Constructor/ Model for Articles, It also makes the db or models validations.*/
function Article(object) {
  // always initialize all instance properties
  if(!object){
  	throw new ArticleException("Empty Object.");
  }else if(!object.title||object.title==''){
    throw new ArticleException("Title must be filled.");
  }else if(!object.content||object.content==''){
    throw new ArticleException("Content must be filled.");
  }
  this.id = object.id;
  this.title = object.title; // default value
  this.content = object.content; // default value
  this.publishedDate = new Date(); // default value
}

/*Validation Exception returning a custom message*/
function ArticleException(message) {
   this.message = message;
};

// export the class
module.exports = Article;