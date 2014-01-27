var marked = require('marked');
var p = require('page');

var EditorView = require('../views/editorView');
var ListView = require('../views/pageListView');
var showView = require('../views/pageShowView');

var $content = document.getElementById('page');
var $list = document.getElementById('page-list');

var documents = new Array();

var controller = {
    // -- Middle ware -> affichage de la liste des page
    list: function(req, next) {
        if (this.listView) this.listView.destroy();

        this.listView = new ListView($list);

        console.log('Db: get pages');
        dbWrapper.page.query().all().execute().done(function(results) {
            this.listView.render(results, Number(req.params.pageId) || 0);
            if (next) {
                next();
            }
        }.bind(this));

    },

    // -- POST on créer la page
    createPage: function(req, next) {

        var pageContent = req.state.page.content || this.editorView.getValue();
        var pageTitle = req.state.page.title || "Page sans titre";
        var page = {
            title: pageTitle,
            content: pageContent,
            updateAt: new Date()
        };

        if (req.params.pageId) {
            page.id = req.params.pageId;
            dbWrapper.page.update(page).done(function(item) {
                req.unhandled = true;
                p.show('/page/' + item.id, {}, true);
            });
        } else {
            dbWrapper.page.add(page).done(function(item) {
                req.unhandled = true;
                p.show('/page/' + item.id, {}, true);
            });
        }


    },

    addPage: function(req) {
        var page = {
            title: 'new page',
            content: ''
        };
        dbWrapper.page.add(page).done(function(item) {
            req.unhandled = true;
            p.show('/page/' + item.id + '/edit', {}, true);
        });

    },

    // -- GET on affiche une page
    showPage: function(req) {
        var pageId = req.params.pageId;

        this.editorView ? this.editorView.destroy() : null;
        this.showView ? this.showView.destroy() : null;

        this.showView = new showView($content);

        dbWrapper.page.query().filter('id', pageId).execute().done(function(results) {
            console.log(results[0]);
            this.showView.render(results[0]);
        }.bind(this));
    },

    editPage: function(req) {
        var pageId = req.params.pageId;

        this.editorView ? this.editorView.destroy() : null;
        this.editorView = new EditorView($content);
        dbWrapper.page.query().filter('id', pageId).execute().done(function(results) {
            this.editorView.render(results[0]);
        }.bind(this));

    }
};

module.exports = controller;