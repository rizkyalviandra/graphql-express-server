const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publisherSchema = new Schema({
  name: String,
  address: String,
  authorID: String,
});

module.exports = mongoose.model("Publisher", publisherSchema);
