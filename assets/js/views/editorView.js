var marked = require('marked');
var p = require('page');

var main_t = require('../tpl/templates.js')['editor-main'];
var tool_t = require('../tpl/templates.js')['editor-toolbar'];
var preview_t = require('../tpl/templates.js')['editor-preview'];



function EditorView($el, controller) {
    this.$el = $el;
    this.cm = null;
    this.onContentUpdated = function() {};
    this.controller = controller;
}

EditorView.prototype.render = function(data) {
    data = data || {};

    this.$el.innerHTML = main_t();
    this.$el.querySelector('.toolbar').innerHTML = tool_t(data);

    this.$el.querySelector('.preview').innerHTML = marked(data.content,{renderer: customRenderer});

    // Render - essaie d'intégration d'image
    var customRenderer = new marked.Renderer();
    customRenderer.image = function(text, level) {
        this.controller.getFile(text).done(function(fileContent) {
            return '<div>' + fileContent + ' --TEST RENDER</div>';
        });
    }.bind(this);

    // Mise en place de Code Mirror
    this.cm = CodeMirror(this.$el.querySelector('.content'), {
        value: data.content || '',
        mode: 'markdown'
    });

    // Titre - edit-in-place 
    this.titleWrapper = this.$el.querySelector('.title');
    this.$el.querySelector('.title .show').addEventListener('click', this.titleClickHandler.bind(this));

    this.$el.querySelector('.title .edit').addEventListener('blur', this.titleBlurHandler.bind(this));


    // Update de la preview à chaque modification de Code Mirror
    this.cm.on('change', this.cmChangeHandler.bind(this));

    // Afficher / Masquer la preview
    this.$el.querySelector('#show-preview').addEventListener('click', this.togglePreviewHandler.bind(this));

    // Sauvegarde
    this.$el.querySelector('#save').addEventListener('click', this.saveClickHandler.bind(this));

    // Upload d'un fichier
    this.$el.querySelector('#upload').addEventListener('change', this.uploadFileHandler.bind(this));
};

EditorView.prototype.saveClickHandler = function(e) {
    e.preventDefault();
    var page = {
        content: this.getValue(),
        title: this.$el.querySelector('.title [name="title"]').value
    };

    this.controller.save(page);

}

EditorView.prototype.cmChangeHandler = function(e) {
    this.$el.querySelector('.preview').innerHTML = marked(this.getValue(),{renderer: customRenderer});
};

EditorView.prototype.togglePreviewHandler = function(e) {
        this.$el.classList.toggle('with-preview');
        this.$el.querySelector('.preview').classList.toggle('hidden');
};

EditorView.prototype.uploadFileHandler = function(e) {
    var fr = new FileReader();
    var file = e.currentTarget.files[0];
    fr.readAsText(file, "ASCII");

    fr.onload = function(evt) {
        alert(evt.target.result);
        this.controller.uploadFile(evt.target.result);
    }.bind(this);

};

EditorView.prototype.titleClickHandler = function(e) {
    this.titleWrapper.classList.add('editing');
    var editInput = this.titleWrapper.querySelector('.edit');
    editInput.value = e.target.textContent;
    editInput.focus();

};

EditorView.prototype.titleBlurHandler = function(e) {
    this.titleWrapper.classList.remove('editing');
    this.titleWrapper.querySelector('.show').innerHTML = e.target.value;
};


EditorView.prototype.destroy = function() {
    this.cm = null;
    this.$el.innerHTML = '';
};

EditorView.prototype.getValue = function() {
    return this.cm.getValue();
};

module.exports = EditorView;
