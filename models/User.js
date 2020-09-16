const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
      type: String,
      trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
    select: false, // will disable showing in queries
  },
  phone: {
      type : String,
      trim: true,
      require : true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  locationLastUpdate: Date,
  location : {
      type : Object,
      default : {},
  },
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});



module.exports = mongoose.model('User', UserSchema);