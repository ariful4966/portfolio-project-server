const { Schema, model } = require("mongoose");

const webSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200,
  },
  body: {
    type: String,
    required: true,
    maxlength: 5000
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
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
  url:{
    web_url:{
      type: String,
      required: true,
      trim: true,
    },
    git_url:{
      type: String,
      required: true,
      trimg: true,
    }
  }

},{timestamps: true});

const Web = model("Web", webSchema);
module.exports = Web;
