const express=require('express');
const router= express.Router();
const User = require('../models/User');
const Contact = require('../models/Contacts');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

//@route     GET api/contacts
//@desc     Get all contacts of a purticular user
//@acess     private
router.get('/', auth, async (req,res)=>{
    try {
        const contacts =await Contact.find({user:req.user.id}).sort({date:-1});
        res.json(contacts);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        
    }
});
//@route     POST api/contacts
//@desc     Insert a contact for a purticular user
//@acess     private
router.post('/', [auth,[
    check('name','Name is required').not().isEmpty(),
    check('email','Include a valid email').isEmail()

]],async (req,res)=>{
    const errors=validationResult(req);
   if(!errors.isEmpty()){
       res.status(400).json({
           errors:errors.array()
       })
   }
   const {name,email,phone,type}= req.body;
   try {
       const  newContact = new Contact({
           name,email,phone,type,user:req.user.id
       });
     const contact = await newContact.save();
     res.json(contact);
       
   } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
   }
    
});
//@route     PUT api/users/:id
//@desc     updates a purticular contact belonging to the user logged in
//@acess     private
router.put('/:id',(req,res)=>{
    res.send(`update contact with id:${id}`);
});
//@route     delete api/users/:id
//@desc     delete a purticular contact belonging to the user logged in
//@acess     private
router.delete('/:id',(req,res)=>{
    res.send(`delete contact with id:${id}`);
});
module.exports= router;