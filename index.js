require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Project = require("./Models/Project");
const Blog = require("./Models/Blog");
const { projectGetController } = require('./Controller/projectController');
const { blogGetController } = require('./Controller/blogController');
const { mailPostController } = require('./Controller/emailController');

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

app.get('/', (req, res)=>{
  res.send('Route is successfully get for data')
})

app.get("/project", projectGetController );

app.get("/blog", blogGetController)

// send message
app.post("/send", mailPostController);

app.listen(port, () => {
  console.log("server is running on port " + port);
});
