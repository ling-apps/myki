// Lib
var page = require('page');

// Controllers
var applicationController = require('./controller/application');
var filesController = require('./controller/filesController');

page('*', init);

// Pages
page('/pages', applicationController.list);
page('/pages/add', applicationController.addPage);
page('/pages/:pageId', applicationController.list, applicationController.showPage);
page('/pages/:pageId/save', applicationController.savePage);
page('/pages/:pageId/edit', applicationController.list, applicationController.editPage);

// Files
page('/files', filesController.list);

// Settings
// page('/settings', settingsController.show);

// Dev tool
page('/clear', applicationController.clearDb);

page();

function init (req, next) {
    req.unhandled = false;
    next();
}
