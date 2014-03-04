module.exports = (function(){
function encodeHTMLSource() {  var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;' },  matchHTML = /&(?!#?w+;)|<|>|"|'|\//g;  return function() {    return this ? this.replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : this;  };};
String.prototype.encodeHTML=encodeHTMLSource();
var tmpl = {};
  tmpl['editor-main']=function anonymous(it) {
var out='<div class="toolbar"></div><div class="content"></div><div class="preview hidden"></div>';return out;
};
  tmpl['editor-preview']=function anonymous(it) {
var out='';return out;
};
  tmpl['editor-toolbar']=function anonymous(it) {
var out='<div class="title"><div class="show">'+( it.title )+'</div><input class="edit" type="text" name="title" value="'+( it.title )+'" /></div><div class="pull-right"><a class="icon icon-save" id="save" href="/page/'+( it.id !== undefined ? it.id + '/' : '' )+'save">Enregistrer</a><a class="icon icon-preview" id="show-preview">preview</a></div><div><input type="file" id="upload"/></div>';return out;
};
  tmpl['list-main']=function anonymous(it) {
var out='<h3> Pages </h3><a href="/page/add" class="">Ajouter une page</a><ul class="menu pages-list">';if(it.length > 0){var arr1=it;if(arr1){var page,index=-1,l1=arr1.length-1;while(index<l1){page=arr1[index+=1];out+='<li class="page" data-page-id="'+( page.id )+'"><a href="/page/'+( page.id )+'">'+( page.title )+'</a></li>';} } }else{out+='<p class="empty-page-list">Aucune page pour l\'instant. Pour créer votre première page, utiliser le lien ci-dessus.</p>';}out+='</ul>';return out;
};
  tmpl['show-main']=function anonymous(it) {
var out='<div class="show-wrapper"><div class="toolbar"></div><div class="content"></div></div>';return out;
};
  tmpl['show-page']=function anonymous(it) {
var out=''+( it );return out;
};
  tmpl['show-toolbar']=function anonymous(it) {
var out='<a class="icon icon-edit" id="edit-page" href="/page/'+( it.id )+'/edit">Editer</a><div class="title">'+( it.title )+'</div>';return out;
};
return tmpl;})();