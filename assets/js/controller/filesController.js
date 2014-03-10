var q = require('q');

// DOM Element
var $content = document.getElementById('content');
var $list = document.getElementById('nav2');

// Models
var Files = require('../models/Files');
var filesStore = new Files();

// Views
var ListView = require('../views/filesListView');
var ShowView = require('../views/filesShowView');

var controller = {
    listView: null,
    showView: null,

    // List des documents
    list: function(req, next) {
        if (this.listView) this.listView.destroy();

        this.listView = new ListView($list, controller);

        filesStore.getAll().then(function(files) {
            this.listView.render(files);

            if (next) {
                next();
            }
        }.bind(this));
    },

    show: function(req, next) {
        if (this.showView) this.showView.destroy();

        this.showView = new ShowView($content);

        filesStore.get(req.params.fileId).then(function(file) {
            this.showView.render(file);
        }.bind(this));
    },

    uploadFile: function(domFile, fileContent) {
        var file = new Files();
        file.name = domFile.name;
        file.content = fileContent;
        file.updatedAt = new Date();
        file.save();
    },

    getFile: function(filename) {
    var deferred = q.defer();

        filesStore.getByName(filename).then(function(file) {
            if (file) {
                deferred.resolve(file);
            } else {
                deferred.reject('file not found');
            }
        });

        return deferred.promise;
    }

};

module.exports = controller;

