module.exports = (function(){
function encodeHTMLSource() {  var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;' },  matchHTML = /&(?!#?w+;)|<|>|"|'|\//g;  return function() {    return this ? this.replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : this;  };};
String.prototype.encodeHTML=encodeHTMLSource();
var tmpl = {};
  tmpl['editor-insertImage']=function anonymous(it) {
var out='<h2>Insert an image</h2><form class="add-from-url"><input type="text" name="url" placeholder="Image URL" /></form><ul class="images">';var arr1=it;if(arr1){var image,index=-1,l1=arr1.length-1;while(index<l1){image=arr1[index+=1];out+='<li class="image" data-image-title="'+( image.name )+'" data-image-src="data:image/png;base64,'+( image.content ||'').toString().encodeHTML()+'">'+( image.name )+'</li>';} } out+='</ul>';return out;
};
  tmpl['editor-main']=function anonymous(it) {
var out='<div class="toolbar"></div><div class="content"></div><div class="preview hidden"></div><div class="images-list hidden"></div>';return out;
};
  tmpl['editor-preview']=function anonymous(it) {
var out='';return out;
};
  tmpl['editor-toolbar']=function anonymous(it) {
var out='<div class="pull-left"><a alt="Save" class="icon icon-save" id="save" href="/pages/'+( it.id !== undefined ? it.id + '/' : '' )+'save">Save</a><a alt="Toggle preview" class="icon icon-preview" id="show-preview">Preview</a><a alt="Delete" class="icon icon-delete" id="delete">Delete</a></div><div class="title"><div class="show">'+( it.title )+'</div><input class="edit" type="text" name="title" value="'+( it.title )+'" /></div><div class="pull-right"><a alt="Insert an image" href="" class="icon icon-insert-images" id="insertimage">Insert an image</a><a class="icon icon-help" alt="markdown syntax help" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Help</a></div>';return out;
};
  tmpl['files-list']=function anonymous(it) {
var out='<h3> Files </h3><label for="upload-file">Upload a new file</label><input type="file" id="upload-file" />';if(it.length > 0){out+='<ul class="menu files-list">';var arr1=it;if(arr1){var file,index=-1,l1=arr1.length-1;while(index<l1){file=arr1[index+=1];out+='<li class="item file" data-file-id="'+( file.id )+'"><a href="/files/'+( file.id )+'">'+( file.name )+'</a></li>';} } out+='</ul>';}else{out+='<div class="menu files-list"><p class="empty-page-list">You did not have upload any file now. Click on the link above to add your first one.</p></div>';}return out;
};
  tmpl['files-show']=function anonymous(it) {
var out='<img alt="'+( it.name ||'').toString().encodeHTML()+'" src="'+( it.content )+'" />';return out;
};
  tmpl['list-main']=function anonymous(it) {
var out='<h3> Pages </h3><a href="/pages/add" class="" id="add-page">Add a page</a><ul class="menu pages-list">';if(it.length > 0){var arr1=it;if(arr1){var page,index=-1,l1=arr1.length-1;while(index<l1){page=arr1[index+=1];out+='<li class="item" data-page-id="'+( page.id )+'"><a href="/pages/'+( page.id )+'">'+( page.title )+'</a></li>';} } }else{out+='<p class="empty-page-list">There\'s no page for now. Click on the link above to create your first one.</p>';}out+='</ul>';return out;
};
  tmpl['settings-show']=function anonymous(it) {
var out='<h3> Settings </h3><p>There\'s nothing to configure right now.<br/>Later on, you\'ll be able to set the backend url for persisting your data in the cloud.<br/>Some UI options might also be available, like the editor preview position (bottom or right).</p>';return out;
};
  tmpl['show-main']=function anonymous(it) {
var out='<div class="show-wrapper"><div class="toolbar"></div><div class="content"></div></div>';return out;
};
  tmpl['show-page']=function anonymous(it) {
var out=''+( it );return out;
};
  tmpl['show-toolbar']=function anonymous(it) {
var out='<a alt="Edit" class="icon icon-edit" id="edit-page" href="/pages/'+( it.id )+'/edit">Edit</a><div class="title">'+( it.title )+'</div>';return out;
};
return tmpl;})();