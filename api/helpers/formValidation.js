const Joi = require('joi');

// joi is validation package of hapi.js framework
// in schema there can be many schemas to be validated
// validateBody function is used to validate schemas

module.exports = {

  validateBody: function (schema) {
    return function (req, res, next) {
      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.status(400).json(
          result.error
        )
      }

      // here new validated values are stored to a new
      // field of 'req' so now req.body is not used from this time
      // instead req.validatedBody is used to get any field of the form
      // filled by frontend

      if (!req.validatedBody) { // first checking if the field is empty
        req.validatedBody = {}; // now createing that field
      }

      req.validatedBody = result.value; // assigning all the validated values
      next();
    }
  },

  //there can be any number of schemas to be validated
  schemas: {
    registerSchema: {
      name: Joi.string().required().min(5).max(15),
      username: Joi.string().required().lowercase().min(3).max(15),
      age: Joi.number().integer().required().min(25),
      email: Joi.string().required().lowercase().email(),
      password: Joi.string().required().min(5),
      confirmPassword: Joi.string().required().min(5)
    }
  }
};
