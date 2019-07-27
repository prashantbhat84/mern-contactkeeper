const express=require('express');
const router= express.Router();

//@route     GET api/contacts
//@desc     Get all contacts of a purticular user
//@acess     private
router.get('/',(req,res)=>{
    res.send('Get user contacts');
});
//@route     POST api/contacts
//@desc     Insert a contact for a purticular user
//@acess     private
router.post('/',(req,res)=>{
    res.send('inserted new contact  for logged in user');
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