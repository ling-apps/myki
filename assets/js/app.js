// Lib
var page = require('page');

// Controllers
var applicationController = require('./controller/application');
var filesController = require('./controller/filesController');

page('*', init);
page('/*', selectActiveMenu);

// Pages
page('/pages', applicationController.list);
page('/pages/add', applicationController.addPage);
page('/pages/:pageId', applicationController.list, applicationController.showPage);
page('/pages/:pageId/save', applicationController.savePage);
page('/pages/:pageId/edit', applicationController.list, applicationController.editPage);

// Files
page('/files', filesController.list);
page('/files/:fileId', filesController.list, filesController.show);

// Settings
// page('/settings', settingsController.show);

// Dev tool
page('/clear', applicationController.clearDb);

// Start page
page();

// Allow page to handle unhandled request
function init (req, next) {
    req.unhandled = false;
    next();
}

// Select the current active menu
function selectActiveMenu(req, next) {
    var activeMenu = req.path.split('/')[1];

    var menuItem = document.querySelector('.main-menu-item.active')
    menuItem.classList.remove('active');
    menuItem.firstChild.classList.remove('active');

    var activeMenuItemParent = document.querySelector('.main-menu-item .' + activeMenu);
     if (!activeMenuItemParent) {
        next();
        return;
    }
    var activeMenuItem = activeMenuItemParent.parentNode;
    activeMenuItem.classList.add('active');
    activeMenuItem.firstChild.classList.add('active');

    next();
}
