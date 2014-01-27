//var IDB = require('../../assets/js/lib/IDB');
//
//describe('IndexedDb wrapper', function() {
//
//    it('doit pouvoir se connecter à une base', function(done) {
//        var IDBwrapper = new IDB('testDb');
//
//        IDBwrapper.connect()
//            .then(function(db) {
//                expect(db.isConnected()).to.be.true;
//                done();
//            })
//            .error(function(errorCode) {
//                fail(errorCode);
//            });
//    });
//
//    it('doit pouvoir récuperer un "store"', function(done) {
//        var IDBWrapper = new IDB('testDb');
//
//        IDBWrapper.connect()
//            .then(function(db) {
//                db.getStore('testStore');
//            })
//            .then(function(store) {
//                expect(store).not.to.be.null;
//                done();
//            });
//    });
//
//    it('doit pouvoir insérer un item dans un store', function(done) {
//        var IDBWrapper = new IDB('testDb');
//
//        var item = {
//            'title': 'title'
//        };
//
//        IDBWrapper.connect()
//            .then(function(db) {
//                db.getStore('testStore');
//            })
//            .then(function(store) {
//                store.add(item);
//                done();
//            });
//    });
//
//    it('doit pouvoir récupere un item dans un store', function(done) {
//        var IDBWrapper = new IDB('testDb');
//
//         var item = {
//             id: 0,
//             title: 'title'
//         };
//
//        IDBWrapper.connect()
//            .then(function(db) {
//                db.getStore('testStore')
//            })
//            .then(function(store) {
//                var id = store.add({title: 'title'});
//
//                store.get(id);
//            })
//            .then(function(result) {
//                expect(result).to.equal(item);
//                done();
//            })
//    });
//
//    it("doit pouvoir récuperer tous les items d'un store", function(done) {
//        var IDBWrapper = new IDB('testDb');
//
//        var items = [
//            {id: 0, title: 'title1'},
//            {id: 1, title: 'title2'},
//            {id: 2, title: 'title3'},
//            {id: 3, title: 'title4'},
//        ];
//
//
//        IDBWrapper.connect()
//            .then(function(db) {
//                db.getStore('testStore');
//            })
//            .then(function(store) {
//                items.forEach(function(item) {
//                    store.add({title: item.title});
//                });
//            });
//
//
//        IDBWrapper.connect()
//            .then(function(db) {
//                db.getStore('testStore');
//            })
//            .then(function(store) {
//                store.all();
//            })
//            .then(function(results) {
//                expect(results).to.equal(items);
//                done();
//            })
//    });
//
//    it('doit pouvoir modifier un item dans un store', function(done) {
//        var IDBWrapper = new IDB('testDb');
//
//        IDBWrapper.connect()
//            .then(function(db) {
//                db.getStore('testStore');
//            })
//            .then(function(store) {
//                store.add({title: 'title1'});
//            })
//
//        var store = IDBWrapper.connect()
//            .then(function(db) {
//                db.getStore('testStore');
//            });
//
//        var existingItem = store.get(0);
//
//        existingItem.title = 'toto';
//
//        store.put(0, existingItem)
//            .then(function(result) {
//                expect(result.title).to.equal('toto');
//                expect(result.id).to.equal(0);
//                done();
//            });
//    });
//
//});