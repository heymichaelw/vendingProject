const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  itemName: String,
  price: Number,
  bought: Date
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
