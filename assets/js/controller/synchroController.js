var q = require('q');
q.stopUnhandledRejectionTracking();

var synchroController = {
    synchro: function (pagesStore) {
        console.log('controller');
        return pagesStore.getAllFromServer().then(function (rs) {
            /* synchro here : compare pages to get last versions of each and then push server */
            return pagesStore.pushAllToServer();
        });
    }
};

module.exports = synchroController;
