var q = require('q');
var p = require('page');

// DOM Element
var $content = document.getElementById('content');
var $list = document.getElementById('nav2');

// Models

// Views
var ShowView = require('../views/settingsShowView');

var controller = {
    showView: null,

    show: function(req, next) {
        if (this.showView) this.showView.destroy();

        this.showView = new ShowView($list);
        this.showView.render({});

        // NO content for now
        $content.innerHTML = "<h1>Settings</h1>";
    }
};

module.exports = controller;

