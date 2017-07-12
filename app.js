const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/item');
const Purchase = require('./models/purchase');
mongoose.Promise = require('bluebird');
const app = express();

const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config.json")[nodeEnv];

app.use(bodyParser.json());
mongoose.connect(config.mongoURL);

app.get("/api/customer/items", function(req, res){
   Item.find({}).then(function(items){
     res.json(items);
   });
 });

app.post("/api/customer/items/:itemId/purchases", function(req, res){
  const newItem = new Item(req.body).save().then(function(item){
    res.status(201).json({});
  });
});

app.get("/api/vendor/purchases", function(req, res){
  Purchase.find({}).then(function(purchases){
    res.json(purchases);
  });
});

app.get("/api/vendor/money", function(req, res){
  var totalMoney = 0;
  Purchase.find({}).then(function(purchases){
    purchases.forEach(function(purchase){
      totalMoney = totalMoney + (purchase.price);
    });
     res.json({totalMoney: totalMoney});
  });
});

app.get("/api/sanity", function(req, res){
  res.json({hello: "michael"});
});

app.listen(3000);

module.exports = app;
