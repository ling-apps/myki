var page = require('page');
var applicationController = require('./controller/application');


page('/', applicationController.list, applicationController.newPage);

page('/page/*', applicationController.init);

page('/page/add', applicationController.addPage);

page('/page/create/:pageId', applicationController.createPage);
page('/page/create', applicationController.createPage);

page('/page/:pageId', applicationController.list, applicationController.showTool, applicationController.showPage);

page('/page/edit/:pageId', applicationController.list, applicationController.showTool, applicationController.editPage);

page();
