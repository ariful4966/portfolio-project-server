require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Project = require("./Models/Project");
const Blog = require("./Models/Blog");

const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.do5kc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  () => {
    console.log("Database connection successfully");
  }
);

app.get("/project", (req, res) => {
  Project.find({})
  .catch(err=>{
      console.log(err);
  })
  .then(result=>{
      res.send(result)
  })

});

app.get("/blog", (req, res)=>{
    Blog.find({})
    .catch(err=>{
        console.log(err);
    })
    .then(result=>{
        res.send(result)
    })
})

app.listen(port, () => {
  console.log("server is running on port " + port);
});
