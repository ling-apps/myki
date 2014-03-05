// DOM Element
var $content = document.getElementById('content');
var $list = document.getElementById('nav2');

// Models
var Files = require('../models/Files');
var filesStore = new Files();

// Views
var ListView = require('../views/filesListView');

var controller = {
    listView: null,

    // List des documents
    list: function(req, next) {
        if (this.listView) this.listView.destroy();

        this.listView = new ListView($list, controller);

        filesStore.getAll().then(function(files) {
            this.listView.render(files);
        }.bind(this));
    },

    uploadFile: function(domFile, fileContent) {
        var file = new Files();
        file.name = domFile.name;
        file.content = fileContent;
        file.updatedAt = new Date();
        console.log('saving file', file);
        file.save();
    }
};

module.exports = controller;

