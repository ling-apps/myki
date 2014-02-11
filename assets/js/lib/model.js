"use strict";

function Model(props) {
    for (var i in props) {
        this[i] = props[i];
    }

    if (!this.name) {
        throw new Error("Can't create a model without a name");
    }
}

Model.prototype.save = function() {
    if (this.id) {
        return db[this.name].update(this);
    } else {
        return db[this.name].add(this);
    }
};

Model.prototype.get = function(id) {
    return db[this.name].get(id);
};

Model.prototype.find = function(property, query) {
    return db[this.name].query(property, query).all().execute();
};

Model.prototype.all = function() {
    console.log('Fetch all data for model : ', this);
    return db[this.name].query().all().execute();
};

Model.prototype.destroy = function() {
    return db[this.name].remove(this.id);
};

module.exports = Model;
