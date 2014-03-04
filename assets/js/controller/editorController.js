var marked = require('marked');
var p = require('page');
var q = require('q');
q.stopUnhandledRejectionTracking();

var EditorView = require('../views/editorView');

var $content = document.getElementById('content');

function EditorController () {
    this.editorView = null;
}

EditorController.prototype.render = function() {

};

EditorController.prototype.edit = function(page) {
    this.editorView ? this.editorView.destroy() : null;
    this.editorView = new EditorView($content, this);
    this.editorView.render(page);
};

EditorController.prototype.getFile = function(filename) {
    var deferred = q.defer();

    dbWrapper.files.query().filter('name', filename).execute().done(function(file){
        if(file[0]){
            deferred.resolve(file[0]);
        } else {
            deferred.reject('file not found');
        }
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
