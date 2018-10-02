const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminShema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 15
  },
  username: {
    type: String,
    unique:true,
    required: true,
    lowercase: true,
    minLength: 3,
    maxLength: 15
  },
  age: {
    type: Number,
    required: true,
    min: 25
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    min: 5
  }
});

const Admin = mongoose.model('Admin', AdminShema);

module.exports = Admin;
