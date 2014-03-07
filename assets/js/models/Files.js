var Model = require('./Model');

var indexes = [
    {name: 'name', keyPath: 'name', unique: true }
];

function Files() {
    Model.call(this, indexes);
}

// Inherit from Model and declare property
Files.prototype = Object.create(Model.prototype, {
    storeName: { value: 'files', configurable: false, enumerable: false, writable: false },
    type: { value: 'image', configurable: false, enumerable: true, writable: true }
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
        type: this.type,
        updatedAt: new Date()
    }
    
    if (this.id) {
        obj.id = this.id;
    }

    return obj;
};

Files.prototype.deserialize = function(obj) {
    var file = new Files();
    file.name = obj.name;
    file.content = obj.content;
    file.updatedAt = obj.updatedAt;
    file.type = obj.type;
    file.id = obj.id;

    return file;
}

module.exports = Files;
