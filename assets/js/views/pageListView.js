require('../lib/gator-1.2.2');
var p = require('page');

function PageListView($el) {
    this.$el = $el;
}

PageListView.prototype.render = function(data, selectedIndex) {
    this.data = data;
    selectedIndex = selectedIndex || 0;
    this.filterValue = this.filterValue || '';

    this.$el.innerHTML = '<a href="/page/add">Add</a><br/><input type="text" class="filter" value="' + this.filterValue + '" />';
    this.$el.innerHTML += '<ul class="list"></ul>';
    this.$el.querySelector('.filter').focus();

    this._render(this.data, selectedIndex);

    this.bindEvent();
};

function tpl(title) {
    return '<span class="name">' + title + '</span><span class="edit">edit</span>'
}

// TODO check, double appel à cause du filtre.
PageListView.prototype._render = function(data, selectedIndex) {
    var $list = this.$el.querySelector('.list');
    $list.innerHTML = "";

    data.forEach(function(page, index) {
        var li = document.createElement('li');
        li.setAttribute('data-page-id', page.id || index);
        if (selectedIndex === index) {
            li.classList.add('active');
        }
        li.innerHTML = tpl(page.title);
        $list.appendChild(li);
    }, this);

};

PageListView.prototype.bindEvent = function() {
    Gator(this.$el).on('click', '.edit', this.editSelectedItem.bind(this));
    Gator(this.$el).on('click', '.name', this.selectItem.bind(this));
    Gator(this.$el).on('blur', '.page-name', this.updatePageName.bind(this));
    Gator(this.$el).on('keyup', '.filter', this.filterList.bind(this));
};

PageListView.prototype.getSelectedItemName = function() {
    return this.$el.querySelector('.active .name').innerHTML;
};

PageListView.prototype.selectItem = function(e) {
    p('/page/' + Number(e.target.parentNode.getAttribute('data-page-id')));
};

PageListView.prototype.editSelectedItem = function(e) {
    var el = e.target.parentNode;
    var tpl = '<input type="text" value="' + el.querySelector('.name').innerHTML + '" class="page-name" />'
    el.innerHTML = tpl;
    el.querySelector('.page-name').focus();
};

PageListView.prototype.updatePageName = function(e) {
    var pageName = e.target.value;
    this.$el.querySelector('.active').innerHTML = tpl(pageName);
};

PageListView.prototype.filterList = function(e) {
    var filterValue = e.target.value;
    this.filterValue = filterValue;
    if (filterValue !== "") {
        var filteredData = this.data.filter(function(item) {
            filterValue = filterValue.replace('*', '.*');
            return new RegExp("^" + filterValue, 'i').test(item.title);
        });
    } else {
        var filteredData = this.data;
    }

    this._render(filteredData);
};

PageListView.prototype.destroy = function() {
    Gator(this.$el).off();
};

module.exports = PageListView;