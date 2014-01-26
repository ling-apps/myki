var Q = require('q');

function getObjectStore(db, store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

var MODE = {
    READ_ONLY: 'readonly',
    READ_WRITE: 'readwrite'
};

function IDB(options) {
    this.dbName = options.dbName || window.location.hostname;
    this.onUpgrade = options.onUpgrade;
}

IDB.prototype.getDb = function() {
    var deferred = Q.defer();

    var req = indexedDB.open(this.dbName, 3);
    req.onsuccess = function (evt) {
        deferred.resolve(this.result)
    };
    req.onerror = function (evt) {
        deferred.reject(evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
        this.onUpgrade(evt.currentTarget.result);
        deferred.resolve(this.result);
    }.bind(this);
    return deferred.promise;
}

IDB.prototype.create = function(storeName, item) {

    console.log('create item', item, 'in store ' + storeName);
    var deferred = Q.defer();

    this.getDb().then(function(db) {
        var store = getObjectStore(db, storeName, MODE.READ_WRITE);
        console.log('retrieve store ', store);
        try {
            var req = store.add(item);
            req.onsuccess = function(e) {
                deferred.resolve(e.target.result);
            }
        } catch(e) {
            deferred.reject(e);
        }
    });

    return deferred.promise;
};

IDB.prototype.read = function(storeName, itemId) {
    var deferred = Q.defer();

    this.getDb().then(function(db) {
        var store = getObjectStore(db, storeName, MODE.READ_ONLY);
        var req = store.get(itemId)
        req.onsuccess = function(evt) {
            deferred.resolve(evt.target.result);
        }
        req.onerror = function(evt) {
            deferred.reject(evt.target.errorCode);
        }
    });

    return deferred.promise;
};

IDB.prototype.update = function(storeName, item) {
    var deferred = Q.defer();

    return deferred.promise;
};

IDB.prototype.del = function(storeName, itemId) {
    var deferred = Q.defer();

    return deferred.promise;
};

IDB.prototype.clear = function(storeName) {
    console.log('IDB Clear ' + storeName);
    this.getDb().then(function(db) {
        var store = getObjectStore(db, storeName, MODE.READ_WRITE);
        console.log('get store', store);
        var req = store.clear();
        req.onsuccess = function(event) {
            console.log('store ' + storename + ' cleared' );
        };
        req.onerror = function(event) {
            console.log('pb while clearing the store ' + storeName, event.target.errorCode)
        };
    });
}

IDB.prototype.all = function(storeName) {
    console.log('get all items in store ' + storeName);

    var deferred = Q.defer();

    this.getDb().then(function(db) {
        var store = getObjectStore(db, storeName, MODE.READ_ONLY);
        var req = store.openCursor();
        var items = [];
        req.onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                req = store.get(cursor.key)
                req.onsuccess = function(evt) {
                    items.push(evt.target.result);
                }
                cursor.continue();
            } else {
                deferred.resolve(items);
            }
        }
    });

    return deferred.promise;
};

module.exports = IDB;