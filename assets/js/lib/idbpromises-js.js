var q = require('q');
var IDBStore = require('idb-wrapper');

(function (name, definition, global) {
  if (typeof define === 'function') {
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = definition();
  } else {
    global[name] = definition();
  }
})('IDBPromises', function () {

  var IDBPromises = function (options) {
    this._options = options;
  };

  IDBPromises.prototype = {

    open: function () {
      var deferred = new q.defer();
      var options = this._options;
      options.onStoreReady = function () {
        deferred.resolve();
      };
      options.onError = function (err) {
        deferred.reject(err);
      };
      this.idbstore = new IDBStore(options);

      return deferred.promise;
    },

    deleteDatabase: function () {
      return this.idbstore.deleteDatabase();
    },

    put: function (key, value) {
      var deferred = new q.defer();
      var onSuccess = function (result) {
        deferred.resolve(result);
      };
      var onError = function (err) {
        deferred.reject(err);
      };

      if (this._options.keyPath !== null) {
        // in-line keys: one arg only (key == value)
        this.idbstore.put(key, onSuccess, onError);
      } else {
        // out-of-line keys: two args
        this.idbstore.put(key, value, onSuccess, onError);
      }

      return deferred.promise;
    },

    get: function (key) {
      var deferred = new q.defer();
      var onSuccess = function (result) {
        deferred.resolve(result);
      };
      var onError = function (err) {
        deferred.reject(err);
      };

      this.idbstore.get(key, onSuccess, onError);

      return deferred.promise;
    },

    remove: function (key) {
      var deferred = new q.defer();
      var onSuccess = function (result) {
        deferred.resolve(result);
      };
      var onError = function (err) {
        deferred.reject(err);
      };

      this.idbstore.remove(key, onSuccess, onError);

      return deferred.promise;
    },

    batch: function (dataArray) {
      var deferred = new q.defer();
      var onSuccess = function (result) {
        deferred.resolve(result);
      };
      var onError = function (err) {
        deferred.reject(err);
      };

      this.idbstore.batch(dataArray, onSuccess, onError);

      return deferred.promise;
    },

    getAll: function () {
      var deferred = new q.defer();
      var onSuccess = function (result) {
        deferred.resolve(result);
      };
      var onError = function (err) {
        deferred.reject(err);
      };

      this.idbstore.getAll(onSuccess, onError);

      return deferred.promise;
    },

    clear: function () {
      var deferred = new q.defer();
      var onSuccess = function (result) {
        deferred.resolve(result);
      };
      var onError = function (err) {
        deferred.reject(err);
      };

      this.idbstore.clear(onSuccess, onError);

      return deferred.promise;
    },

    getIndexList: function () {
      return this.idbstore.getIndexList();
    },

    hasIndex: function (indexName) {
      return this.idbstore.hasIndex(indexName);
    },

    normalizeIndexData: function (indexData) {
      return this.idbstore.normalizeIndexData(indexData);
    },

    indexComplies: function (actual, expected) {
      return this.idbstore.indexComplies(actual, expected);
    },

    iterate: function (options) {
      options = options || {};
      var deferred = new q.defer();
      options.onEnd = function (result) {
        deferred.resolve(result);
      };
      options.onError = function (err) {
        deferred.reject(err);
      };
      var onItem = function (item) {
        deferred.notify(item);
      };

      this.idbstore.iterate(onItem, options);

      return deferred.promise;
    },

    query: function (options) {
      options = options || {};
      var deferred = new q.defer();
      var onSuccess = function (result) {
        deferred.resolve(result);
      };
      options.onError = function (err) {
        deferred.reject(err);
      };

      this.idbstore.query(onSuccess, options);

      return deferred.promise;
    },

    count: function (options) {
      options = options || {};
      var deferred = new q.defer();
      var onSuccess = function (result) {
        deferred.resolve(result);
      };
      options.onError = function (err) {
        deferred.reject(err);
      };

      this.idbstore.count(onSuccess, options);

      return deferred.promise;
    },

    makeKeyRange: function (options) {
      return this.idbstore.makeKeyRange(options);
    }

  };

  return IDBPromises;

}, this);
