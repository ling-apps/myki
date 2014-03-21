// Libs
var q = require('q');
q.stopUnhandledRejectionTracking();

// Views
var EditorView = require('../views/editorView');

// Models
var Files = require('../models/Files');
var filesStore = new Files();
var Config = require('../models/Config');
var configStore = new Config();

// Dom
var $content = document.getElementById('content');

function EditorController () {
    this.editorView = null;
}

EditorController.prototype.render = function() {

};

EditorController.prototype.getImagesList = function() {
    return filesStore.getAll();
};

EditorController.prototype.edit = function(page) {
    this.editorView ? this.editorView.destroy() : null;
    this.editorView = new EditorView($content, this);
    configStore.getByName('editor').then(function(config) {
        this.editorView.render(page, config);
    }.bind(this));
};

EditorController.prototype.uploadFile = function(content, name) {
    var file = new Files();
    file.name = name;
    file.content = content;
    file.save();
};

EditorController.prototype.destroy = function() {
    this.editorView.destroy();
};

module.exports = EditorController;

// Bootstrap
var Config = require('../models/Config');

new Config().getByName('editor').then(function(config) {
    if (Object.keys(config.properties).length === 0) {
        config.properties = {
            'preview': {
                'label': 'Preview position',
                'options': ['bottom', 'right'],
                'value': 'right',
                'configurable': true
            }
        };
    
        config.save();
    }
});
