var marked = require('marked');
var p = require('page');

var Page = require('../models/Page');

var EditorController = require('../controller/editorController');
var ListView = require('../views/pageListView');
var showView = require('../views/pageShowView');

var $content = document.getElementById('content');
var $list = document.getElementById('nav2');

var controller = {
    // -- Middle ware -> affichage de la liste des page
    list: function(req, next) {
        if (this.listView) this.listView.destroy();

        this.listView = new ListView($list);

        var pages = new Page();
        pages.all().done(function(rs) {
            console.log('got pages:', rs);
            this.listView.render(rs, Number(req.params.pageId) || 0);

            if (next) {
                next();
            }
        }.bind(this));
    },

    // -- POST on créer la page
    createPage: function(req) {

        var pageContent = req.state.page.content || this.editorController.editorView.getValue();
        var pageTitle = req.state.page.title || "Page sans titre";
        var page = {
            title: pageTitle,
            content: pageContent,
            updateAt: new Date()
        };

        page.id = ~~ req.params.pageId;
        dbWrapper.page.update(page).done(function(item) {
            req.unhandled = true;
            p.show('/page/' + item[0].id, {}, true);
        });
    },

    addPage: function(req) {
        var page = {
            title: 'new page',
            content: '# new page'
        };
        dbWrapper.page.add(page).done(function(results) {
            var item = results[0];
            req.unhandled = true;
            p.show('/page/' + item.id + '/edit', {}, true);
        });
    },

    // -- GET on affiche une page
    showPage: function(req) {
        this.editorController ? this.editorController.destroy() : null;
        this.showView ? this.showView.destroy() : null;

        var pages = new Page();
        pages.get(req.params.pageId).done(function(page) {
            this.showView = new showView($content);
            this.showView.render(page);
        }.bind(this));
    },

    editPage: function(req) {
        this.editorController ? this.editorController.destroy() : null;
        this.editorController = new EditorController();
        this.editorController.edit(req);
    },

    clearDb: function(req, next) {
        dbWrapper.page.clear();

        if (next) {
            next();
        }
    }
};

module.exports = controller;
