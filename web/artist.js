const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// schema object
const Artist_Of_interest_Schema = new Schema ({
  
  interest_id: { type: String , required: true },
  name: { type: String , required: true },
  url:  { type: String , required: true },
  img:  { type: String , required: true }
});

module.exports = Artist_Of_interest_Schema = mongoose.model('artist', Artist_Of_interest_Schema );
