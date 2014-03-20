var main_t = require('../tpl/templates')['settings-list'];

function SettingsListView($el) {
    this.$el = $el;
}

SettingsListView.prototype.render = function(data) {
    this.$el.innerHTML = main_t(data);
};

SettingsListView.prototype.destroy = function() {
    this.$el.innerHTML = "";
};

module.exports = SettingsListView;
