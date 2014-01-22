function EditorView($el) {
    this.$el = $el;
    this.cm = null;
    this.onContentUpdated = function() {};
}

EditorView.prototype.render = function(data) {
    data = data || {};
    this.$el.innerHTML = '<div id="cm"></div>';
    this.cm = CodeMirror(this.$el.querySelector('#cm'), {
        value: data.content || '',
        mode: 'markdown'
    });

    this.cm.on('change', this.contentUpdated.bind(this));
};

EditorView.prototype.destroy = function() {
    console.log('destroy editor view');
    this.cm = null;
    this.$el.innerHTML = '';
};

EditorView.prototype.getValue = function() {
    return this.cm.getValue();
};

EditorView.prototype.contentUpdated = function(cb) {
    this.onContentUpdated.call(this, this.getValue());
}

module.exports = EditorView;