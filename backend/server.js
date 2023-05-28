require("dotenv").config();

const express = require("express");

// express app
const app = express();

// middlewear which will fire a function for every request coming in
app.use(express.json()); //any request coming with body attaches the body with req object

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.get("/", (req, res) => {
  res.json({ msg: "GET request" });
});

// listen to requests
app.listen(process.env.PORT, () => {
  console.log("listening on port 4000");
});
