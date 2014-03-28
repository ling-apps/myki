// Libs
var marked = require('marked');
var p = require('page');

// Controllers
var EditorController = require('../controller/editorController');

// Views
var ListView = require('../views/pageListView');
var showView = require('../views/pageShowView');

// DOM Element
var $content = document.getElementById('content');
var $list = document.getElementById('nav2');

// Models
var Pages = require('../models/Pages');
var pagesStore = new Pages();

var controller = {
    listView: null,
    showView: null,

    // -- Middle ware -> affichage de la liste des page
    list: function(req, next) {
        if (this.listView) this.listView.destroy();

        this.listView = new ListView($list);

        pagesStore.getAll().then(function(allPages) {
            this.listView.render(allPages,  Number(req.params.pageId) || 0);

            if (next) {
                next();
            }
        }.bind(this));

    },

    // -- POST on créer la page
    savePage: function(req) {
        pagesStore.get(req.params.pageId).then(function(page) {        
            page.title = req.state.data.title;
            page.content = req.state.data.content;

            page.save().then(function() {
                req.unhandled = true;
                p.show('/pages/' + page.id, {}, true);
            });

        });
    },

    addPage: function(req) {
        var page = new Pages();
        page.title = 'new page';
        page.content = '# new page';

        page.save().then(function(result) {
            var id = result;
            req.unhandled = true;
            p.show('/pages/' + id + '/edit', {}, true);
        });
    },

    // -- GET on affiche une page
    showPage: function(req) {
        this.editorController ? this.editorController.destroy() : null;
        this.showView ? this.showView.destroy() : null;

        pagesStore.get(req.params.pageId).then(function(page) {
            this.showView = new showView($content);
            this.showView.render(page);
        });
    },

    editPage: function(req) {
        pagesStore.get(req.params.pageId).then(function(page) {
            this.editorController ? this.editorController.destroy() : null;
            this.editorController = new EditorController();
            this.editorController.edit(page);
        });
    },

    destroy: function(req, next) {
        var pageId = req.params.pageId;

        pagesStore.destroy(pageId).then(function(rs) {
            req.unhandled = true;
            p.show('/pages', {}, true);
        });
    },

    synchroPages: function(req, next) {
        console.log('controller');
        pagesStore.getAllFromServer().then(function(rs){
            console.log(rs);
            p.show('/pages', {}, true);
        });
    },

    clearDb: function(req, next) {
        var Files = require('../models/Files');
        var filesStore = new Files();

        pagesStore.destroyAll().then(function() {
            return filesStore.destroyAll();
        }).then(function() {
            if (next) {
                next();
            }
        });
        
    }
}

module.exports = controller;
