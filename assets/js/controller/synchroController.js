var q = require('q');
//q.stopUnhandledRejectionTracking();
var Page = require('../models/Pages');

var synchroController = {
    synchro: function (pagesStore) {
        return pagesStore.getAllFromServer().then(function (rs) {
            /* synchro here : compare pages to get last versions of each and then push server */
            if(!rs) return;

            /* get pages from local storage */
            pagesStore.getAll().then(function(localPages){

                rs.forEach(function (serverPage) {
                    var matchedPage = localPages.filter(function(page){
                        return page._id === serverPage._id
                            && page.updatedAt === serverPage.updatedAt;
                    });
                    if(matchedPage.length === 0) {
                        var page = new Page();
                        page.title = serverPage.title;
                        page.content = serverPage.content;
                        page.updatedAt = serverPage.updatedAt;
                        page.author = serverPage.author;
                        page._id = serverPage._id;
                        page.save();
                    }
                });
            }).catch(function(e) {
                //should be catched
            });


            return pagesStore.pushAllToServer();
        });
    }
};

module.exports = synchroController;
