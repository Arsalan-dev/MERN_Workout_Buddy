require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require('./routes/user');

// express app
const app = express();

// middlewear which will fire a function for every request coming in
app.use(express.json()); //any request coming with body attaches the body with req object

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen to requests
    app.listen(process.env.PORT, () => {
      console.log("connected to DB & listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
