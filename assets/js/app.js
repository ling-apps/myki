var page = require('page');
var applicationController = require('./controller/application');

page('*', init);

page('/', applicationController.list);

page('/page/add', applicationController.addPage);

page('/page/:pageId', applicationController.list, applicationController.showPage);

page('/page/:pageId/save', applicationController.savePage);
page('/page/:pageId/edit', applicationController.list, applicationController.editPage);

page('/clear', applicationController.clearDb);

page();

function init (req, next) {
    req.unhandled = false;
    next();
}
