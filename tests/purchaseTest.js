const expect = require('chai').expect;
const request = require('supertest');
const app = require("../app");
const Item = require('../models/item');
const Purchase = require('../models/purchase');

describe("basic purchase API endpoint data tests", function(){

  beforeEach(function(done){
    Purchase.insertMany([
      {itemName: "chips", price: 65, bought: new Date()},
      {itemName: "gum", price: 35, bought: new Date()},
      {itemName: "soda", price: 50, bought: new Date()},
    ]).then(done());
  });

  afterEach(function(done){
    Purchase.deleteMany({}).then(done());
  });

  it("purchases api endpoint returns all purchases as json", function(done){
    request(app)
      .get("/api/vendor/purchases")
      .expect(200)
      .expect(function(res){
        expect(res.body[0].itemName).to.equal("chips");
        expect(res.body[1].itemName).to.equal("gum");
        expect(res.body[2].itemName).to.equal("soda");
        expect(res.body.length).to.equal(3);
      }).end(done);
  });

  it("money api endpoint returns all money taken by machine", function(done){
    request(app)
    .get("/api/vendor/money")
    .expect(200, {totalMoney: 150}, done);
  });

});

describe("basic purchase model tests", function(){

  beforeEach(function(done){
     Purchase.deleteMany({}).then(done());
   });

   afterEach(function(done){
     Purchase.deleteMany({}).then(done());
   });

   it("test should clean up after itself", function(done){
     const purchase = new Purchase().save().then(function(newPurchase){
       Purchase.count().then(function(count){
         expect(count).to.equal(1);
         done();
       });
     });
   });

    it("can create a purchase in the db and find it with mongoose syntax", function(done){
     const purchase = new Purchase({itemName: "chips", price: 65, bought: new Date()})
     .save().then(function(newPurchase){
       expect(newPurchase.itemName).to.equal("chips");
       expect(newPurchase.price).to.equal(65);
     });
     done();
   });
 });
