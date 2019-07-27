const express=require('express');
const router= express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config= require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

//@route     GET api/auth
//@desc      GET logged in  user
//@acess     private
router.get('/',auth, async(req,res)=>{
   try {
       const user = await User.findById(req.user.id).select('-password');
       res.json(user);


       
   } catch (error) {
       console.error(error.message);
       res.status(500).send('internal server error');
       
   }
});
//@route     POST api/auth
//@desc     Auth user and get token
//@acess   public
router.post('/',[
    check('email','Please enter a valid  email ').isEmail(),
    check('password','Password is required').exists()
], async (req,res)=>{
    const errors=validationResult(req);
   if(!errors.isEmpty()){
       res.status(400).json({
           errors:errors.array()
       })
   }
   const {email,password}= req.body;
   try {
       let user= await User.findOne({email});
       if(!user){
          return  res.status(400).json({msg:"Invalid Credentials"});
       }
       const isMatching= await bcrypt.compare(password,user.password);
       if(!isMatching){
           return res.status(400).json({msg: 'Invalid Credentials'});

       }
       const payload = {
        user:{
            id: user.id,

        }
    }
    jwt.sign(payload,config.get('jwtSecret'),{
        expiresIn:360000000
    },(err,token)=>{
              if(err){
                  throw err;
              }
              res.json({token});
    })

       
   } catch (error) {
       console.error(error.message);
       res.status(500).send('server error');
       
   }
});
module.exports= router;