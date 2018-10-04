//async is in need because email and username fileds should
//be checked if they are already taken or not
const async = require('async');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config/keys.js');

const bcrypt = require('bcrypt');

const Admin = require('../modules/admin.js') ;
const failure = require('../helpers/onFailure.js');

module.exports = {
  signUp: function (req, res) {
    // if comes here it means validation has been passed successfully
    // so now uniquence of email and username should be checked
    // independently from each other and if any of them is already
    // taken by someone else the proccess should be stopped

    async.parallel([
      function (callback) { //checking the uniquence of email
        Admin.findOne({ email: req.validatedBody.email })
            .exec()
            .then( result => {
              if (result) { // if result is NOT empty it means email is taken by another user
                callback('email is already tekan', null); //stop all parallel proccess and go to callback with error
              }

              callback(null, result);
            })
            .catch( error => {
              console.log(error);
              return failure.sendError(res, 500, error);
            })
      },
      function (callback) { // checking uniquence of username
        Admin.findOne({ username: req.validatedBody.username })
          .exec()
          .then( result => {
            if (result) { // if result is NOT empty it means username is taken by another user
              callback('username is already tekan', null); //stop all parallel proccess and go to callback with error
            }

            callback(null, result);
          })
          .catch( error => {
            console.log(error);
            return failure.sendError(res, 500, error);
          })
      }
    ],
    function (error, results) {
      if (error) { // either email or usenamae is taken
        console.log("Error: " + error);
        return failure.sendError(res, 500, error);
      }

      //creating THE new admin
      let admin = new Admin({
        id: new mongoose.Types.ObjectId(),
        username: req.validatedBody.username,
        age: req.validatedBody.age,
        email: req.validatedBody.email,
        password: req.validatedBody.password
      });

      admin
        .save()
        .then( result => {
          res.status(200).json({
            success: true
          });
        })
        .catch( error => {
          console.log(error);
          return failure.sendError(res, 500, error);
        })

        //generate jsonwebtoken
        jwt.sign({}, config.jsonwebtoken.secret, (error, token) => {
          return failure.sendError(res, 500, error);
          //sending jsonwebtoken to the client
          res.status(200).json({
            token: token
          });
        });
    });
  },

  // this function uses some function that returns await variable
  // so the function is build on async/await es6 sintax
  signIn: function (req, res) {

    // if comes here it means validation has been passed successfully

    // finding the user corresponding with the email
    Admin.findOne({ email: req.validatedBody.email })
      .exec()
      .then( result => {
        if (!result) { // if the user is not found with the given email
          return failure.sendError(res, 404, "admin not found");
        }

        result.checkPassword(req.validatedBody.password)
          .then( isMatch => {

          } )
        // checking the correctnes of the password

        console.log(result);
        result.checkPassword('asd').catch(error => {
          console.log("GEHFEF");
        });


        // checking the correctnes of the password
        /*bcrypt.compare(req.validatedBody.password, result.password, function (error, isMatch) {
          if (error) {
            return failure.sendError(res, 500, error);
          }

          if (!isMatch) {
            return failure.sendError(res, 500, "Password not correct");
          }
          else{
            // if passwords match
            // generate token

            jwt.sign({}, config.jsonwebtoken.secret, (error, token) => {
              if (error) {
                console.log(error);
                return failure.sendError(res, 500, error);
              }

              //sending jsonwebtoken to the client
              res.status(200).json({
                token: token
              });
            });
          }
        });*/
        // otherwise
      })
      .catch( error => {
        console.log("Hello");
        failure.sendError(res, 500, error);
      })
  }
};
