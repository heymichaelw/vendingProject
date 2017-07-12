const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
