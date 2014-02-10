var page = require('page');
var applicationController = require('./controller/application');
var db = require('./lib/db');

window.dbWrapper = {};
db.open({
    server: 'myki',
    version: 2,
    schema: {
        page: {
            key: { keyPath: 'id', autoIncrement: true},

            indexes: {
                title: { unique: true }
            }
        },
        files: {
            key: { keyPath: 'id', autoIncrement: true},
            indexes: {
                name: { unique: false }
            }
        }
    }
}).done(function(result) {
    window.dbWrapper = result;
    page();
});

window.clearDb = function() {
    dbWrapper.page.clear();
};

page('*', init);

page('/', applicationController.list);

page('/page/add', applicationController.addPage);

page('/page/:pageId', load, applicationController.list, applicationController.showPage);

page('/page/:pageId/save', applicationController.createPage);
page('/page/:pageId/edit', load, applicationController.list, applicationController.editPage);

page('/clear', applicationController.clearDb);

function load(req, next) {
    dbWrapper.page.query().all().execute().done(function(results) {
        var item = results.filter(function(result) {
            return ~~result.id === ~~ req.params.pageId;
        })[0];
        req.state.page = item;
        next();
    });
}

function init (req, next) {
    req.unhandled = false;
    next();
}
