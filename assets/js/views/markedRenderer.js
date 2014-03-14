var filesController = require('../controller/filesController');
var marked = require('marked');


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


// --- Renderer - essaie d'intégration d'image
var renderer = function(text, level) {
    var textName = guid();
    var render = '';
    if (!this._cache) {
        this._cache = [];
    }
    if(this._cache[text]){
        render = '<div class="file '+textName+'">'+this._cache[text]+'</div>';
    } else {
        render = '<div class="file '+textName+'"></div>'; // FIXME foutu asynchrone

        filesController.getFile(text)
            .then(function(fileContent) {
                if(fileContent.content.contains('base64')){ // TODO stocker le type en bd
                    this._cache[text] = '<img src="'+fileContent.content+'" />';
                    document.querySelector('.file.'+textName).innerHTML = this._cache[text] ;
                } else {
                    this._cache[text] = fileContent.content;
                    document.querySelector('.file.'+textName).innerHTML = fileContent.content;
                }
            }.bind(this))
            .fail(function(error){
                document.querySelector('.file.'+textName).innerHTML = '<b>'+error+'</b>';
            }.bind(this));
    }
    return render;
};

var customRenderer = new marked.Renderer();
customRenderer.image = renderer;

module.exports=customRenderer;
