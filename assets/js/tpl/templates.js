module.exports = (function(){
function encodeHTMLSource() {  var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;' },  matchHTML = /&(?!#?w+;)|<|>|"|'|\//g;  return function() {    return this ? this.replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : this;  };};
String.prototype.encodeHTML=encodeHTMLSource();
var tmpl = {};
  tmpl['editor-editor']=function anonymous(it) {
var out='<div class="editor-cm" id="cm"></div>';return out;
};
  tmpl['editor-main']=function anonymous(it) {
var out='<div class="editor-wrapper"><div class="toolbar"></div><div class="content"></div></div>';return out;
};
  tmpl['editor-preview']=function anonymous(it) {
var out='<div class="preview hidden"></div>';return out;
};
  tmpl['editor-toolbar']=function anonymous(it) {
var out='<a id="save" href="/page/'+( it.id !== undefined ? it.id + '/' : '' )+'save">Enregistrer</a><div class="pull-right"><button id="show-preview">preview</button></div>';return out;
};
  tmpl['show-main']=function anonymous(it) {
var out='<div class="show-wrapper"><div class="toolbar"></div><div class="content"></div></div>';return out;
};
  tmpl['show-page']=function anonymous(it) {
var out=''+( it.preview );return out;
};
  tmpl['show-toolbar']=function anonymous(it) {
var out='<a class="edit" id="edit-page" href="/page/'+( it.id )+'/edit">Editer</a>';return out;
};
return tmpl;})();