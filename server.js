const express=  require('express');
const connectDB =require('./config/db');



let app= express();
connectDB();
//Init middleware
app.use(express.json({extended:false}))

const PORT=process.env.PORT||5000;
app.get('/',(req,res)=>{
    res.json({'msg':'welcome to contact keeper API'});
});
//Define Routes
app.use('/api/users',require('./routes/users'));
app.use('/api/contacts',require('./routes/contacts'));
app.use('/api/auth',require('./routes/auth'));
app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`);
    
})