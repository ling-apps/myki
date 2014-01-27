var page = require('page');
var applicationController = require('./controller/application');
var db = require('./lib/db');

window.dbWrapper = {};
db.open({
    server: 'myki',
    version: 1,
    schema: {
        page: {
            key: { keyPath: 'id', autoIncrement: true},

            indexes: {
                title: { unique: true }
            }
        }
    }
}).done(function(result) {
    window.dbWrapper = result;
    console.log('Db opened', dbWrapper);
    page();
});

page('*', init);

page('/', applicationController.list);

page('/page/add', applicationController.addPage);

page('/page/:pageId', applicationController.list, applicationController.showPage);

page('/page/:pageId/save', applicationController.createPage);
page('/page/:pageId/edit', applicationController.list, applicationController.editPage);

function init (req, next) {
    req.unhandled = false;
    next();
}