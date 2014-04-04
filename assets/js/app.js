// Lib
var page = require('page');

// Controllers
var applicationController = require('./controller/application');
var filesController = require('./controller/filesController');
var settingsController = require('./controller/settingsController');
var editorController = require('./controller/editorController');

page('*', init, selectActiveMenu);

page('/', homePage);

// Pages
page('/pages', applicationController.list);
page('/pages/synchro', applicationController.synchroPages);
page('/pages/add', applicationController.addPage);
page('/pages/:pageId', applicationController.list, applicationController.showPage);
page('/pages/:pageId/save', applicationController.savePage);
page('/pages/:pageId/edit', applicationController.list, applicationController.editPage);
page('/pages/:pageId/destroy', applicationController.destroy);

// Files
page('/files', filesController.list);
page('/files/:fileId', filesController.list, filesController.show);

// Settings
page('/settings', settingsController.list);
page('/settings/:configName', settingsController.list, settingsController.show);

// Dev tool
page('/clear', applicationController.clearDb);
page('/clear/config/:store', clear);

// Start page
page();

// Allow page to handle unhandled request
function init (req, next) {
    next();
}

// Redirect to home page
function homePage(req, next) {
    page('/pages');
}

// Select the current active menu
function selectActiveMenu(req, next) {
    var activeMenu = req.path.split('/')[1];
    if (!activeMenu) {
        next();
        return;
    }



    var menuItem = document.querySelector('.main-menu-item.active');
    menuItem.classList.remove('active');
    menuItem.firstChild.classList.remove('active');

    var activeMenuItemParent = document.querySelector('.main-menu-item .' + activeMenu);
    if (!activeMenuItemParent) {
        var firstMenu = document.querySelector('.main-menu-item:first-child');
        firstMenu.classList.add('active');
        firstMenu.firstChild.classList.add('active');
        next();
        return;
    }
    var activeMenuItem = activeMenuItemParent.parentNode;
    activeMenuItem.classList.add('active');
    activeMenuItem.firstChild.classList.add('active');

    // Reset layout on change (ie : /pages -> /files )
    if (menuItem.firstChild !== activeMenuItemParent) {
        document.getElementById('content').innerHTML = "";
        document.getElementById('nav2').innerHTML = "";
    }

    next();
}

function clear(req, next) {
    var store = req.params.store;

    var Config = require('./models/Config');

    var config = new Config();

    config.getByName(store).then(function(cfg) {
        return config.destroy(cfg.id);
    }).then(function(rs) {
        page('/');
    });
}
