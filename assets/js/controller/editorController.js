// Libs
var marked = require('marked');
var q = require('q');
q.stopUnhandledRejectionTracking();

// Views
var EditorView = require('../views/editorView');

// Models
var Files = require('../models/Files');
var filesStore = new Files();

// Dom
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

    filesStore.getByName(filename).then(function(file) {
        if (file) {
            deferred.resolve(file);
        } else {
            deferred.reject('file not found');
        }
    });
   
    return deferred.promise;
};

EditorController.prototype.uploadFile = function(content) {
    var file = new Files();
    file.name = 'titi';
    file.content = content;
    file.save();
};

EditorController.prototype.destroy = function() {
    this.editorView.destroy();
};

module.exports = EditorController;
