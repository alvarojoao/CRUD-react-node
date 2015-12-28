jest.dontMock('react/lib/copyProperties');
jest.dontMock('../../constants/article-constants');
jest.dontMock('../article-store');

describe('ArticleStore', function() {
  var ArticleConstants = require('../../constants/article-constants');
  beforeEach(function () {
    ArticleDispatcher = require('../../dispatchers/article-dispatcher');
    ArticleStore = require('../article-store');
    Articles = require('../../react/articles');
  });
  describe('payload', function () {
    it('should register a callback with the dispatcher', function() {
      expect(ArticleDispatcher.register.mock.calls.length).toBe(1);
    });
  });
  describe('actions', function () {
    beforeEach(function () {
      callback = ArticleDispatcher.register.mock.calls[0][0];
    });
    it('#articles is initialized with an empty collection', function () {
      expect(ArticleStore.articles()).toEqual([]);
    });
    it('#new returns an blank article', function () {
      expect(ArticleStore.new()).toEqual({
          id: null,
          title: null,
          content: null
        });
    });
    it('#create', function () {
      var actionArticleCreate = {
        source: 'VIEW_ACTION',
        action: {
          type: ArticleConstants.ActionTypes.CREATE_Article,
          data: {title: 'foo',content:'bar'},
          Articles:Articles
        }
      };
      callback(actionArticleCreate);
      expect(ArticleStore.articles()).toEqual([actionArticleCreate.action.data])
    });
    it('#update', function () {
      ArticleStore.create({title: 'foo',content:'bar'})
      var actionArticleUpdate = {
        source: 'VIEW_ACTION',
        action: {
          type: ArticleConstants.ActionTypes.UPDATE_Article,
          data: {id: 1, title: 'bar',content:'foobar'},
          Articles:Articles
        }
      };
      callback(actionArticleUpdate);
      expect(ArticleStore.articles()).toEqual([actionArticleUpdate.action.data])
    });
    it('#update', function () {
      ArticleStore.create({title: 'foo',content:'foobar'})
      var actionArticleDestroy = {
        source: 'VIEW_ACTION',
        action: {
          type: ArticleConstants.ActionTypes.DESTROY_Article,
          id: 1,
          Articles:Articles
        }
      };
      callback(actionArticleDestroy);
      expect(ArticleStore.articles()).toEqual([])
    });
  });
  it('#find returns the index of the found article', function () {
    ArticleStore.create({title: 'foo',content:'foobar'})
    expect(ArticleStore.find(1)).toEqual(0)
    expect(ArticleStore.find(2)).toEqual(undefined)
  });
});
