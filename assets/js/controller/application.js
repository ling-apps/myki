var p = require('page');

var EditorView = require('../views/editorView');
var ListView = require('../views/pageListView');
var PreviewView = require('../views/pagePreviewView');

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

var controller = {
    // -- Middle ware -> affichage de la liste des page
    list: function(req, next) {
        if (this.listView) this.listView.destroy();

        this.listView = new ListView($list);

        store.all('page').then(function(data) {
            this.listView.render(data, Number(req.params.pageId) || 0);
        }).fail(function(errorCode) {
            console.log('error', errorCode);
        });


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

    showTool: function(req, next) {
        var tpl = [];
        var saveUrl = "/page/create";
        if (req.params.pageId) {
            saveUrl += "/" + req.params.pageId;
        }

        var isEdit = /edit/.test(req.path);
        if (isEdit) {
            tpl.push('<a href="' + saveUrl + '">Enregistrer</a>');

            tpl.push('<a class="show-preview" href="">Show preview</a>');
        } else {
            tpl.push('<a href="/page/edit/' + req.params.pageId + '">Editer</a>');
        }

        var $actions = document.getElementById('actions');
        $actions.innerHTML = tpl.join(' | ');

        if (isEdit) {
            var showPreview = controller.showPreview;
            $actions.querySelector('.show-preview').addEventListener('click', function(e) {
                e.preventDefault();
                showPreview();
            }.bind(this), false);
        }

        next();
    },

    // -- GET on affiche une page
    showPage: function(req) {
        var pageId = req.params.pageId;

        this.editorView ? this.editorView.destroy() : null;
        this.previewView ? this.previewView.destroy() : null;
        this.previewView = new PreviewView($content);
        this.previewView.render(pages[pageId].content);
    },

    editPage: function(req) {
        var pageId = req.params.pageId;

        this.editorView ? this.editorView.destroy() : null;
        this.editorView = new EditorView($content);
        this.editorView.render(pages[pageId]);
    },

    // --- GET show preview
    showPreview: function() {
        console.log('show preview');
        this.previewView = new PreviewView($preview);
        $content.classList.add('with-preview');
        this.previewView.render(this.editorView.getValue());
        this.editorView.onContentUpdated = function(content) {
            this.previewView.render(content);
        }.bind(this);
    },

    // -- GET new page formulaire
    newPage: function(req) {
        this.editorView ? this.editorView.destroy() : null;

        this.editorView = new EditorView($content);
        this.editorView.render();
    }
};

module.exports = controller;