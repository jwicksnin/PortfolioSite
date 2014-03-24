'use strict';
/*global casper*/

casper.test.begin('home page', 2, function suite(test) {

  casper.start('http://localhost:3000/', function() {
    test.assertHttpStatus(200);
  });

  casper.then(function(){
    test.assertTitle('Jessica Portfolio Page', 'title is Jessica Portfolio Page');
  });

  // casper.then(function() {
  //   test.assertSelectorHasText('h1.largeHeader','OurAgendaApp');
  // });

  casper.run(function(){
    test.done();
  });

});
