// import necessary modules or dependencies which you installed via npm (i.e. express, mongoose, dotenv)
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // directly use it

// make an instance of Express App
const app = express(); // all functionalities in express() are available in "app" now

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);

  if(req.body) {
    console.log("Request body:");
    console.log(req.body);
  }
  next();
})

// routes
app.use("/api/posts/", require("./src/routes/post"));
app.use("/api/users/", require("./src/routes/user"));

// connect to mongodb or DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // .env is the .env file you created
  .then(() => {
    console.log("Connected to MongoDB or Database.");
  })
  .catch((error) => {
    console.log("Error in connecting to MongoDB:", error.message);
  });

// start the server
const port = process.env.PORT || 4000;  // if the configured port in .env doesn't work, use the hard-coded "3000"
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});