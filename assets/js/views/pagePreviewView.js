var marked = require('marked');

function PagePreviewView($el) {
    this.$el = $el;
}

PagePreviewView.prototype.render = function(data) {
    this.$el.innerHTML = [ '<div class="preview">', marked(data || ""), '</div>'].join('');
};

PagePreviewView.prototype.destroy = function() {
    this.$el.innerHTML = "";
};

module.exports = PagePreviewView;