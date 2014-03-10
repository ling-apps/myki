var Model = require('../../assets/js/models/Model');

describe('Model', function() {

    it('should not be instanciable', function(done) {
        try {
            var m = new Model();
        } catch(e) {
            done();
        }
    });

    it('should be extended', function(done) {
        var SubModel = function() {
            this.dbPrefix = 'test-';
            this.storeName = 'submodel';
            Model.apply(this, arguments);
        };
        SubModel.prototype = Object.create(Model.prototype);
        SubModel.prototype.constructor = SubModel;

        try {
            var sm = new SubModel('test');
            expect(sm).to.be.an.instanceOf(Model);
            expect(sm).to.be.an.instanceOf(SubModel);
            done();
        } catch(e) {
        }
    });

    it('should not be extended without a dbName attribute', function(done) {

        var SubModel = function() {
            Model.apply(this, arguments);
        }
        SubModel.prototype = Object.create(Model.prototype);
        SubModel.prototype.constructor = SubModel;

        try {
            var sm = new SubModel('test');
        } catch(e) {
            expect(e.message).to.equal('Class extending Model should have an attribute storeName defining the indexedDb store name');
            done();
        }

    });

    it('SubModel should inherit Model methods', function(done) {
        var SubModel = function() {
            this.dbPrefix = 'test-';
            this.storeName = 'submodel';
            Model.apply(this, arguments);
        }
        SubModel.prototype = Object.create(Model.prototype);
        SubModel.prototype.constructor = SubModel;

        expect(SubModel).to.respondTo('save');
        expect(SubModel).to.respondTo('get');
        expect(SubModel).to.respondTo('getAll');
        expect(SubModel).to.respondTo('destroy');
        expect(SubModel).to.respondTo('destroyAll');
        done();
    });

});
