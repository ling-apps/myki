'use strict';
//var Interfake = require('interfake');
var synchroController  = require('../../assets/js/controller/synchroController');
var Pages = require('../../assets/js/models/Pages');
var pagesStore = new Pages();

describe('Synchro controller with an empty local bd', function(){

    var interfake;
    before(function (done) {
//        interfake = new Interfake();
//        interfake.get('/pages').status(200).body([{title: 'new page1', content: '# my new page1 title', updatedAt:500000, id:1}]);
//        interfake.post('/pages').status(200).body([]);
//
//        interfake.listen(3000); // The server will listen on port 3000
        done();
    });

   it('should get all pages from server and save it on local', function(done){

//       synchroController.synchro(pagesStore).then(function(){
//           return pagesStore.getAll();
//       })
//       .then(function(items){
//           expect(items).to.be.array();
//
//       })
       done();
   })
});
