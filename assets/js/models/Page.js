"use strict";

var Model = require('../lib/model');

function Page(props) {
    this.name = "page";

    Model.call(this, props);
}

Page.prototype = Object.create(Model.prototype);
Page.prototype.constructor = Page;

module.exports = Page;
