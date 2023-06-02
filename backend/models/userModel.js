const User = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const auth = require('../authentication/auth');
const { adminId } = require('../authentication/admin');

// REGISTER USER
exports.registerUser = async (req, res) => {
  const { userName, password } = req.body;

  if(!userName || !password) {
    return res.status(400).json({
      message: 'You need to enter all the fields'
    })
  }

  const salt = bcrypt.genSaltSync(10);

  bcrypt.hash(password, salt, (err, hash) => {
    if(err) {
      return res.status(500).json({
        message: 'Failed when encrypting the password'
      })
    }
    User.create({
      userName,
      passwordHash: hash
    })
    .then(user => {
      res.status(201).json({
        token: auth.generateToken(user)
      })
    })
  })
}
// END
// LOGIN USER
exports.loginUserWithUserNameAndPassword = (req, res) => {
  const { userName, password } = req.body;

  if(!userName || !password) {
    return res.status(400).json({
      message: 'You need to enter all the fields'
    })
  }
  User.findOne({userName})  //finds username and sends it on
  .then(user => {
    if(!user) {
      return res.status(401).json({
        message: 'Incorrect credentials'
      })
    }
    bcrypt.compare(password, user.passwordHash, (err, result) => {  //compares the sent password with the passwordHash
      if(err) {
        return res.status(500).json({
          message: 'Something went wrong when decrypting the password'
        })
      }
      if(!result) {
        return res.status(401).json({
          message: 'Incorrect credentials'
        })
      }
      res.status(200).json({ token: auth.generateToken(user) }) //sends token
    })
  })
}
// END
// LOGIN ADMIN
exports.loginAdminWithUserNameAndPassword = (req, res) => {
  const { userName, password } = req.body;

  if(!userName || !password) {
    return res.status(400).json({
      message: 'You need to enter all the fields'
    })
  }
  User.findOne({userName})  //finds username and sends it on
  .then(user => {
    if(!user) {
      return res.status(401).json({
        message: 'Incorrect credentials'
      })
    }
    if (user._id.toString() !== adminId) {  //converts user._id to a string and compares it to adminId
      return res.status(401).json({
        message: 'You are not an admin, go away.'
      });
    }
    bcrypt.compare(password, user.passwordHash, (err, result) => {  //compares the sent password with the passwordHash
      if(err) {
        return res.status(500).json({
          message: 'Something went wrong when decrypting the password'
        })
      }
      if(!result) {
        return res.status(401).json({
          message: 'Incorrect credentials'
        })
      }
      res.status(200).json({ token: auth.generateToken(user) }) //sends token
    })
  })
}
// END
// GET USER DATA
exports.getUserData = (req, res) => {
  const { _id, displayName } = req.userData;

  User.findById(_id)
    .then(user => {
      res.status(200).json(user)
    })
  
}
//END