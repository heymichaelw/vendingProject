const expect = require('chai').expect;
const request = require('supertest');
const app = require("../app");
const Item = require('../models/item');
const Vendor = require('../models/vendor');

// describe("basic API endpoint data tests", function(){
//
//   beforeEach(function(done){
//     Customer.insertMany([
//       {name: "chips", quantity: 3, price: 65},
//       {name: "gum", quantity: 6, price: 35},
//       {name: "soda", quantity: 4, price: 50}
//     ]).then(done());
//   });
//
//   afterEach(function(done){
//     Customer.deleteMany({}).then(done());
//   });
//
//   it("customers api endpoint allows creation of customer item", function(done){
//     request(app)
//     .post("/api/customer/items/5/purchases")
//     .send({id: 5, name: "apple", quantity: 1, price: 40})
//     .expect(201)
//     .expect(function(res){
//       Customer.count().then(function(count){
//         expect(count).to.equal(4);
//       });
//     })
//     .end(done);
//   });
//
//   it("customers api endpoint returns all customer items as json", function(done){
//     request(app)
//       .get("/api/customer/items")
//       .expect(200)
//       .expect(function(res){
//         expect(res.body[0].name).to.equal("chips");
//         expect(res.body[1].name).to.equal("gum");
//         expect(res.body[2].name).to.equal("soda");
//         expect(res.body.length).to.equal(3);
//       }).end(done);
//   });
// });

describe("basic model tests", function(){

  beforeEach(function(done){
     Item.deleteMany({}).then(done());
   });

   afterEach(function(done){
     Item.deleteMany({}).then(done());
   });

   it("test should clean up after itself", function(done){
     const item = new Item().save().then(function(newItem){
       Item.count().then(function(count){
         expect(count).to.equal(1);
         done();
       });
     });
   });

    it("can create an item in the db and find it with mongoose syntax", function(done){
     const item = new Item({name: "chips", quantity: 8, price: 65})
     .save().then(function(newItem){
       expect(newItem.name).to.equal("chips");
       expect(newItem.quantity).to.equal(8);
       expect(newItem.price).to.equal(65);
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
