var marked = require('marked');
var p = require('page');
var q = require('q');
var main_t = require('../tpl/templates.js')['editor-main'];
var tool_t = require('../tpl/templates.js')['editor-toolbar'];
var preview_t = require('../tpl/templates.js')['editor-preview'];

/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

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
        var textName = guid();
        var render = '<div class="file '+textName+'"></div>'; // FIXME foutu asynchrone
        this.controller.getFile(text)
            .then(function(fileContent) {
                    if(fileContent.content.contains('base64')){ // TODO stocker le type en bd
                        this.$el.querySelector('.file.'+textName).innerHTML = '<img src="'+fileContent.content+'" />';
                    } else {
                        this.$el.querySelector('.file.'+textName).innerHTML = fileContent.content;
                    }
                }.bind(this))
            .fail(function(error){
                    this.$el.querySelector('.file.'+textName).innerHTML = '<b>'+error+'</b>';
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
    // TODO refactorer avec le controller filesController
    this.$el.querySelector('#upload').addEventListener('change',function(e){
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
