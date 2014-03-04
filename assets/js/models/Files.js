var Model = require('./Model');

var indexes = [
    {name: 'name', keyPath: 'name', unique: true }
];

function Files() {
    Model.call(this, indexes);
}

Files.prototype = Object.create(Model.prototype, {
    storeName: { value: 'files', configurable: false, enumerable: false, writable: false }
});
Files.prototype.constructor = Files;

Files.prototype.getByName = function(fileName) {

    return this.store.open().then(function() {
        return this.store.query({index: 'name', keyRange: this.store.makeKeyRange({ lower: fileName, upper: fileName }) });
    }.bind(this)).then(function(rs) {
        if (rs)
            return rs[0];
    });
};

Files.prototype.serialize = function() {
    var obj = { 
        name: this.name,
        content: this.content,
        updatedAt: new Date()
    }
    
    if (this.id) {
        obj.id = this.id;
    }

    return obj;
};

Files.prototype.deserialize = function(obj) {
    var file = new Files();
    file.title = obj.title;
    file.content = obj.content;
    file.updatedAt = obj.updatedAt;
    file.id = obj.id;

    return page;
}

module.exports = Files;
