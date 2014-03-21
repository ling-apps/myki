var main_t = require('../tpl/templates')['settings-show'];
var formSerialize = require('form-serialize');

function SettingsShowView($el, controller) {
    this.$el = $el;
    this.controller = controller;
}

SettingsShowView.prototype.render = function(data, configName) {
    this.$el.innerHTML = main_t(data);
    this.configName = configName;

    this.bindEvent();
};

SettingsShowView.prototype.bindEvent = function() {
    this.$el.querySelector('#settings-form').addEventListener('change', this.onChange.bind(this), false);
};

SettingsShowView.prototype.onChange = function(e) {
    var data = formSerialize(this.$el.querySelector('#settings-form'), {hash: true});
    this.controller.update(this.configName, data);
};

SettingsShowView.prototype.destroy = function() {
    this.$el.innerHTML = "";
};

module.exports = SettingsShowView;
