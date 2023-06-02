const router = require('express').Router()
const userModel = require('../models/userModel')
const auth = require('../authentication/auth')

router.post('/register', userModel.registerUser); //POST - Register a new user & recieve a token- /api/users/register
router.post('/login', userModel.loginUserWithUserNameAndPassword); //POST - Login and recieve a token- /api/users/login
router.get('/me', auth.verifyToken, userModel.getUserData) //GET - gives userinfo - /api/users/me
router.post('/admin', userModel.loginAdminWithUserNameAndPassword); //POST - Login and recieve a token- /api/users/admin

module.exports = router
/*example of a user register or login
{
    "userName": "sebbe123",
    "password": "123"
}
 */