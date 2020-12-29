const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;

require("./config/db");

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("server started in port", PORT);
  }
});
