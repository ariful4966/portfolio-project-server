require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { mailPostController } = require('./Controllers/emailController');
const routes = require('./Routes/index')

const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cors());
routes(app)

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.do5kc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  
  () => {
    console.log("Database connection successfully");
  }
);



// send message
app.post("/send", mailPostController);

app.use(function(err, req, res, next){
  res.send({error: err.message})
})

app.listen(port, () => {
  console.log("server is running on port " + port);
});
