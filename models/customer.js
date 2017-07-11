const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
