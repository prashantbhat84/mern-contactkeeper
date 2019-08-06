const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

let app = express();
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.json({ msg: 'welcome to contact keeper API' });
});
//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
