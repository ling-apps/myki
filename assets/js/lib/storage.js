var q = require('q');
var db = require('./db');

function Storage(dbName) {
    this.dbName = dbName;
    this.db = null;
    this.stores = [];
}

Storage.prototype.init = function(migration) {
    var deferred = q.defer();

    for (storeName in migration.schema) {
        createStore.call(this, storeName);
    }

    db.open({
        server: this.dbName,
        version: migration.version,
        schema: migration.schema
    }).done(function(result) {
        this.db = result;
        deferred.resolve(this.db);
    }.bind(this));

    return deferred.promise;
};

Storage.prototype.load = function(models) {
    var deferred = q.defer();

    return deferred.promise;
};

Storage.prototype.clear = function() {
    var deferred = q.defer();

    return deferred.promise;
};

function all(store) {
    var deferred = q.defer();

    return deferred.promise;
}

function find(store, query) {
    var deferred = q.defer();

    return deferred.promise;
}

function save(store, obj) {
    var deferred = q.defer();

    return deferred.promise;
}

function destroy(store, objId) {
    var deferred = q.defer();

    return deferred.promise;
}

function clear(store) {
    var deferred = q.defer();

    return deferred.promise;
}

function createStore(storeName) {
    this[storeName] = Object.create(Store.prototype, {});
    console.log(this);
    console.log(this[storeName].prototype);
}

function Store() {}
Store.prototype.all = function() {
    var deferred = q.defer();

    return deferred.promise;
};

Store.prototype.find = function() {
    var deferred = q.defer();

    return deferred.promise;
};

Store.prototype.save = function(obj) {
    var deferred = q.defer();

    return deferred.promise;
};

Store.prototype.destroy = function() {
    var deferred = q.defer();

    return deferred.promise;
};

Store.prototype.clear = function() {
    var deferred = q.defer();

    return deferred.promise;
};

module.exports = Storage;
