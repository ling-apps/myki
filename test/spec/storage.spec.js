var Storage = require('../../assets/js/lib/storage');
var DB = require('../../assets/js/lib/db');

describe('Store', function() {
    
    beforeEach(function(done) {
        var idb = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.oIndexedDB || window.msIndexedDB,
            IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

        var req = idb.deleteDatabase('test-myki');
        req.onsuccess = function(rs) {
            done();
        };

        req.onerror = function(error) {
            console.log(error);
            done();
        };

        req.onblocked = function(error) {
            console.log(error);
        };
 
    });


    var store = new Storage('test-myki');

    describe('#init', function() {
        var migration = {
            version: 1,
            schema: {
                pages: {
                    key: { keyPath: 'id', autoIncrement: true},
                    indexes: {
                        title: { unique: true }
                    }
                }
            }
        };

        var migration2 = {
            version: 2,
            schema: {
                files: {
                    key: { keyPath: 'id', autoIncrement: true},
                    indexes: {
                        name: { unique: false }
                    }
                }
            }
        };
    
        it("doit appliquer les modifications depuis le fichier de migration", function(done) {
            store.init(migration).then(function() {
                expect(store.pages).to.exist;
                done();
            }).catch(function(e) {
                console.log(e);    
            });
        });

        it('doit appliquer les modifications de version uniquement (migration)', function(done) {
            store.init(migration2).then(function() {
                expect(store.pages).to.exist;
                expect(store.files).to.exist;
                done();
            });
        });

    });

    describe('#save', function() {
        
        it('doit pouvoir sauver un élément dans un store, et lui ajouter un id', function(done) {
            store.pages.save({title: 'page1', content: '# title1'}).then(function(savedPage) {
                expect(savedPage.id).to.exist();
                expect(savePage.id).to.equal(1);
                done();        
            });
        });

    });

    describe.skip('#load', function() {

        it("doit pouvoir charger plusieurs model d'un coup et les affecter dans le bon store", function(done) {
            var fixtures = {
                pages: [
                    { title: 'new page1', content: '# my new page1 title'},
                    { tiele: 'new page2', content: '# my new page2 title'}
                ]  
            };

            store.load(fixtures).then(function(rs) {
                expect(rs.length).to.equal(2);
            });
        });

    });

});
