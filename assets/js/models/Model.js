var IDB = require('../lib/idbpromises-js');

function Model(indexes) {
    this.dbPrefix = 'myki-';

    if (this.constructor === Model) {
        throw new Error("Model is an abstract class and can't be instantiated");
    }

    if (!this.storeName || this.storeName === "") {
        throw new Error('Class extending Model must have an attribute storeName defining the indexedDb store name');
    }

    if (!this.serialize || !this.deserialize) {
        throw new Error('Class extending Model must implement methods serialize and deserialize');
    }

    var storeDescription = {            
        storeName: this.storeName,
        storePrefix: this.dbPrefix,
        dbVersion: this.dbVersion || 1,
        keyPath: 'id',
        autoIncrement: true,
        indexes: indexes
    };

    this.store = new IDB(storeDescription);
}

Model.prototype.save = function() {
    return this.store.open().then(function() {
        return this.store.put(this.serialize());
    }.bind(this))
    .then(function(rs) {
        this.id = rs;
        return this;
    }.bind(this));
};

Model.prototype.get = function(id) {
    return this.store.open()
        .then(function() {
            return this.store.get(Number(id));
        }.bind(this))
        .then(function(data) {
            return this.deserialize(data);
        }.bind(this));
};

Model.prototype.getAll = function() {
    return this.store.open().then(function() {
        return this.store.getAll();
    }.bind(this));
};

Model.prototype.destroyAll = function() {
    return this.store.open().then(function() {
        return this.store.clear();
    }.bind(this));
};

Model.prototype.destroy = function(id) {
    return this.store.open().then(function() {
        return this.store.remove(Number(id));
    }.bind(this));
};

module.exports = Model;
