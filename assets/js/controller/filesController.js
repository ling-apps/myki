// DOM Element
var $content = document.getElementById('content');
var $list = document.getElementById('nav2');

// Models
var Files = require('../models/Files');
var filesStore = new Files();

var controller = {
    // -- Middle ware -> affichage de la liste des page
    list: function(req, next) {
        filesStore.getAll().then(function(files) {
            console.log(files);
        });
    }
};

module.exports = controller;

