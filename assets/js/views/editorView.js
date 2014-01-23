var marked = require('marked');
var p = require('page');

var main_t = require('../tpl/templates.js')['editor-main'];
var tool_t = require('../tpl/templates.js')['editor-toolbar'];
var editor_t = require('../tpl/templates.js')['editor-editor'];
var preview_t = require('../tpl/templates.js')['editor-preview'];

function EditorView($el) {
    this.$el = $el;
    this.cm = null;
    this.onContentUpdated = function() {};
}

EditorView.prototype.render = function(data) {
    data = data || {};

    this.$el.innerHTML = main_t();
    this.$el.querySelector('.toolbar').innerHTML = tool_t(data);
    this.$el.querySelector('.content').innerHTML = editor_t(data);
    this.$el.querySelector('.content').innerHTML += preview_t(data);

    this.cm = CodeMirror(this.$el.querySelector('#cm'), {
        value: data.content || '',
        mode: 'markdown'
    });

    this.cm.on('change', function(e) {
        this.$el.querySelector('.preview').innerHTML = marked(this.getValue());
    }.bind(this));

    this.$el.querySelector('#show-preview').addEventListener('click', function() {
        this.$el.querySelector('.preview').classList.toggle('hidden');
    }.bind(this), false);

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
    
    this.$el.querySelector('#upload').addEventListener('change',function(e){
    	var fr = new FileReader();
	var file = e.currentTarget.files[0];
	fr.readAsText(file, "ASCII");
	fr.onload = function(evt) {
	    alert(evt.target.result);
	};
    });
};

EditorView.prototype.destroy = function() {
    this.cm = null;
    this.$el.innerHTML = '';
};

EditorView.prototype.getValue = function() {
    return this.cm.getValue();
};

module.exports = EditorView;
