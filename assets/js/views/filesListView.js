require('../lib/gator-1.2.2');
var main_t = require('../tpl/templates.js')['files-list'];

function FilesListView($el, controller) {
    this.$el = $el;
    this.controller = controller || null;
}

FilesListView.prototype.render = function(data) {
    this.$el.innerHTML = main_t(data);

    this.bindEvent();
};

FilesListView.prototype.bindEvent = function() {
    this.$el.querySelector('#upload-file').addEventListener('change', this.onUploadFileChange.bind(this));
};

FilesListView.prototype.onUploadFileChange = function(e) {
    var fr = new FileReader();
    var file = e.currentTarget.files[0];
    if (file.type === 'text/plain') {
        fr.readAsText(file, "ASCII"); //FIXME gestion de l'encoding
    } else {
        fr.readAsDataURL(file);
    }
    
    fr.onload = function(evt) {
        this.controller.uploadFile(file, evt.target.result);
    }.bind(this);
};

FilesListView.prototype.destroy = function() {
    Gator(this.$el).off();
};

module.exports = FilesListView;
	
