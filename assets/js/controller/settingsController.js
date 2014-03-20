var q = require('q');
var p = require('page');

// DOM Element
var $content = document.getElementById('content');
var $list = document.getElementById('nav2');

// Models
var Config = require('../models/Config');
var configStore = new Config();

// Views
var ListView = require('../views/settingsListView');
var ShowView = require('../views/settingsShowView');

var controller = {
    showView: null,

    list: function(req, next) {
        if (this.showView) this.showView.destroy();

        this.listView = new ListView($list);

        configStore.getAll().then(function(configs) {
            this.listView.render(configs);

            if (next) {
                next();
            }
        }.bind(this));
    },

    show: function(req, next) {
        var configName = req.params.configName;

        if (this.showView) this.showView.destroy();

        this.showView = new ShowView($content);

        configStore.getByName(configName).then(function(config) {
            this.showView.render(config);
        }.bind(this));
    }
};

module.exports = controller;

