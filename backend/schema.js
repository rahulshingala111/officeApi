const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  name: String,
  password: String,
  occupation: String,
});

module.exports = mongoose.model("reactSchema", CampgroundSchema);
