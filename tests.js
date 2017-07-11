const expect = require('chai').expect;
const request = require('supertest');
const app = require("./app");
const Customer = require('./models/customer');
const Vendor = require('./models/vendor');

describe("basic model tests", function(){
    it("can create a customer item in the db and find it with mongoose syntax", function(done){
     const customer = new Customer({name: "chips", quantity: 1, price: 65})
     .save().then(function(newCustomer){
       expect(newCustomer.name).to.equal('chips');
       expect(newCustomer.quantity).to.equal(1);
       expect(newCustomer.price).to.equal(65);
     });
     done();
   });
 });

describe("basic api endpoint tests", function(){
   it("can access api endpoint and get success back", function(done){
     request(app)
       .get("/api/sanity")
       .expect(200, {hello: "michael"}, done);
   });
 });

describe("sanity test", function(){
   it("should run test", function(){
     expect(1).to.not.equal(2);
   });
});
