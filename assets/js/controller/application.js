var marked = require('marked');
var p = require('page');

var EditorView = require('../views/editorView');
var ListView = require('../views/pageListView');
var showView = require('../views/pageShowView');

var $content = document.getElementById('content');
var $list = document.getElementById('nav2');

var documents = new Array();

var controller = {
    // -- Middle ware -> affichage de la liste des page
    list: function(req, next) {
        if (this.listView) this.listView.destroy();

        this.listView = new ListView($list);

        dbWrapper.page.query().all().execute().done(function(results) {
            this.listView.render(results, Number(req.params.pageId) || 0);
        }.bind(this));

        if (next) {
            next();
        }
    },

    // -- POST on créer la page
    createPage: function(req) {

        var pageContent = req.state.page.content || this.editorView.getValue();
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
        this.editorView ? this.editorView.destroy() : null;
        this.showView ? this.showView.destroy() : null;

        this.showView = new showView($content);
        this.showView.render(req.state.page);
    },

    editPage: function(req) {
        this.editorView ? this.editorView.destroy() : null;
        this.editorView = new EditorView($content);
        this.editorView.render(req.state.page);
    }
};

module.exports = controller;