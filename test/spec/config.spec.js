var Config = require('../../assets/js/models/Config');

describe('Config', function() {

    beforeEach(function(done) {
        var configStore = new Config();
        configStore.destroyAll()
            .then(function() {
                done();
            });
    });

    it("Should create a new config object if the asked for one doesn't exist", function(done) {
        var configStore = new Config();

        configStore.getByName('editor').then(function(editorConfig) {
            expect(editorConfig).to.be.instanceof(Config);
            expect(editorConfig.properties).to.be.an('object');
            done();
        }).fail(function(e) {
            console.log('fail', e);
        });
    });

    it("Should retrieve a config object by it's name even if it exist", function(done) {
        var configStore = new Config();

        var editorConfig = new Config();
        editorConfig.name = 'editor';
        
        editorConfig.save().then(function(rs) {
            return configStore.getByName('editor')
        }).then(function(conf) {
            expect(conf).not.to.be.undefined;
            expect(conf.id).to.equal(editorConfig.id);
            expect(conf.properties).to.deep.equal(editorConfig.properties);
            done();
        });
    });

    it("Should save all properties", function(done) {
        var configStore = new Config();

        editorConfig = new Config();
        editorConfig.name = 'editor';
        editorConfig.properties = {
            'preview-position': {
                'label': 'Preview position',
                'options': ['bottom', 'right'],
                'value': 'right',
                'configurable': true
            }
        };

        editorConfig.save().then(function() {
            return configStore.getByName('editor');
        }).then(function(rs) {
            var prop = rs.properties;
            expect(prop['preview-position']).to.be.an('object');
            expect(prop['preview-position']).to.deep.equal(editorConfig.properties['preview-position']);
            done();
        });
    });

});
