var page = require('page');
var applicationController = require('./controller/application');


page('/', applicationController.list, applicationController.newPage);

page('/page/*', applicationController.init);

page('/page/add', applicationController.addPage);

page('/page/:pageId/save', applicationController.createPage);
page('/page/create', applicationController.createPage);

page('/page/:pageId', applicationController.list, applicationController.showPage);

page('/page/:pageId/edit', applicationController.list, applicationController.editPage);

page();
