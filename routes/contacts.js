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
router.put('/:id',auth,async (req,res)=>{
    const {name,email,phone,type}= req.body;
   //Build Contact Object
   const contactFields={};
   if(name) contactFields.name=name;
   if(email) contactFields.email=email;
   if(type) contactFields.type= type;
   if(phone) contactFields.phone = phone;
   try {
       let contact =await Contact.findById(req.params.id);
       if(!contact) return res.status(404).json({msg:"Contact not found"});
       //make sure user owns contact
       if(contact.user.toString() !==req.user.id) return res.status(401).json({msg:"Not authorized to  update contact"});
       contact = await Contact.findByIdAndUpdate(req.params.id,{
           $set:contactFields
       },{new:true});
       res.json(contact);
   } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
   }
});
//@route     delete api/users/:id
//@desc     delete a purticular contact belonging to the user logged in
//@acess     private
router.delete('/:id',(req,res)=>{
   
});
module.exports= router;