const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const AdminShema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true
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

const Admin = mongoose.model('Admins', AdminShema);

module.exports = Admin;

// IMPORTANT: the callback function must NOT be a lambda
// because in the callback THIS is used to get some values
AdminShema.pre('save', function (next) {
  try {
    let admin = this;

    if (!admin.isModified('password')) { //if password field is not modified
      return next();
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (error, salt) {
      if (error) {
        next(); // handle error
      }
      bcrypt.hash(admin.password, salt, function (error, hash) {
        if (error) {
          next(); //handle error
        }

        admin.password = hash;
        next();
      })
    })
  } catch (e) {
    next(error);
  }
});

AdminShema.methods.checkPassword = function (password) {

    return new Promise( function (resolve, reject) {
      if (...)resolve()
      else{
        reject();
      }
    });


}
