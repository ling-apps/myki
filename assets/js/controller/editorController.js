var marked = require('marked');
var p = require('page');
var q = require('q');
var Page = require('../models/Page');

var EditorView = require('../views/editorView');        
//var ListView = require('../views/pageListView');
//var showView = require('../views/pageShowView');

var $content = document.getElementById('content');

function EditorController () {
    this.editorView = null;
}

EditorController.prototype.render = function() {
    
};

EditorController.prototype.edit = function(req) {
    var pages = new Page();
    pages.get(req.params.pageId).done(function(page) {
        this.page = page;
        this.editorView ? this.editorView.destroy() : null;
        this.editorView = new EditorView($content, this);
        this.editorView.render(this.page);
    }.bind(this));
};

EditorController.prototype.save = function(page) {
    this.page.title = page.title;
    this.page.content = page.content;
    page.save();

    var url = '/page/' + data.id + '/save';
    p.show(url, {page: page}, true);
};

EditorController.prototype.getFile = function(filename) {
    var deferred = q.defer();

    dbWrapper.files.query('name', filename).all().execute().done(function(file){
        deferred.resolve(file[0]);
    });
    
    return deferred.promise;
};

EditorController.prototype.uploadFile = function(content) {
    dbWrapper.files.add({name: "titi", content: content}); 
};

EditorController.prototype.destroy = function() {
    this.editorView.destroy();
};

module.exports = EditorController;
