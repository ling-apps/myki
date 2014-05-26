var Model = require('./Model');

var indexes = [
    {name: 'title', keyPath: 'title'},
    {name: '_id', keyPath: '_id'}
];

function Pages() {
    this.dbVersion = 3;
    Model.call(this, indexes);
}

Pages.prototype = Object.create(Model.prototype, {
    storeName: { value: 'pages', configurable: false, enumerable: false, writable: false }
});
Pages.prototype.constructor = Pages;

Pages.prototype.serialize = function() {
    var obj = {
        _id: this._id,
        title: this.title,
        content: this.content,
        updatedAt: new Date(),
        author: this.author || 'anonymous' // TODO : add a constraint : this MUST have an author
    }
    
    if (this.id) {
        obj.id = this.id;
    }

    return obj;
};

Pages.prototype.deserialize = function(obj) {
    var page = new Pages();
    page._id = obj._id,
    page.title = obj.title;
    page.content = obj.content;
    page.updatedAt = obj.updatedAt;
    page.id = obj.id;
    page.author = obj.author || 'anonymous';

    return page;
}

module.exports = Pages;
