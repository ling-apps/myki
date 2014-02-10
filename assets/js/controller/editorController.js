var marked = require('marked');
var p = require('page');
var q = require('q');

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
    this.editorView ? this.editorView.destroy() : null;
    this.editorView = new EditorView($content, this);
    this.editorView.render(req.state.page);
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
