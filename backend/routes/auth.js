// const { response } = require('express');
const express = require('express');
const User= require('../models/user');
const router=express.Router();
const { body, validationResult } = require('express-validator');




//create a new user using POST "api/auth/"
router.post('/',[
    body('name','Enter a valid name').isLength({ min: 5 }),
    body('email','Enter a valid name').isEmail(),
    body('password').isLength({ min: 8 })
], (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      bd;bh;uh
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err => {console.log(err)
      res.json({ errors: "please enter a valid email",message: err.message})})

    
    
    
    
})

module.exports = router