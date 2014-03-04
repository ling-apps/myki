var Model = require('./Model');

var indexes = [
    {name: 'title', keyPath: 'title', unique: true}
];

function Pages() {
    Model.call(this, indexes);
}

Pages.prototype = Object.create(Model.prototype, {
    storeName: { value: 'pages', configurable: false, enumerable: false, writable: false }
});
Pages.prototype.constructor = Pages;

Pages.prototype.serialize = function() {
    var obj = { 
        title: this.title,
        content: this.content,
        updatedAt: new Date()
    }
    
    if (this.id) {
        obj.id = this.id;
    }

    return obj;
};

Pages.prototype.deserialize = function(obj) {
    var page = new Pages();
    page.title = obj.title;
    page.content = obj.content;
    page.updatedAt = obj.updatedAt;
    page.id = obj.id;

    return page;
}

module.exports = Pages;
