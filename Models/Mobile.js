const { Schema, model } = require("mongoose");

const mobileSchema = new Schema({
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
    ref: 'user',
    required: true
  },
  language:[
    {
      type: String,
    }
  ],
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
    mobileUrl:{
      type: String,
      trim: true,
    },
    gitUrl:{
      type: String,
      required: true,
      trimg: true,
    }
  }

},{timestamps: true});

const Mobile = model("Mobile", mobileSchema);
module.exports = Mobile;