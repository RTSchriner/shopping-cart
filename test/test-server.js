var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var items = server.items;

chai.use(chaiHttp);


describe('Shopping List', function() {
    it('should list items on get', function (done) {
        chai.request(app)
            .get('/items')
            .end(function (err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            })
    });
    it('should add an item on post', function (done) {
        chai.request(app)
            .post('/items')
            .send({ name: 'Bacon' })
            .end(function (err, res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.id.should.be.a('number');
                res.body.name.should.be.a('string');
                res.body.name.should.equal('Bacon');
                done();
            })
    });
    it('should edit an item on put', function (done) {
        chai.request(app)
            .put('/items/0')
            .send({ name: 'Bacon' })
            .end(function (err, res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.id.should.be.a('number');
                res.body.name.should.be.a('string');
                res.body.name.should.equal('Bacon');
                res.body.id.should.equal(0);
                done();
            })
    });
    it('should create an item on put error', function (done) {
        chai.request(app)
            .put('/items/5')
            .send({ name: 'Apples' })
            .end(function (err, res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.id.should.be.a('number');
                res.body.name.should.be.a('string');
                res.body.name.should.equal('Apples');
                res.body.id.should.equal(5);
                done();
            })
    });
    it('should delete an item on delete', function (done) {
        chai.request(app)
            .delete('/items/0')
            .end(function (err, res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.id.should.be.a('number');
                res.body.name.should.be.a('string');
                res.body.id.should.equal(0);
                res.body.name.should.equal('Bacon');
                done();
            })
    });
    
    it('should send an error on delete with ID that does not exist', function (done) {
        chai.request(app)
            .delete('/items/4')
            .end(function (err, res){
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.equal('Sorry, that ID does not exist.');
                done();
            })
    });
});