const { Schema, model } = require("mongoose");

const blogSchma = new Schema({

  title: {
    type: String,
    trim: true,
    maxlength: 200,
    required: true
  },
  body:{
    type: String,
    required: true,
    maxlength: 50000,

  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  image: {
    display_url:{
      type: String,
      required: true,
      trim: true
    },
    delete_url: {
      type: String,
      required: true,
      trim: true
    }

  },
  website: {
    type: String,
    require: true,
    trim: true
  }

}, {timestamps: true});
const Blog = model("Blog", blogSchma);

module.exports = Blog;
