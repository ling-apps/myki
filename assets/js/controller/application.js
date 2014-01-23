var p = require('page');
var marked = require('marked');

var EditorView = require('../views/editorView');
var ListView = require('../views/pageListView');
var showView = require('../views/pageShowView');

var $content = document.getElementById('page');
var $list = document.getElementById('page-list');

var pages = [
];

var controller = {
    // -- Middle ware -> affichage de la liste des page
    list: function(req, next) {
        if (this.listView) this.listView.destroy();

        this.listView = new ListView($list);

        this.listView.render(pages, Number(req.params.pageId) || 0);


        if (next) {
            next();
        }
    }

    // -- POST on créer la page
    createPage: function(req, next) {
        console.log(req, id, page);

        var pageContent = req.state.page.content || this.editorView.getValue();
        var pageTitle = req.state.page.title || "Page sans titre";
        var id = req.params.pageId || pages.length;
        var page = {
            title: pageTitle,
            content: pageContent,
            updateAt: new Date(),
            id: id
        };

        pages[id] = page;

        p('/page/' + page.id);

        next();
    },

    addPage: function(req) {
        var id = pages.length;
        pages.push({
            title: 'new page',
            content: '',
            id: id
        });

        page[id] = page;

        p('/page/' + id + '/edit');
    },

    // -- GET on affiche une page
    showPage: function(req) {
        console.log(req);
        var pageId = req.params.pageId;

        this.editorView ? this.editorView.destroy() : null;
        this.showView ? this.showView.destroy() : null;

        this.showView = new showView($content);
        var data = {
            title: pages[pageId].title,
            content: pages[pageId].content,
            id: pages[pageId].id,
            preview: marked(pages[pageId].content)
        };
        this.showView.render(data);
    },

    editPage: function(req) {
        var pageId = req.params.pageId;

        this.editorView ? this.editorView.destroy() : null;
        this.editorView = new EditorView($content);
        this.editorView.render(pages[pageId]);
    },

    // -- GET new page formulaire
    newPage: function(req) {
        this.editorView ? this.editorView.destroy() : null;

        this.editorView = new EditorView($content);
        this.editorView.render();
    }
};

module.exports = controller;