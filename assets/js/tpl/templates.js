module.exports = (function(){
function encodeHTMLSource() {  var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;' },  matchHTML = /&(?!#?w+;)|<|>|"|'|\//g;  return function() {    return this ? this.replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : this;  };};
String.prototype.encodeHTML=encodeHTMLSource();
var tmpl = {};
  tmpl['editor-insertImage']=function anonymous(it) {
var out='<h2>Inserer une image</h2><form class="add-from-url"><input type="text" name="url" placeholder="Url de l\'image" /></form><ul class="images">';var arr1=it;if(arr1){var image,index=-1,l1=arr1.length-1;while(index<l1){image=arr1[index+=1];out+='<li class="image" data-image-title="'+( image.name )+'" data-image-src="data:image/png;base64,'+( image.content ||'').toString().encodeHTML()+'">'+( image.name )+'</li>';} } out+='</ul>';return out;
};
  tmpl['editor-main']=function anonymous(it) {
var out='<div class="toolbar"></div><div class="content"></div><div class="preview hidden"></div><div class="images-list hidden"></div>';return out;
};
  tmpl['editor-preview']=function anonymous(it) {
var out='';return out;
};
  tmpl['editor-toolbar']=function anonymous(it) {
var out='<div class="pull-left"><a alt="Enregistrer" class="icon icon-save" id="save" href="/pages/'+( it.id !== undefined ? it.id + '/' : '' )+'save">Enregistrer</a><a alt="afficher/masquer la prévisualisation" class="icon icon-preview" id="show-preview">preview</a><a alt="supprimer" class="icon icon-delete" id="delete">delete</a></div><div class="title"><div class="show">'+( it.title )+'</div><input class="edit" type="text" name="title" value="'+( it.title )+'" /></div><div class="pull-right"><a alt="Inserer une image" href="" class="icon icon-insert-images" id="insertimage">Inserer une image</a></div>';return out;
};
  tmpl['files-list']=function anonymous(it) {
var out='<h3> Files </h3><label for="upload-file">Ajouter</label><input type="file" id="upload-file" />';if(it.length > 0){out+='<ul class="menu files-list">';var arr1=it;if(arr1){var file,index=-1,l1=arr1.length-1;while(index<l1){file=arr1[index+=1];out+='<li class="file" data-file-id="'+( file.id )+'"><a href="/files/'+( file.id )+'">'+( file.name )+'</a></li>';} } out+='</ul>';}else{out+='<div class="menu files-list"><p class="empty-page-list">Aucune fichier pour l\'instant. Pour ajouter votre premier fichier, utiliser le lien ci-dessus.</p></div>';}return out;
};
  tmpl['files-show']=function anonymous(it) {
var out='<img alt="'+( it.name ||'').toString().encodeHTML()+'" src="'+( it.content )+'" />';return out;
};
  tmpl['list-main']=function anonymous(it) {
var out='<h3> Pages </h3><a href="/pages/add" class="" id="add-page">Ajouter une page</a><ul class="menu pages-list">';if(it.length > 0){var arr1=it;if(arr1){var page,index=-1,l1=arr1.length-1;while(index<l1){page=arr1[index+=1];out+='<li class="item" data-page-id="'+( page.id )+'"><a href="/pages/'+( page.id )+'">'+( page.title )+'</a></li>';} } }else{out+='<p class="empty-page-list">Aucune page pour l\'instant. Pour créer votre première page, utiliser le lien ci-dessus.</p>';}out+='</ul>';return out;
};
  tmpl['show-main']=function anonymous(it) {
var out='<div class="show-wrapper"><div class="toolbar"></div><div class="content"></div></div>';return out;
};
  tmpl['show-page']=function anonymous(it) {
var out=''+( it );return out;
};
  tmpl['show-toolbar']=function anonymous(it) {
var out='<a class="icon icon-edit" id="edit-page" href="/pages/'+( it.id )+'/edit">Editer</a><div class="title">'+( it.title )+'</div>';return out;
};
return tmpl;})();