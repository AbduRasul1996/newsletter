const router = require('express').Router();

//here, a form submitted form is being waited and server needs to check if the email or password or some other fileds have been filled correctly
//so joi is being used for this purpose
const { validateBody, schemas } = require('../helpers/formValidation.js');

const Admin = require('../modules/admin.js') ;
const adminController = require('../controllers/admin.js');

//first validate the body and then next
router.post('/signUp', validateBody(schemas.signUpSchema), adminController.signUp );

router.post('/signIn', validateBody(schemas.signInSchema), adminController.signIn );

module.exports = router;
