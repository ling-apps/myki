var main_t = require('../tpl/templates')['settings-show'];

function SettingsShowView($el) {
    this.$el = $el;
}

SettingsShowView.prototype.render = function(data) {
    this.$el.innerHTML = main_t(data);
};

SettingsShowView.prototype.destroy = function() {
    this.$el.innerHTML = "";
};

module.exports = SettingsShowView;
