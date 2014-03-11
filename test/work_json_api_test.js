'use strict';
//jshint unused:false

var superagent = require('superagent');
var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
var app = require('../app').app;

describe('Portfolio JSON api', function(){
  var id;

  it('get a collection of work', function(done){
    superagent.get("http://localhost:3000/api/v1/works").end(function(er, res) {
      expect(er).to.be.eql(null);

      done();
    });
  });

  it('should be able to create a piece of work', function(done){
    superagent.post('http://localhost:3000/api/v1/works')
      .send({title: "Worry Wart", description: "PHP MySQL solution to having too many worries",
        date: "December 2013", link: "worrywart.jessicawicksnin.com", company: "Mom's Christmas present"})
      .end(function(err, res){
        expect(err).to.be.eql(null);
        expect(res.body.title).to.be.eql("Worry Wart");

        id = res.body._id;
        console.log(id);
        done();
    });
  });

  it('should be able to get an individual work', function(done){
    superagent.get('http://localhost:3000/api/v1/works/' + id).end(function(er, res) {
        expect(er).to.be.equal(null);
        console.log(id);
        expect(res.body.title).to.be.equal('Worry Wart');
        done();
    });
  });

  it('should be able to update a current work', function(done){
    superagent.put('http://localhost:3000/api/v1/works/' + id).send({title: 'Another App'})
    .end(function(er, res) {
      expect(er).to.be.equal(null);
      expect(res.body.msg).to.be.eql('success');
      done();
    });
  });

  it('should be able to delete a current work', function(done){
    superagent.del('http://localhost:3000/api/v1/works/' + id).end(function(e, res){
      expect(e).to.equal(null);
      expect(res.body.msg).to.be.equal('success');
      done();
    });
  });
});





