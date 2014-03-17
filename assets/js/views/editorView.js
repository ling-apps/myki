var marked = require('marked');
var brace = require('brace');
require('brace/mode/markdown');
require('brace/theme/chrome');
var p = require('page');
var main_t = require('../tpl/templates.js')['editor-main'];
var tool_t = require('../tpl/templates.js')['editor-toolbar'];
var preview_t = require('../tpl/templates.js')['editor-preview'];
var insert_t = require('../tpl/templates.js')['editor-insertImage'];
var renderer = require('./markedRenderer');
var format = require('format');



function EditorView($el, controller) {
    this.$el = $el;
    this.editor = null;
    this.onContentUpdated = function() {};
    this.controller = controller;
}

EditorView.prototype.render = function(data) {
    this.data = data || {};

    this.$el.innerHTML = main_t();
    this.$el.querySelector('.toolbar').innerHTML = tool_t(this.data);

    this.$el.querySelector('.preview').innerHTML = marked(this.data.content,{renderer: renderer});

     // Mise en place de Code Mirror
    this.editor = ace.edit(this.$el.querySelector('.content'));
    this.editor.setTheme('ace/theme/chrome');
    this.editor.getSession().setMode('ace/mode/markdown');
    this.editor.renderer.setShowGutter(false);
    this.editor.setHighlightActiveLine(false);
    this.editor.setShowPrintMargin(false);
    this.editor.setSelectionStyle('text');

    this.editor.setValue(data.content);

    this.bindEvent();
};

EditorView.prototype.bindEvent = function() {
    this.$el.querySelector('.title .show').addEventListener('click', this.onTitleShowClick.bind(this));
    this.$el.querySelector('.title .edit').addEventListener('blur', this.onTitleEditBlur.bind(this));

    this.editor.getSession().on('change', this.onEditorChange.bind(this));

    this.$el.querySelector('#show-preview').addEventListener('click', this.onTogglePreviewClick.bind(this));

    this.$el.querySelector('#save').addEventListener('click', this.onSaveClick.bind(this));

    this.$el.querySelector('#delete').addEventListener('click', this.onDeleteClick.bind(this));

    this.$el.querySelector('#insertimage').addEventListener('click', this.onInsertImageClick.bind(this));
};

EditorView.prototype.onTitleShowClick = function(e) {
    var titleWrapper = this.$el.querySelector('.title');
    titleWrapper.classList.add('editing');
    var editInput = titleWrapper.querySelector('.edit');
    editInput.value = e.target.textContent;
    editInput.focus();

};

EditorView.prototype.onTitleEditBlur = function(e) {
    var titleWrapper = this.$el.querySelector('.title');
    titleWrapper.classList.remove('editing');
    titleWrapper.querySelector('.show').innerHTML = e.target.value;
};

EditorView.prototype.onEditorChange = function(e) {
    this.$el.querySelector('.preview').innerHTML = marked(this.getValue(),{renderer: renderer});
};

EditorView.prototype.onTogglePreviewClick = function(e) {
    this.$el.classList.toggle('with-preview');
    this.$el.querySelector('.preview').classList.toggle('hidden');
};

EditorView.prototype.onSaveClick = function(e) {
    e.preventDefault();
    var page = {
        content: this.getValue(),
        title: this.$el.querySelector('.title [name="title"]').value
    };

    var url = '/pages/' + this.data.id + '/save';
    p.show(url, { data: page}, true);
};

EditorView.prototype.onDeleteClick = function(e) {
    e.preventDefault();
    var url = '/pages/' + this.data.id + '/destroy';
    p.show(url, {}, true);
};

EditorView.prototype.onUploadChange = function(e) {
    var fr = new FileReader();
    var file = e.currentTarget.files[0];
    if (file.type === 'text/plain'){
        fr.readAsText(file, "ASCII"); //FIXME gestion de l'encoding
    } else {
        fr.readAsDataURL(file);
    }
    fr.onload = function(evt) {
        this.controller.uploadFile(evt.target.result, file.name);
    }.bind(this);

};

EditorView.prototype.onInsertImageClick = function(e) {
    e.preventDefault();
    e.target.classList.toggle('active');

    var imagesList = this.$el.querySelector('.images-list');
    imagesList.classList.toggle('hidden');

    if(!imagesList.classList.contains('hidden')) {
        this.controller.getImagesList().then(function(images) {
            this.renderImageListView(images);
        }.bind(this));
    }
};

EditorView.prototype.renderImageListView = function(images) {
    var imagesList = this.$el.querySelector('.images-list');
    imagesList.innerHTML = insert_t(images);

    // Bind image src input
    this.$el.querySelector('.images-list .add-from-url').addEventListener('submit', function(e) {
        e.preventDefault();
        this.$el.querySelector('.images-list').classList.add('hidden');
        this.$el.querySelector('#insertimage').classList.toggle('active');

        var url = e.target.querySelector('[name="url"]').value;

        var str = format('![%s](%s)', url, url);
        this.insert(str);
    }.bind(this));

    // Bind image selection
    this.$el.querySelector('.images-list .images').addEventListener('click', function(e) {
        this.$el.querySelector('.images-list').classList.add('hidden');
        this.$el.querySelector('#insertimage').classList.toggle('active');

        var name = e.target.getAttribute('data-image-title');
        var str = '![' + name + '](' + name + ')';

        this.insert(str);
    }.bind(this));
};

EditorView.prototype.insert = function(string) {
    this.editor.insert(string);
};

EditorView.prototype.destroy = function() {
    this.editor = null;
    this.$el.classList.remove('with-preview');
    this.$el.innerHTML = '';
};

EditorView.prototype.getValue = function() {
    return this.editor.getValue();
};

module.exports = EditorView;
