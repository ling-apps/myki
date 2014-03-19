'use strict';

module.exports = {
    'name': 'End 2 End Pages test - connect to the app and manipulate the UI',

    'beforeAll': function(test) {
        test
            .open('http://localhost:3000')
            .click('[href="/clear"]')
            .done();
    },

    'List all pages': function(test) {
        test
            .open('http://localhost:3000')
            .assert.exists('#nav2 > h3')
            .assert.text('#nav2 > h3:first-child').is('Pages')
            .assert.numberOfElements('#nav2 > .pages-list li').is(0)
            .done();
    },

    'Add a page': function(test) {
        test
            .open('http://localhost:3000')
            .click('#nav2 #add-page')
            .wait(20)
            .assert.numberOfElements('#nav2 > .pages-list li').is(1)
            .assert.text('#nav2 .pages-list li:first-child').is('new page')
            .assert.exists('#content .toolbar > .title .show')
            .assert.exists('#content .toolbar > .title .edit')
            .assert.notVisible('#content .toolbar > .title .edit')
            .assert.exists('#save')
            .assert.exists('#show-preview')
            .assert.exists('#delete')
            .done();
    },

    'Change page title': function(test) {
       
        var text = 'The page title';

        test
            .click('#content .toolbar .title .show')
            .wait(20)
            .assert.visible('#content .toolbar .title .edit')
            .assert.notVisible('#content .toolbar .title .show')
            .query('#content .toolbar .title .edit')
                .type('\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008' + text)
            .end()
            .click('#nav2')
            .assert.visible('#content .toolbar .title .show')
            .assert.text('#content .toolbar .title .show').is('The page title')
            .done();
    },
    
    'Save the page': function(test) {
        test
            .click('#save')
            .wait('20')
            .assert.numberOfElements('#nav2 > .pages-list li').is(1)
            .assert.text('#nav2 .pages-list li:first-child').is('The page title')
            .done();
    }
};

