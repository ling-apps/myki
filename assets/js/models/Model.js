var IDB = require('../lib/idbpromises-js');

function Model(indexes) {
    var storeDescription = {            
        storeName: this.name,
        storePrefix: 'myki-',
        dbVersion: 1,
        keyPath: 'id',
        autoIncrement: true,
        indexes: indexes
    };

    this.store = new IDB(storeDescription);
}

Model.prototype.save = function() {
    return this.store.open().then(function() {
        return this.store.put(this.serialize());
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

Model.prototype.destroy = function() {
    return this.store.open().then(function() {
        return this.remove(this.id);
    });
};

module.exports = Model;
