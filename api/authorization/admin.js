const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config/keys.js');

//async is in need because email and username fileds should
//be checked if they are already taken or not
const async = require('async');

//here, a form submitted form is being waited and server needs to check if the email or password or some other fileds have been filled correctly
//so joi is being used for this purpose
const { validateBody, schemas } = require('../helpers/formValidation.js');

const Admin = require('../modules/admin.js') ;

//first validate the body and then next
router.post('/register', validateBody(schemas.registerSchema), (req, res) =>{

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
            return res.status(500).json({
              error: error
            })
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
          return res.status(500).json({
            error: error
          })
        })
    }
  ],
  function (error, results) {
    if (error) { // either email or usenamae is taken
      console.log("Error: " + error);
      return res.status(400).json(error);
    }

    //creating THE new admin
    let admin = new Admin({
      id: new mongoose.Types.ObjectId(),
      name: req.validatedBody.name,
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
        return res.status(500).json({
          error: error
        })
      })

      //generate jsonwebtoken
      jwt.sign({}, config.jsonwebtoken.secret, (error, token) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: error
          });
        }

        //sending jsonwebtoken to the client
        res.status(200).json({
          token: token
        });
      });
  });

});

module.exports = router;
