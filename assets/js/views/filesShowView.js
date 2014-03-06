var main_t = require('../tpl/templates')['files-show'];

function FilesShowView($el) {
    this.$el = $el;
}

FilesShowView.prototype.render = function(data) {
    this.$el.innerHTML = main_t(data);
};

FilesShowView.prototype.destroy = function() {
    this.$el.innerHTML = "";
};

module.exports = FilesShowView;
