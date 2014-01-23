require('../lib/gator-1.2.2');
var main_t = require('../tpl/templates.js')['list-main'];

var p = require('page');

function PageListView($el) {
    this.$el = $el;
}

PageListView.prototype.render = function(data, selectedIndex) {
    selectedIndex = selectedIndex || 0;
    this.filterValue = this.filterValue || '';

    this.$el.innerHTML = main_t(data);
    var activePage = this.$el.querySelector('[data-page-id="' + selectedIndex + '"]');
    if (activePage) {
        activePage.classList.add('active');
    }
    this.bindEvent();
};

PageListView.prototype.bindEvent = function() {
    Gator(this.$el).on('click', 'li', this.selectItem.bind(this));
};

PageListView.prototype.selectItem = function(e) {
    p('/page/' + Number(e.target.getAttribute('data-page-id')));
};

PageListView.prototype.destroy = function() {
    Gator(this.$el).off();
};

module.exports = PageListView;