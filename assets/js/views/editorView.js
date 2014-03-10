var marked = require('marked');
var p = require('page');
var q = require('q');
var main_t = require('../tpl/templates.js')['editor-main'];
var tool_t = require('../tpl/templates.js')['editor-toolbar'];
var preview_t = require('../tpl/templates.js')['editor-preview'];
var renderer = require('./markedRenderer');



function EditorView($el, controller) {
    this.$el = $el;
    this.cm = null;
    this.onContentUpdated = function() {};
    this.controller = controller;
}

EditorView.prototype.render = function(data) {
    this.data = data || {};

    this.$el.innerHTML = main_t();
    this.$el.querySelector('.toolbar').innerHTML = tool_t(this.data);

    this.$el.querySelector('.preview').innerHTML = marked(this.data.content,{renderer: renderer});

     // Mise en place de Code Mirror
    this.cm = CodeMirror(this.$el.querySelector('.content'), {
        value: this.data.content || '',
        mode: 'markdown'
    });

    this.bindEvent();
};

EditorView.prototype.bindEvent = function() {
    this.$el.querySelector('.title .show').addEventListener('click', this.onTitleShowClick.bind(this));
    this.$el.querySelector('.title .edit').addEventListener('blur', this.onTitleEditBlur.bind(this));

    this.cm.on('change', this.onCodeMirrorChange.bind(this));

    this.$el.querySelector('#show-preview').addEventListener('click', this.onTogglePreviewClick.bind(this));

    this.$el.querySelector('#save').addEventListener('click', this.onSaveClick.bind(this));

    this.$el.querySelector('#delete').addEventListener('click', this.onDeleteClick.bind(this));

    this.$el.querySelector('#upload').addEventListener('change', this.onUploadChange.bind(this));
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

EditorView.prototype.onCodeMirrorChange = function(e) {
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

EditorView.prototype.destroy = function() {
    this.cm = null;
    this.$el.classList.remove('with-preview');
    this.$el.innerHTML = '';
};

EditorView.prototype.getValue = function() {
    return this.cm.getValue();
};

module.exports = EditorView;
