var q = require('q');
q.stopUnhandledRejectionTracking();
var Page = require('../models/Pages');

var synchroController = {
    synchro: function (pagesStore) {
        return pagesStore.getAllFromServer().then(function (rs) {
            /* synchro here : compare pages to get last versions of each and then push server */
            if(rs) {
                rs.forEach(function (serverPage) {
                  var page = new Page();
                  page.title = serverPage.title;
                  page.content = serverPage.content;
                  page.updatedAt = serverPage.update_at;
                  page.author = serverPage.author ;
                  page.save();
                });
            }
            return pagesStore.pushAllToServer();
        });
    }
};

module.exports = synchroController;
