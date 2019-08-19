
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// schema object
const Interest_yt_Schema = new Schema ({
  name: { type: String , required: true },
  url:  { type: String , required: true },
  img:  { type: String , required: true }
});

const InterestSchema = new Schema ({
  name: { type: String, required: true },
  data: [ Interest_yt_Schema ]
});

module.exports = Interests = mongoose.model('interest', InterestSchema );
