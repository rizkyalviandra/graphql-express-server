const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  authorID: String,
  publisherID: String,
});

module.exports = mongoose.model("Book", bookSchema);
