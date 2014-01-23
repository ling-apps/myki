var page = require('page');
var applicationController = require('./controller/application');


page('/', applicationController.list);

page('/page/add', applicationController.addPage);


page('/page/:pageId', applicationController.list, applicationController.showPage);

page('/page/:pageId/save', applicationController.createPage);
page('/page/:pageId/edit', applicationController.list, applicationController.editPage);
page();
