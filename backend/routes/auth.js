// const { response } = require('express');
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = process.env.JWT || 'Ashish';




//create a new user using POST "api/auth/createuser"
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid name').isEmail(),
  body('password').isLength({ min: 8 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //check whether the any user with this email is already registered
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ Error: ' Sorry a user with this email Already registered' });
    }
    const salt = await bcrypt.genSalt(10);//to generate salt for hashed  password and it retuns the promise
    const secpass = await bcrypt.hash(req.body.password, salt);//to generate  hashed password with salt and it retuns the promise
    user = await User.create({

      name: req.body.name,
      email: req.body.email,
      password: secpass,//sec= secure password
    })
    const data = {
      users: {
        id: user._id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtdata);
    // res.json(user)
    res.json({ authtoken })
    // res.send("error occured")// output will be simple text in response body


    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({ errors: "please enter a valid email",message: err.message})})
  }
  catch (err) {
    res.status(500).json({ errors: err.message })
  }
})

//authenticate a user using POST "api/auth/login
router.post('/login', [

  body('email', 'Enter a valid name').isEmail(),
  body('password', 'password cannot be blank').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });//find the user with this email in the database
    if (!user) {
      return res.status(403).json({ errors: "please enter the valid credentials" });
    }
    const comparepassword = await bcrypt.compare(password, user.password);
    if (!comparepassword) {
      return res.status(403).json({ errors: "please enter the valid credentials" });

    }
    const data = {
      users: {
        id: user._id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ authtoken })
  }
  catch (err) {
    res.status(500).send("internal server error")

  }

})

router.post('/getuser', fetchuser, async (req, res) => {

  try {
    let userId = req.user.id;
    const user = await User.findOne({ userId }).select("-password")//this -passowrd will fetch all the details of user except password
    //const user = await User.findById(userId).select("-password")//    Both will work same way
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router