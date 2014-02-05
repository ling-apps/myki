var marked = require('marked');
var p = require('page');

var main_t = require('../tpl/templates.js')['editor-main'];
var tool_t = require('../tpl/templates.js')['editor-toolbar'];
var editor_t = require('../tpl/templates.js')['editor-editor'];
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
    this.$el.querySelector('.content').innerHTML = editor_t(data);

    this.$el.querySelector('.preview').innerHTML = marked(data.content,{renderer: customRenderer});
    
    // Titre - edit-in-place 
    var titleWrapper = this.$el.querySelector('.title');
    this.$el.querySelector('.title .show').addEventListener('click', function(e) {
        titleWrapper.classList.add('editing');
        var editInput = titleWrapper.querySelector('.edit');
        editInput.value = e.target.textContent;
        editInput.focus();
    }, false);

    this.$el.querySelector('.title .edit').addEventListener('blur', function(e) {
        titleWrapper.classList.remove('editing');
        titleWrapper.querySelector('.show').innerHTML = e.target.value;
    });

    // Render - essaie d'intégration d'image
    var customRenderer = new marked.Renderer();
    customRenderer.image = function(text, level) {
        var file = this.controller.getFile(text);
        return '<div>'+file+'TEST RENDER</div>';
    }.bind(this);

    // Mise en place de Code Mirror
    this.cm = CodeMirror(this.$el.querySelector('#cm'), {
        value: data.content || '',
        mode: 'markdown'
    });

    // Update de la preview à chaque modification de Code Mirror
    this.cm.on('change', function(e) {
        this.$el.querySelector('.preview').innerHTML = marked(this.getValue(),{renderer: customRenderer});
    }.bind(this));

    // Afficher / Masquer la preview
    this.$el.querySelector('#show-preview').addEventListener('click', function() {
        this.$el.classList.toggle('with-preview');
        this.$el.querySelector('.preview').classList.toggle('hidden');
    }.bind(this), false);

    // Sauvegarde
    this.$el.querySelector('#save').addEventListener('click', function(e) {
        e.preventDefault();
        var page = {
            content: this.getValue(),
            title: this.$el.querySelector('.title [name="title"]').value
        };

        var url = '/page/' + data.id + '/save';
        p.show(url, {page: page}, true);
        //p(url, {page: page});
    }.bind(this));

    // Upload d'un fichier
    this.$el.querySelector('#upload').addEventListener('change',function(e){
    	var fr = new FileReader();
    	var file = e.currentTarget.files[0];
    	fr.readAsText(file, "ASCII");

	    fr.onload = function(evt) {
 		    alert(evt.target.result);
       		var div = document.createElement("div");
    		div.innerHTML = evt.target.result;
    		this.cm.addWidget({line: null, ch: null}, div,true);
    	}.bind(this);
    }.bind(this));
};

EditorView.prototype.destroy = function() {
    this.cm = null;
    this.$el.innerHTML = '';
};

EditorView.prototype.getValue = function() {
    return this.cm.getValue();
};

module.exports = EditorView;
