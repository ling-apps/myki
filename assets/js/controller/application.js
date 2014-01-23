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

        this.listView.render(documents, Number(req.params.pageId) || 0);

        if (next) {
            next();
        }
    },

    // -- POST on créer la page
    createPage: function(req, next) {

        var pageContent = req.state.page.content || this.editorView.getValue();
        var pageTitle = req.state.page.title || "Page sans titre";
        var id = req.params.pageId || documents.length;
        var page = {
            title: pageTitle,
            content: pageContent,
            updateAt: new Date(),
            id: id
        };

        documents[id] = page;

        req.unhandled = true;
        p.show('/page/' + page.id, {}, true);
    },

    addPage: function(req) {
        var id = documents.length;
        documents.push({
            title: 'new page',
            content: '',
            id: id
        });
        req.unhandled = true;
        p.show('/page/' + id + '/edit', {}, true);
    },

    // -- GET on affiche une page
    showPage: function(req) {
        var pageId = req.params.pageId;

        this.editorView ? this.editorView.destroy() : null;
        this.showView ? this.showView.destroy() : null;

        this.showView = new showView($content);
        var data = {
            title: documents[pageId].title,
            content: documents[pageId].content,
            id: documents[pageId].id,
            preview: marked(documents[pageId].content)
        };
        this.showView.render(data);
    },

    editPage: function(req) {
        var pageId = req.params.pageId;

        this.editorView ? this.editorView.destroy() : null;
        this.editorView = new EditorView($content);
        this.editorView.render(documents[pageId]);
    },

    // -- GET new page formulaire
    newPage: function(req) {
        this.editorView ? this.editorView.destroy() : null;

        this.editorView = new EditorView($content);
        this.editorView.render();
    }
};

module.exports = controller;