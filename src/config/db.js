const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
mongoose.connect(uri);

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB...");
});
