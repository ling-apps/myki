require('../lib/gator-1.2.2');
var main_t = require('../tpl/templates.js')['files-list'];

function FilesListView($el, controller) {
    this.$el = $el;
    this.controller = controller || null;
}

FilesListView.prototype.render = function(data) {
    this.$el.innerHTML = main_t(data);
    
    this.$el.querySelector('#upload-file').addEventListener('change',function(e){
        var fr = new FileReader();
    	var file = e.currentTarget.files[0];
    	fr.readAsText(file, "ASCII");

	    fr.onload = function(evt) {
            this.controller.uploadFile(file, evt.target.result);
    	}.bind(this);

    }.bind(this));
};

FilesListView.prototype.destroy = function() {
    Gator(this.$el).off();
};

module.exports = FilesListView;
	
