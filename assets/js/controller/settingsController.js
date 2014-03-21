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
    listView: null,
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

        this.showView = new ShowView($content, controller);

        configStore.getByName(configName).then(function(config) {
            this.showView.render(config, configName);
        }.bind(this));
    },

    update: function(configName, data) {
        return configStore.getByName(configName).then(function(config) {
            if (!config) {
                throw new Error("Can't access config object ", configName);
            }

            for (var prop in data) {
                config.set(prop, data[prop]);
            }

            return config.save()
        });
    }
};

module.exports = controller;

