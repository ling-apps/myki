var marked = require('marked');

var main_t = require('../tpl/templates')['show-main'];
var toolbar_t = require('../tpl/templates')['show-toolbar'];
var page_t = require('../tpl/templates')['show-page'];

function PagePreviewView($el) {
    this.$el = $el;
}

PagePreviewView.prototype.render = function(data) {
    this.$el.innerHTML = main_t();
    this.$el.querySelector('.toolbar').innerHTML = toolbar_t(data);
    this.$el.querySelector('.content').innerHTML = page_t(marked(data.content || ""));
};

PagePreviewView.prototype.destroy = function() {
    this.$el.innerHTML = "";
};

module.exports = PagePreviewView;