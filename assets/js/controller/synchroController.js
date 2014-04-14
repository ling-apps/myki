var q = require('q');
q.stopUnhandledRejectionTracking();

var synchroController = {
    synchro: function (pagesStore) {
        console.log('controller');
        return pagesStore.getAllFromServer().then(function (rs) {
            /* synchro here : compare pages to get last versions of each and then push server */
			// WIP
            /*if(rs) {
                var localPages = pagesStore.getAll();
                rs.forEach(function (serverPage) {
                   if(localPages.contains(serverPage)
                       && localPages.updatedAt < serverPage.updatedAt){
                       pagesStore.update(pageId);
                   } else {
                       pagesStore.add(serverPage);
                   }
                });
            }*/
            return pagesStore.pushAllToServer();
        });
    }
};

module.exports = synchroController;
