var p = require('page');
var marked = require('marked');

var EditorView = require('../views/editorView');
var ListView = require('../views/pageListView');
var showView = require('../views/pageShowView');

var IDB = require('../lib/IDB');

var $content = document.getElementById('page');
var $list = document.getElementById('page-list');
var $preview = document.getElementById('page-preview');

var store = new IDB({
    dbName: 'myKi',
    onUpgrade: function(store) {
        console.log('upgrade needed');
        var store = createObjectStore('page', { keyPath: 'id', autoIncrement: true });
        store.createIndex('name', 'name', { unique: true });
    }
});


var pages = [
];
var controller = {
    // -- Middle ware -> affichage de la liste des page
    list: function(req, next) {
//        if (this.listView) this.listView.destroy();
//
//        this.listView = new ListView($list);
//
//        store.all('page').then(function(data) {
//            this.listView.render(data, Number(req.params.pageId) || 0);
//        }).fail(function(errorCode) {
//            console.log('error', errorCode);
//        });

        if (this.listView) this.listView.destroy();

        this.listView = new ListView($list);

        this.listView.render(pages, Number(req.params.pageId) || 0);


        if (next) {
            next();
        }
    },

    init: function(req, next) {
        $content.classList.remove('with-preview');
        next();
    },

    // -- POST on créer la page
    createPage: function(req) {
        var pageContent = this.editorView.getValue();
        var pageTitle = this.listView.getSelectedItemName();
        var id = req.params.pageId || pages.length;
        var page = {
            title: pageTitle,
            content: pageContent,
            updateAt: new Date(),
            id: id
        };

        pages[id] = page;


        p('/page/' + page.id);
    },

    addPage: function(req) {
        pages.push({
            title: 'new page',
            content: '',
            id: pages.length
        });

        p('/');
    },

    // -- GET on affiche une page
    showPage: function(req) {
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