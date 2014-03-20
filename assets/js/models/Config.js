var Model = require('./Model');

var indexes = [
    {name: 'name', keyPath: 'name', unique: true }
];

function Config() {
    this.dbVersion = 2;
    Model.call(this, indexes);
}

Config.prototype = Object.create(Model.prototype, {
    storeName: { value: 'config', configurable: false, enumerable: false, writable: false },
    properties: { value: {}, configurable: true, enumerable: true, writable: true},
    name: { configurable: true, enumerable: true, writable: true},
});
Config.prototype.constructor = Config;

// Override
Config.prototype.getByName = function(configName) {

    return this.store.open().then(function() {
        return this.store.query({index: 'name', keyRange: this.store.makeKeyRange({ lower: configName, upper: configName}) });
    }.bind(this)).then(function(rs) {
        if (rs.length > 0) {
            return this.deserialize(rs[0]);
        } else {
            var editorConfig = new Config();
            editorConfig.name = configName;
            return editorConfig.save();
        }
    }.bind(this));
};

Config.prototype.serialize = function() {
    var obj = {
        properties: this.properties,
        name: this.name
    };
    
    if (this.id) {
        obj.id = this.id;
    }

    return obj;
};

Config.prototype.deserialize = function(obj) {
    var cfg = new Config();
    cfg.name = obj.name;
    cfg.properties = obj.properties;
    cfg.id = obj.id;

    return cfg;
}

module.exports = Config;
