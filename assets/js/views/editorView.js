var marked = require('marked');
var p = require('page');
var q = require('q');
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

     // Mise en place de Code Mirror
    this.cm = CodeMirror(this.$el.querySelector('.content'), {
        value: data.content || '',
        mode: 'markdown'
    });

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
    var renderer = function(text, level) {
        var render = '<div class="img"></div>'; //TODO uuid ou autre pour gérer plusieurs images
        this.controller.getFile(text)
            .then(function(fileContent) {
                    this.$el.querySelector('.img').innerHTML = fileContent.content;
                }.bind(this))
            .fail(function(error){
                    this.$el.querySelector('.img').innerHTML = '<b>'+error+'</b>';
                }.bind(this));
        return render;
    }.bind(this);
    var customRenderer = new marked.Renderer();
    customRenderer.image = renderer;

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

        var url = '/pages/' + data.id + '/save';
        p.show(url, {data: page}, true);
        //p(url, {page: page});
    }.bind(this));

    // Upload d'un fichier
    this.$el.querySelector('#upload').addEventListener('change',function(e){
    	var fr = new FileReader();
    	var file = e.currentTarget.files[0];
    	fr.readAsText(file, "ASCII");

	    fr.onload = function(evt) {
 		    alert(evt.target.result);
            this.controller.uploadFile(evt.target.result);
    	}.bind(this);
    }.bind(this));
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
