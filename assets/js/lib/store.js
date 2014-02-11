"use strict";

var q = require('q');
var db = require('./db');
var schema = require('../conf/schema');

var store = {
    db: null,
    get: function() {
        var deferred = q.defer();
        if (this.db) {
            deferred.resolve(db);
        }

        db
            .open({
                server: 'myki',
                version: 2,
                schema: schema 
            })
            .then(
                function(rs) {
                    this.db = rs;
                    deferred.resolve(this.db);
                }.bind(this)
                ,function(e) {
                    console.log(e);
                }
            );
        return deferred.promise;
    }
}


module.exports = store;
